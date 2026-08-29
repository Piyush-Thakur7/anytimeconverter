import os
import sys
import subprocess
from datetime import datetime
import psutil
from colorama import init, Fore, Style
from api_client import NIMApiClient
from voice_engine import speak, stop_voice_engine

# Initialize colorama
init(autoreset=True)

# Path to settings file
SETTINGS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "settings.json")

# Initialize client
client = NIMApiClient(SETTINGS_PATH)

def load_settings():
    """Load settings dictionary."""
    if os.path.exists(SETTINGS_PATH):
        try:
            with open(SETTINGS_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {}

def show_help():
    """Prints list of interactive CLI commands."""
    print(f"\n{Fore.CYAN}=== Available Slash Commands ===")
    print(f"{Fore.YELLOW}/help    {Fore.WHITE}- Show this help menu")
    print(f"{Fore.YELLOW}/clear   {Fore.WHITE}- Reset conversation memory context")
    print(f"{Fore.YELLOW}/voice   {Fore.WHITE}- Toggle voice feedback readback (ON/OFF)")
    print(f"{Fore.YELLOW}/exit    {Fore.WHITE}- Close the application\n")

def confirm_shutdown_restart(action):
    """Asks for console confirmation before executing shutdown/restart."""
    print(f"\n{Fore.RED}⚠️ WARNING: You requested to {action} the computer.")
    speak(f"Are you sure you want to {action} the computer? Please type yes to confirm.")
    
    confirm = input(f"{Fore.RED}Type 'yes' to confirm {action} (or press Enter to cancel): ").strip().lower()
    if "yes" in confirm:
        print(f"{Fore.GREEN}Executing {action} now...")
        speak(f"Executing {action} now.")
        if action == "shutdown":
            os.system("shutdown /s /t 1")
        else:
            os.system("shutdown /r /t 1")
        sys.exit(0)
    else:
        print(f"{Fore.YELLOW}Action cancelled.")
        speak("Action cancelled.")

def process_command(text, settings):
    """Processes command. Returns True to continue loop, False to exit."""
    text_clean = text.lower().strip()
    
    if not text_clean:
        return True
        
    # Check for slash commands
    if text_clean.startswith("/"):
        if text_clean == "/exit":
            return False
        elif text_clean == "/clear":
            client.clear_memory()
            print(f"{Fore.GREEN}Conversation memory cleared!")
            speak("Conversation memory cleared.")
            return True
        elif text_clean == "/voice":
            settings["voice_enabled"] = not settings.get("voice_enabled", True)
            # Write back
            try:
                with open(SETTINGS_PATH, "w", encoding="utf-8") as f:
                    import json
                    json.dump(settings, f, indent=2)
            except Exception:
                pass
            status = "ENABLED" if settings["voice_enabled"] else "DISABLED"
            color = Fore.GREEN if settings["voice_enabled"] else Fore.RED
            print(f"Voice feedback is now {color}{status}")
            speak(f"Voice feedback {status.lower()}")
            return True
        elif text_clean == "/help":
            show_help()
            return True
        else:
            print(f"{Fore.RED}Unknown command. Type /help for options.")
            return True

    # Check for local commands
    if "open chrome" in text_clean:
        print(f"{Fore.GREEN}Opening Google Chrome...")
        speak("Opening Google Chrome.", settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        subprocess.Popen("start chrome", shell=True)
        return True
        
    elif "open notepad" in text_clean:
        print(f"{Fore.GREEN}Opening Notepad...")
        speak("Opening Notepad.", settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        subprocess.Popen("notepad.exe")
        return True
        
    elif "open calculator" in text_clean:
        print(f"{Fore.GREEN}Opening Calculator...")
        speak("Opening Calculator.", settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        subprocess.Popen("calc.exe")
        return True
        
    elif "time" in text_clean and any(w in text_clean for w in ["what", "current", "is"]):
        now = datetime.now()
        time_str = now.strftime("%I:%M %p")
        reply = f"The time is {time_str}."
        print(f"{Fore.BLUE}{reply}")
        speak(reply, settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        return True
        
    elif "date" in text_clean or "today" in text_clean:
        now = datetime.now()
        date_str = now.strftime("%B %d, %Y")
        reply = f"Today is {date_str}."
        print(f"{Fore.BLUE}{reply}")
        speak(reply, settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        return True
        
    elif "battery" in text_clean:
        battery = psutil.sensors_battery()
        if battery:
            percent = battery.percent
            plugged = battery.power_plugged
            status = "plugged in" if plugged else "running on battery"
            reply = f"Your battery is at {percent} percent and is currently {status}."
        else:
            reply = "I could not retrieve the battery status."
        print(f"{Fore.BLUE}{reply}")
        speak(reply, settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        return True
        
    elif "shutdown" in text_clean:
        confirm_shutdown_restart("shutdown")
        return True
        
    elif "restart" in text_clean:
        confirm_shutdown_restart("restart")
        return True
        
    elif text_clean in ["exit", "quit", "stop listening"]:
        return False

    # Default: Send to NVIDIA NIM API
    print(f"{Fore.YELLOW}Assistant is thinking...")
    reply = client.get_response(text)
    
    # Check if reply is an error message
    if reply.startswith("Error:"):
        print(f"{Fore.RED}{reply}")
        speak("I encountered an error.", settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
    else:
        assistant_name = settings.get("assistant_name", "Jarvis")
        print(f"\n{Fore.GREEN}[{assistant_name}]: {Fore.WHITE}{reply}\n")
        speak(reply, settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
        
    return True

def run_terminal_chat():
    """Main terminal loop."""
    # Reload settings
    settings = client.load_settings()
    user_name = settings.get("user_name", "Boss")
    assistant_name = settings.get("assistant_name", "Jarvis")
    
    # Print welcome screen
    print(f"\n{Fore.GREEN}{Style.BRIGHT}==========================================")
    print(f"{Fore.GREEN}{Style.BRIGHT}    {assistant_name.upper()} AI TERMINAL CHAT DESKTOP SUITE")
    print(f"{Fore.GREEN}{Style.BRIGHT}==========================================")
    print(f"User Profile: {Fore.CYAN}{user_name}")
    print(f"Voice Output: {Fore.CYAN}{'ON' if settings.get('voice_enabled', True) else 'OFF'}")
    print(f"Model Engine: {Fore.CYAN}{settings.get('nvidia_model', 'meta/llama-3.1-8b-instruct')}")
    print(f"{Fore.WHITE}Type {Fore.YELLOW}/help{Fore.WHITE} to view commands. Type {Fore.YELLOW}/exit{Fore.WHITE} or {Fore.YELLOW}quit{Fore.WHITE} to close.")
    print(f"------------------------------------------\n")
    
    # Speak startup greeting
    greeting = f"Hello {user_name}, {assistant_name} is online."
    speak(greeting, settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
    
    while True:
        try:
            prompt_str = f"{user_name} > "
            user_input = input(prompt_str).strip()
            
            # Process command
            should_continue = process_command(user_input, settings)
            if not should_continue:
                break
                
        except (KeyboardInterrupt, EOFError):
            break
            
    print(f"\n{Fore.GREEN}Goodbye, {user_name}!")
    speak(f"Goodbye {user_name}!", settings.get("voice_gender", "female"), settings.get("speech_rate", 170), settings.get("voice_enabled", True))
    
    # Stop the voice worker cleanly
    stop_voice_engine()

if __name__ == "__main__":
    run_terminal_chat()
