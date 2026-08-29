import os
import sys
import time
import json
import queue
import subprocess
from datetime import datetime
import psutil
import sounddevice as sd
import pyttsx3
from vosk import Model, KaldiRecognizer
from openai import OpenAI
import openai

# Define paths
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
SETTINGS_PATH = os.path.join(CURRENT_DIR, "settings.json")
# Vosk model folder path (defaulting to the small English model name)
VOSK_MODEL_DIR = "vosk-model-small-en-us-0.15"
MODEL_PATH = os.path.join(CURRENT_DIR, VOSK_MODEL_DIR)

# Initialize variables
settings = {}
assistant_name = "Nova"
wake_word = "nova"
user_name = "Boss"
voice_gender = "female"
speech_language = "english"
speech_rate = 170
personality = ""
nvidia_api_key = ""
nvidia_model = ""
startup_greeting = True
text_fallback_mode = False

# Queue to hold audio chunks from sounddevice callback
audio_queue = queue.Queue()
rec = None

# Conversation history memory (stores up to last 6 exchanges: (user_msg, assistant_reply))
conversation_memory = []

def load_settings():
    """Loads configuration settings from settings.json."""
    global settings, assistant_name, wake_word, user_name, voice_gender, speech_language, speech_rate, personality, nvidia_api_key, nvidia_model, startup_greeting
    
    if not os.path.exists(SETTINGS_PATH):
        # Speak or print warning and create a default settings file
        print(f"Warning: settings.json not found at {SETTINGS_PATH}. Creating default configurations.")
        default_settings = {
            "assistant_name": "Nova",
            "wake_word": "nova",
            "voice_gender": "female",
            "speech_rate": 170,
            "speech_language": "english",
            "user_name": "Boss",
            "personality": "You are a helpful, witty personal assistant. Keep answers short, 1-3 sentences, since they are spoken aloud.",
            "nvidia_api_key": "PASTE_KEY_HERE",
            "nvidia_model": "meta/llama-3.1-70b-instruct",
            "startup_greeting": True
        }
        try:
            with open(SETTINGS_PATH, "w", encoding="utf-8") as f:
                json.dump(default_settings, f, indent=2)
        except Exception as e:
            print(f"Error creating default settings.json: {e}")
            
    try:
        with open(SETTINGS_PATH, "r", encoding="utf-8") as f:
            settings = json.load(f)
            
        assistant_name = settings.get("assistant_name", "Nova")
        wake_word = settings.get("wake_word", "nova").lower()
        user_name = settings.get("user_name", "Boss")
        voice_gender = settings.get("voice_gender", "female")
        speech_language = settings.get("speech_language", "english")
        speech_rate = settings.get("speech_rate", 170)
        personality = settings.get("personality", "")
        nvidia_api_key = settings.get("nvidia_api_key", "")
        nvidia_model = settings.get("nvidia_model", "meta/llama-3.1-70b-instruct")
        startup_greeting = settings.get("startup_greeting", True)
        
        print("Settings loaded successfully:")
        print(f" - Assistant Name: {assistant_name}")
        print(f" - Wake Word: {wake_word}")
        print(f" - Language: {speech_language}")
        print(f" - Voice: {voice_gender} ({speech_rate} WPM)")
        print(f" - User Name: {user_name}")
        print(f" - Model: {nvidia_model}")
    except Exception as e:
        print(f"Error reading settings.json: {e}")

def speak(text, audio_queue_to_clear=None, recognizer_to_reset=None):
    """Speaks text using pyttsx3 offline TTS engine."""
    try:
        engine = pyttsx3.init()
        voices = engine.getProperty("voices")
        selected_voice = None
        
        # Check if Hindi voice is needed for Hindi speech language
        if speech_language.lower() == "hindi":
            for voice in voices:
                v_name = voice.name.lower()
                v_langs = getattr(voice, 'languages', [])
                has_hi = any("hi" in str(l).lower() for l in v_langs)
                if "hindi" in v_name or "kalpana" in v_name or "hemant" in v_name or has_hi:
                    selected_voice = voice.id
                    break
        
        # Configure voice matching the selected gender if no Hindi voice found
        if not selected_voice:
            g_lower = voice_gender.lower()
            for voice in voices:
                v_gender = getattr(voice, 'gender', '').lower()
                v_name = voice.name.lower()
                
                # Check SAPI5 voice properties
                if g_lower == "female":
                    if "female" in v_gender or "zira" in v_name or "hazel" in v_name or "eva" in v_name or "helen" in v_name:
                        selected_voice = voice.id
                        break
                else:  # male
                    if "male" in v_gender or "david" in v_name or "george" in v_name or "mark" in v_name:
                        selected_voice = voice.id
                        break
                        
        # If no specific gender voice is found, fallback gracefully
        if not selected_voice and voices:
            if voice_gender.lower() == "female" and len(voices) > 1:
                selected_voice = voices[1].id
            else:
                selected_voice = voices[0].id
                
        if selected_voice:
            engine.setProperty("voice", selected_voice)
            
        # Configure speed/rate
        engine.setProperty("rate", speech_rate)
        
        print(f"[{assistant_name}]: {text}")
        engine.say(text)
        engine.runAndWait()
        
        # CLEAR THE AUDIO QUEUE:
        # This prevents the microphone from parsing the assistant's own voice as commands.
        if audio_queue_to_clear is not None:
            while not audio_queue_to_clear.empty():
                try:
                    audio_queue_to_clear.get_nowait()
                except queue.Empty:
                    break
                    
        # Reset the Kaldi recognizer model buffer so it starts clean for the next command
        if recognizer_to_reset is not None:
            recognizer_to_reset.Reset()
            
    except Exception as e:
        print(f"Text-to-Speech Error: {e}")

def audio_callback(indata, frames, time_info, status):
    """This function is called for each audio block by sounddevice."""
    if status:
        print(status, file=sys.stderr)
    audio_queue.put(bytes(indata))

def confirm_action(action_name):
    """Prompts user for confirmation ('yes') before executing critical systems commands."""
    if text_fallback_mode:
        speak(f"Are you sure you want to {action_name} the computer? Please type yes to confirm.")
        confirm = input("Type 'yes' to confirm: ").strip().lower()
        confirmed = "yes" in confirm
    else:
        speak(f"Are you sure you want to {action_name} the computer? Please say yes to confirm.", audio_queue)
        start_time = time.time()
        confirmed = False
        
        # Listen for 8 seconds for a confirmation response
        while time.time() - start_time < 8:
            try:
                # Short timeout so we keep looping
                data = audio_queue.get(timeout=0.5)
                if rec.AcceptWaveform(data):
                    result = json.loads(rec.Result())
                    text = result.get("text", "").lower().strip()
                    print(f"Confirmation response heard: '{text}'")
                    
                    if "yes" in text:
                        confirmed = True
                        break
                    elif "no" in text or "cancel" in text:
                        break
            except queue.Empty:
                continue
            
    if confirmed:
        speak(f"Ok. Performing {action_name} now.", None if text_fallback_mode else audio_queue)
        time.sleep(1.5)  # Let speech finish speaking
        if action_name == "shutdown":
            os.system("shutdown /s /t 1")
        elif action_name == "restart":
            os.system("shutdown /r /t 1")
    else:
        speak("Action cancelled.", None if text_fallback_mode else audio_queue)

def query_nvidia_nim_api(query):
    """Queries NVIDIA NIM chat completion API for responses using openai SDK client."""
    global conversation_memory
    
    if not nvidia_api_key or nvidia_api_key == "PASTE_KEY_HERE":
        speak("I don't have a valid API key configured. Please paste your NVIDIA API key in the admin panel.", audio_queue, rec)
        return

    try:
        # Initialize the OpenAI client with NVIDIA endpoint
        client = OpenAI(
            base_url="https://integrate.api.nvidia.com/v1",
            api_key=nvidia_api_key
        )
        
        # Build the messages payload
        system_content = f"{personality}\nThe user's name is {user_name}. Your name is {assistant_name}."
        messages = [{"role": "system", "content": system_content}]
        
        # Append conversation history memory (last 6 exchanges)
        for exchange_user, exchange_assistant in conversation_memory:
            messages.append({"role": "user", "content": exchange_user})
            messages.append({"role": "assistant", "content": exchange_assistant})
            
        # Append the new user query
        messages.append({"role": "user", "content": query})
        
        # Call completion
        completion = client.chat.completions.create(
            model=nvidia_model,
            messages=messages,
            temperature=0.2,
            top_p=0.7,
            max_tokens=150
        )
        
        reply = completion.choices[0].message.content.strip()
        
        # Speak the response aloud
        speak(reply, audio_queue, rec)
        
        # Update conversation history memory list
        conversation_memory.append((query, reply))
        if len(conversation_memory) > 6:
            conversation_memory.pop(0)
            
    except openai.AuthenticationError:
        speak("My AI brain failed to authenticate. The NVIDIA API key is invalid.", audio_queue, rec)
        print("Error: NVIDIA API Key Authentication Failed (401).")
    except openai.APIConnectionError:
        speak("I could not reach the internet. Please check your network connection.", audio_queue, rec)
        print("Error: Connection failed to NVIDIA servers.")
    except Exception as e:
        speak("I encountered an unexpected error processing your request.", audio_queue, rec)
        print(f"API Error details: {e}")

def process_command(command):
    """Checks the transcribed command. Runs locally if recognized, else sends to LLM."""
    command = command.lower().strip()
    
    if not command:
        return
        
    print(f"Processing command: '{command}'")
    
    # 1. Local App execution
    if "open chrome" in command:
        speak("Opening Google Chrome.", audio_queue, rec)
        subprocess.Popen("start chrome", shell=True)
        
    elif "open notepad" in command:
        speak("Opening Notepad.", audio_queue, rec)
        subprocess.Popen("notepad.exe")
        
    elif "open calculator" in command:
        speak("Opening Calculator.", audio_queue, rec)
        subprocess.Popen("calc.exe")
        
    # 2. Date & Time
    elif "time" in command and any(w in command for w in ["what", "current", "is"]):
        now = datetime.now()
        time_str = now.strftime("%I:%M %p")
        speak(f"The time is {time_str}.", audio_queue, rec)
        
    elif "date" in command or "today" in command:
        now = datetime.now()
        date_str = now.strftime("%B %d, %Y")
        speak(f"Today is {date_str}.", audio_queue, rec)
        
    # 3. System status
    elif "battery" in command:
        battery = psutil.sensors_battery()
        if battery:
            percent = battery.percent
            plugged = battery.power_plugged
            status = "plugged in" if plugged else "running on battery"
            speak(f"Your battery is at {percent} percent and is currently {status}.", audio_queue, rec)
        else:
            speak("I could not retrieve the battery status. Your device may not have a battery.", audio_queue, rec)
            
    # 4. Critical OS execution commands
    elif "shutdown" in command:
        confirm_action("shutdown")
        
    elif "restart" in command:
        confirm_action("restart")
        
    # 5. Program control commands
    elif "stop listening" in command or "exit" in command or "quit" in command:
        speak(f"Goodbye {user_name}! Exiting now.", audio_queue, rec)
        sys.exit(0)
        
    # 6. Fallback - NIM AI API Call
    else:
        query_nvidia_nim_api(command)

def check_and_setup_model():
    """Verify speech model folder exists, or download and extract it automatically."""
    global MODEL_PATH
    
    # Determine correct model directory name based on selected language
    if speech_language.lower() == "hindi":
        model_name = "vosk-model-small-hi-0.22"
        url = "https://alphacephei.com/vosk/models/vosk-model-small-hi-0.22.zip"
    else:
        model_name = "vosk-model-small-en-us-0.15"
        url = "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip"
        
    MODEL_PATH = os.path.join(CURRENT_DIR, model_name)
    
    if os.path.exists(MODEL_PATH):
        return
        
    # Try alternative generic path "model"
    alt_model_path = os.path.join(CURRENT_DIR, "model")
    if os.path.exists(alt_model_path):
        MODEL_PATH = alt_model_path
        return
        
    # If not found, perform automated download
    print(f"\n[INFO] Speech model '{model_name}' was not found at {MODEL_PATH}.")
    print("Downloading voice recognition model... This will take a moment.")
    
    import urllib.request
    import zipfile
    
    zip_path = os.path.join(CURRENT_DIR, f"{model_name}.zip")
    
    try:
        # Speak alert using local pyttsx3 engine
        speak(f"Downloading required voice recognition files for {speech_language}. Please wait.")
        
        # Download
        urllib.request.urlretrieve(url, zip_path)
        print("Download finished. Extracting voice files...")
        
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(CURRENT_DIR)
            
        os.remove(zip_path)
        print("Setup completed successfully!")
        speak("Voice files have been successfully installed.")
    except Exception as e:
        print(f"\n[CRITICAL ERROR] Failed to download model: {e}")
        speak("I failed to download the voice recognition files. Please connect to the internet and try again.")
        sys.exit(1)

if __name__ == "__main__":
    print("------------------------------------------")
    print("         Voice AI Assistant Starting      ")
    print("------------------------------------------")
    
    # Load configuration
    load_settings()
    
    # Test Microphone input device
    try:
        sd.query_devices(None, 'input')
    except Exception as e:
        print("\n[WARNING] No active microphone input device detected.")
        print("Switching to TEXT FALLBACK MODE. You can type commands, and replies will be spoken aloud.")
        text_fallback_mode = True
        
    if not text_fallback_mode:
        # Check and setup model files automatically
        check_and_setup_model()
        
        # Load Vosk Speech Recognizer Model
        try:
            samplerate = 16000
            model = Model(MODEL_PATH)
            rec = KaldiRecognizer(model, samplerate)
        except Exception as e:
            print(f"\n[CRITICAL ERROR] Failed to load Vosk Kaldi model: {e}")
            speak("I encountered a problem loading the speech recognition model.")
            sys.exit(1)
            
        # Start Sounddevice Stream
        try:
            stream = sd.RawInputStream(
                samplerate=samplerate,
                blocksize=8000,
                dtype='int16',
                channels=1,
                callback=audio_callback
            )
        except Exception as e:
            print(f"\n[CRITICAL ERROR] Sounddevice failed to open RawInputStream: {e}")
            speak("I failed to start the audio input stream.")
            sys.exit(1)
            
    # Execute Startup Greeting
    if startup_greeting:
        greeting_msg = f"Hello {user_name}, {assistant_name} is online."
        if text_fallback_mode:
            greeting_msg += " Microphone is missing, running in text mode."
        speak(greeting_msg, None if text_fallback_mode else audio_queue, None if text_fallback_mode else rec)
        
    # Main execution loop
    if text_fallback_mode:
        print("\n==========================================")
        print("  MICROPHONE MISSING - RUNNING IN TEXT MODE")
        print("  (Type your questions and press Enter)   ")
        print("==========================================")
        while True:
            try:
                user_input = input(f"\nYou ({user_name}): ").strip()
                if not user_input:
                    continue
                process_command(user_input)
            except (KeyboardInterrupt, EOFError):
                speak("Goodbye!", None, None)
                sys.exit(0)
    else:
        # Main voice assistant listening loop
        with stream:
            print(f"\n>>> {assistant_name} is listening in the background...")
            print(f">>> Say '{wake_word}' to activate me!")
            
            active_listening = False
            
            while True:
                try:
                    data = audio_queue.get()
                    if rec.AcceptWaveform(data):
                        result_json = json.loads(rec.Result())
                        text = result_json.get("text", "").lower().strip()
                        
                        if not text:
                            continue
                            
                        print(f"Captured Speech: '{text}'")
                        
                        if not active_listening:
                            # Check for the wake word in passive mode
                            if wake_word in text:
                                # Extract any potential command spoken immediately after wake word
                                words = text.split()
                                if wake_word in words:
                                    idx = words.index(wake_word)
                                    direct_command = " ".join(words[idx+1:]).strip()
                                else:
                                    direct_command = text.replace(wake_word, "", 1).strip()
                                    
                                if direct_command:
                                    # User spoke: "Nova, what time is it?"
                                    process_command(direct_command)
                                else:
                                    # User spoke: "Nova"
                                    speak(f"Yes, {user_name}?", audio_queue, rec)
                                    active_listening = True
                        else:
                            # Process next spoken text block as command in active mode
                            process_command(text)
                            active_listening = False  # Go back to passive wake-word detection mode
                            print(f"\n>>> Going back to background listening. Say '{wake_word}' to query again.")
                            
                except Exception as loop_err:
                    print(f"Main loop warning: {loop_err}")
                    time.sleep(0.1)
