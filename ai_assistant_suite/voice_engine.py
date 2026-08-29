import os
import json
import queue
import threading
import pyttsx3

# Thread-safe queue for speech requests
speech_queue = queue.Queue()
worker_thread = None

def contains_hindi(text):
    """Detects if a string contains Hindi/Devanagari characters."""
    for char in text:
        if '\u0900' <= char <= '\u097F':
            return True
    return False

def speech_worker():
    """Persistent background thread worker to handle all pyttsx3 calls."""
    try:
        # Initialize COM engine inside the thread that uses it
        engine = pyttsx3.init()
    except Exception as e:
        print(f"Error: Could not initialize voice engine thread: {e}")
        return

    while True:
        item = speech_queue.get()
        if item is None:
            break
            
        text, gender, rate, is_hindi = item
        try:
            voices = engine.getProperty("voices")
            selected_voice = None
            
            if is_hindi:
                # Search SAPI5 voices for Hindi voice pack
                for voice in voices:
                    v_name = voice.name.lower()
                    v_langs = getattr(voice, 'languages', [])
                    has_hi = any("hi" in str(l).lower() for l in v_langs)
                    if "hindi" in v_name or "kalpana" in v_name or "hemant" in v_name or has_hi:
                        selected_voice = voice.id
                        break
            
            # If no Hindi voice or English text, use gender match
            if not selected_voice:
                g_lower = gender.lower()
                for voice in voices:
                    v_gender = getattr(voice, 'gender', '').lower()
                    v_name = voice.name.lower()
                    if g_lower == "female":
                        if "female" in v_gender or "zira" in v_name or "hazel" in v_name or "eva" in v_name or "helen" in v_name:
                            selected_voice = voice.id
                            break
                    else:  # male
                        if "male" in v_gender or "david" in v_name or "george" in v_name or "mark" in v_name:
                            selected_voice = voice.id
                            break
            
            # Final fallback to defaults
            if not selected_voice and voices:
                if gender.lower() == "female" and len(voices) > 1:
                    selected_voice = voices[1].id
                else:
                    selected_voice = voices[0].id
            
            if selected_voice:
                engine.setProperty("voice", selected_voice)
                
            engine.setProperty("rate", rate)
            engine.say(text)
            engine.runAndWait()
        except Exception as e:
            print(f"Voice playback error: {e}")
        finally:
            speech_queue.task_done()

def start_voice_thread():
    """Starts the background voice playback worker thread if not already running."""
    global worker_thread
    if worker_thread is None or not worker_thread.is_alive():
        worker_thread = threading.Thread(target=speech_worker, daemon=True)
        worker_thread.start()

def speak(text, gender="female", rate=170, enabled=True):
    """Adds a speech query to the non-blocking background queue."""
    if not enabled or not text:
        return
        
    start_voice_thread()
    
    # Auto-detect language by checking for Hindi (Devanagari) characters
    is_hindi = contains_hindi(text)
    
    # Enqueue speech task
    speech_queue.put((text, gender, rate, is_hindi))

def stop_voice_engine():
    """Stops the speech queue and shuts down the background thread cleanly."""
    speech_queue.put(None)
