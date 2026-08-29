import os
import json
import tkinter as tk
from tkinter import ttk, messagebox
import pyttsx3
import threading

# Path to settings file
SETTINGS_PATH = os.path.join(os.path.dirname(__file__), "settings.json")

# Personality presets as requested
PERSONALITY_PRESETS = {
    "Custom / Default": "You are a helpful, witty personal assistant. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Jarvis-style (Formal Butler)": "You are a sophisticated British butler-style assistant like Jarvis from Iron Man. Address the user as \"Sir\". Be calm, precise, and subtly witty. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Chill Best Friend": "You are the user's laid-back best friend. Talk casually with slang, crack light jokes, be supportive but honest. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Savage / Roast Mode": "You are a sarcastic assistant with attitude. Help the user but tease them playfully and roast them lightly. Never be actually mean or refuse to help. Keep answers short, 1-3 sentences, spoken aloud.",
    "Study Coach": "You are a motivating study mentor. Explain concepts simply, quiz the user when asked, encourage focus, and discourage procrastination. Keep answers short and spoken-friendly.",
    "Hinglish Mode": "You are a friendly desi assistant. Reply in Hinglish (Hindi-English mix) casually, like a close friend from India. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Professional Secretary": "You are an efficient professional secretary. Be brief, organized, and action-oriented. Confirm tasks clearly. No small talk unless asked. Answers must be short and spoken aloud."
}

def load_settings():
    """Load settings from settings.json or return default dict."""
    if os.path.exists(SETTINGS_PATH):
        try:
            with open(SETTINGS_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to read settings.json: {e}")
    
    # Default fallback
    return {
        "assistant_name": "Nova",
        "wake_word": "nova",
        "voice_gender": "female",
        "speech_rate": 170,
        "user_name": "Boss",
        "personality": PERSONALITY_PRESETS["Custom / Default"],
        "nvidia_api_key": "PASTE_KEY_HERE",
        "nvidia_model": "meta/llama-3.1-70b-instruct",
        "startup_greeting": True
    }

def save_settings(settings):
    """Save settings dictionary to settings.json."""
    try:
        with open(SETTINGS_PATH, "w", encoding="utf-8") as f:
            json.dump(settings, f, indent=2)
        return True
    except Exception as e:
        messagebox.showerror("Error", f"Failed to save settings: {e}")
        return False

def get_voice_id_by_gender(engine, gender_str):
    """Finds a matching voice ID for male or female in pyttsx3."""
    voices = engine.getProperty("voices")
    gender_str = gender_str.lower()
    
    # Try searching for matches
    for voice in voices:
        v_gender = getattr(voice, 'gender', '').lower()
        v_name = voice.name.lower()
        v_id = voice.id.lower()
        
        if gender_str == "female":
            if "female" in v_gender or "zira" in v_name or "hazel" in v_name or "haruka" in v_name or "eva" in v_name or "helen" in v_name:
                return voice.id
        else:  # male
            if "male" in v_gender or "david" in v_name or "george" in v_name or "mark" in v_name:
                return voice.id
                
    # Fallback to defaults
    if voices:
        if gender_str == "female" and len(voices) > 1:
            return voices[1].id
        return voices[0].id
    return None

def speak_test(gender, rate, language):
    """Run pyttsx3 in a background thread to prevent UI freezing."""
    try:
        engine = pyttsx3.init()
        voices = engine.getProperty("voices")
        selected_voice = None
        
        # Search for a Hindi voice if chosen
        if language.lower() == "hindi":
            for voice in voices:
                v_name = voice.name.lower()
                v_langs = getattr(voice, 'languages', [])
                has_hi = any("hi" in str(l).lower() for l in v_langs)
                if "hindi" in v_name or "kalpana" in v_name or "hemant" in v_name or has_hi:
                    selected_voice = voice.id
                    break
                    
        if not selected_voice:
            g_lower = gender.lower()
            for voice in voices:
                v_gender = getattr(voice, 'gender', '').lower()
                v_name = voice.name.lower()
                if g_lower == "female":
                    if "female" in v_gender or "zira" in v_name or "hazel" in v_name or "eva" in v_name or "helen" in v_name:
                        selected_voice = voice.id
                        break
                else:
                    if "male" in v_gender or "david" in v_name or "george" in v_name or "mark" in v_name:
                        selected_voice = voice.id
                        break
                        
        if not selected_voice and voices:
            if gender.lower() == "female" and len(voices) > 1:
                selected_voice = voices[1].id
            else:
                selected_voice = voices[0].id
                
        if selected_voice:
            engine.setProperty("voice", selected_voice)
        engine.setProperty("rate", rate)
        
        if language.lower() == "hindi":
            test_text = "नमस्ते! यह आपकी नई हिंदी आवाज़ का परीक्षण है। क्या यह सही है?"
        else:
            test_text = f"Hello! I am speaking as your assistant with a {gender} voice at {rate} words per minute. How does this sound?"
            
        engine.say(test_text)
        engine.runAndWait()
    except Exception as e:
        print(f"TTS Speech Test Error: {e}")

class AdminPanel:
    def __init__(self, root):
        self.root = root
        self.root.title("Assistant Admin Panel")
        self.root.geometry("720x640")
        self.root.resizable(False, False)
        
        # Load settings
        self.settings = load_settings()
        
        # UI Styling Colors
        self.bg_color = "#1e1e2e"       # Dark Slate / Indigo background
        self.card_bg = "#252538"        # Slightly lighter slate for frames
        self.fg_color = "#cdd6f4"       # Light lavender/white text
        self.accent_color = "#89b4fa"   # Soft blue
        self.btn_save = "#a6e3a1"       # Light green
        self.btn_test = "#f9e2af"       # Light yellow
        
        # Apply window background
        self.root.configure(bg=self.bg_color)
        
        # Configure Styles for ttk widgets
        self.style = ttk.Style()
        self.style.theme_use('clam')
        
        # Custom frame style
        self.style.configure("TFrame", background=self.bg_color)
        self.style.configure("Card.TFrame", background=self.card_bg, relief="flat")
        self.style.configure("TLabel", background=self.card_bg, foreground=self.fg_color, font=("Segoe UI", 10))
        self.style.configure("Header.TLabel", background=self.bg_color, foreground=self.accent_color, font=("Segoe UI", 16, "bold"))
        self.style.configure("SubHeader.TLabel", background=self.card_bg, foreground=self.accent_color, font=("Segoe UI", 11, "bold"))
        self.style.configure("TCombobox", fieldbackground="#313244", background="#313244", foreground=self.fg_color)
        self.style.configure("TCheckbutton", background=self.card_bg, foreground=self.fg_color)
        
        # Create Main Header
        header_label = ttk.Label(self.root, text="Voice AI Assistant Admin Panel", style="Header.TLabel")
        header_label.pack(pady=15)
        
        # Main container with two columns
        main_container = ttk.Frame(self.root, style="TFrame")
        main_container.pack(fill="both", expand=True, padx=20, pady=5)
        
        # LEFT COLUMN - Core Config
        left_col = ttk.Frame(main_container, style="Card.TFrame", padding=15)
        left_col.pack(side="left", fill="both", expand=True, padx=(0, 10))
        
        ttk.Label(left_col, text="Core Configurations", style="SubHeader.TLabel").pack(anchor="w", pady=(0, 15))
        
        # Assistant Name
        ttk.Label(left_col, text="Assistant Name:").pack(anchor="w", pady=(5, 2))
        self.assistant_name_var = tk.StringVar(value=self.settings.get("assistant_name", "Nova"))
        self.ent_assistant_name = tk.Entry(left_col, textvariable=self.assistant_name_var, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_assistant_name.pack(fill="x", pady=(0, 10))
        
        # Wake Word
        ttk.Label(left_col, text="Wake Word (lowercase):").pack(anchor="w", pady=(5, 2))
        self.wake_word_var = tk.StringVar(value=self.settings.get("wake_word", "nova"))
        self.ent_wake_word = tk.Entry(left_col, textvariable=self.wake_word_var, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_wake_word.pack(fill="x", pady=(0, 10))
        
        # User Name
        ttk.Label(left_col, text="User Name:").pack(anchor="w", pady=(5, 2))
        self.user_name_var = tk.StringVar(value=self.settings.get("user_name", "Boss"))
        self.ent_user_name = tk.Entry(left_col, textvariable=self.user_name_var, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_user_name.pack(fill="x", pady=(0, 10))
        
        # NVIDIA Model
        ttk.Label(left_col, text="NVIDIA Model:").pack(anchor="w", pady=(5, 2))
        self.nvidia_model_var = tk.StringVar(value=self.settings.get("nvidia_model", "meta/llama-3.1-70b-instruct"))
        self.ent_nvidia_model = tk.Entry(left_col, textvariable=self.nvidia_model_var, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_nvidia_model.pack(fill="x", pady=(0, 10))
        
        # NVIDIA API Key
        ttk.Label(left_col, text="NVIDIA API Key:").pack(anchor="w", pady=(5, 2))
        self.api_key_var = tk.StringVar(value=self.settings.get("nvidia_api_key", ""))
        self.api_frame = tk.Frame(left_col, bg=self.card_bg)
        self.api_frame.pack(fill="x", pady=(0, 10))
        
        self.ent_api_key = tk.Entry(self.api_frame, textvariable=self.api_key_var, show="*", bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_api_key.pack(side="left", fill="x", expand=True)
        
        self.btn_show_key = tk.Button(self.api_frame, text="👁", command=self.toggle_api_key_visibility, bg="#45475a", fg=self.fg_color, relief="flat", activebackground="#585b70", activeforeground=self.fg_color, font=("Segoe UI", 8))
        self.btn_show_key.pack(side="right", padx=(5, 0))
        
        # Startup Greeting
        self.startup_greeting_var = tk.BooleanVar(value=self.settings.get("startup_greeting", True))
        self.chk_startup = ttk.Checkbutton(left_col, text="Play Greeting at Startup", variable=self.startup_greeting_var, style="TCheckbutton")
        self.chk_startup.pack(anchor="w", pady=(10, 5))
        
        
        # RIGHT COLUMN - Voice & Personality Customization
        right_col = ttk.Frame(main_container, style="Card.TFrame", padding=15)
        right_col.pack(side="right", fill="both", expand=True, padx=(10, 0))
        
        ttk.Label(right_col, text="Personality & Voice settings", style="SubHeader.TLabel").pack(anchor="w", pady=(0, 15))
        
        # Voice Gender
        ttk.Label(right_col, text="Voice Gender:").pack(anchor="w", pady=(5, 2))
        self.voice_gender_var = tk.StringVar(value=self.settings.get("voice_gender", "female"))
        self.combo_gender = ttk.Combobox(right_col, textvariable=self.voice_gender_var, values=["female", "male"], state="readonly")
        self.combo_gender.pack(fill="x", pady=(0, 10))
        
        # Speech Language
        ttk.Label(right_col, text="Speech Language:").pack(anchor="w", pady=(5, 2))
        self.speech_language_var = tk.StringVar(value=self.settings.get("speech_language", "english"))
        self.combo_lang = ttk.Combobox(right_col, textvariable=self.speech_language_var, values=["english", "hindi"], state="readonly")
        self.combo_lang.pack(fill="x", pady=(0, 10))
        
        # Speech Rate
        ttk.Label(right_col, text="Speech Rate (WPM):").pack(anchor="w", pady=(5, 2))
        self.rate_slider = tk.Scale(right_col, from_=120, to_=220, orient="horizontal", bg=self.card_bg, fg=self.fg_color, highlightbackground=self.card_bg, activebackground=self.accent_color, troughcolor="#313244")
        self.rate_slider.set(self.settings.get("speech_rate", 170))
        self.rate_slider.pack(fill="x", pady=(0, 10))
        
        # Personality Preset Select
        ttk.Label(right_col, text="Choose Personality Preset:").pack(anchor="w", pady=(5, 2))
        self.preset_var = tk.StringVar(value="Custom / Default")
        self.combo_preset = ttk.Combobox(right_col, textvariable=self.preset_var, values=list(PERSONALITY_PRESETS.keys()), state="readonly")
        self.combo_preset.pack(fill="x", pady=(0, 10))
        self.combo_preset.bind("<<ComboboxSelected>>", self.on_preset_select)
        
        # Personality Prompt Text Area
        ttk.Label(right_col, text="Personality System Prompt:").pack(anchor="w", pady=(5, 2))
        self.txt_personality = tk.Text(right_col, height=7, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10), wrap="word")
        self.txt_personality.pack(fill="both", expand=True, pady=(0, 5))
        self.txt_personality.insert("1.0", self.settings.get("personality", PERSONALITY_PRESETS["Custom / Default"]))
        
        
        # BOTTOM FRAME - Actions
        bottom_frame = ttk.Frame(self.root, style="TFrame")
        bottom_frame.pack(fill="x", padx=20, pady=20)
        
        # Save Button
        self.btn_save_config = tk.Button(bottom_frame, text="💾 Save Settings", command=self.save_all_settings, bg=self.btn_save, fg="#11111b", relief="flat", font=("Segoe UI", 11, "bold"), padx=15, pady=8, activebackground="#8fdb89")
        self.btn_save_config.pack(side="right", padx=(10, 0))
        
        # Test Voice Button
        self.btn_test_speech = tk.Button(bottom_frame, text="🔊 Test Voice", command=self.test_voice_tts, bg=self.btn_test, fg="#11111b", relief="flat", font=("Segoe UI", 11, "bold"), padx=15, pady=8, activebackground="#f5e0a0")
        self.btn_test_speech.pack(side="right")
        
    def toggle_api_key_visibility(self):
        """Toggle mask/unmask on Nvidia API Key entry."""
        if self.ent_api_key.cget("show") == "*":
            self.ent_api_key.configure(show="")
            self.btn_show_key.configure(text="🙈")
        else:
            self.ent_api_key.configure(show="*")
            self.btn_show_key.configure(text="👁")
            
    def on_preset_select(self, event=None):
        """Update personality description text when user changes selection preset."""
        preset_name = self.preset_var.get()
        if preset_name in PERSONALITY_PRESETS:
            self.txt_personality.delete("1.0", tk.END)
            self.txt_personality.insert("1.0", PERSONALITY_PRESETS[preset_name])
            
    def test_voice_tts(self):
        """Invoke non-blocking TTS voice test with chosen gender and rate."""
        gender = self.voice_gender_var.get()
        rate = self.rate_slider.get()
        language = self.speech_language_var.get()
        
        # Run test in thread to prevent UI freezing
        t = threading.Thread(target=speak_test, args=(gender, rate, language), daemon=True)
        t.start()
        
    def save_all_settings(self):
        """Gather values and save back to settings.json."""
        self.settings["assistant_name"] = self.assistant_name_var.get().strip()
        self.settings["wake_word"] = self.wake_word_var.get().strip().lower()
        self.settings["user_name"] = self.user_name_var.get().strip()
        self.settings["nvidia_model"] = self.nvidia_model_var.get().strip()
        self.settings["nvidia_api_key"] = self.api_key_var.get().strip()
        self.settings["voice_gender"] = self.voice_gender_var.get()
        self.settings["speech_language"] = self.speech_language_var.get()
        self.settings["speech_rate"] = int(self.rate_slider.get())
        self.settings["startup_greeting"] = self.startup_greeting_var.get()
        
        # Read multiline personality text
        personality_text = self.txt_personality.get("1.0", tk.END).strip()
        self.settings["personality"] = personality_text
        
        # Basic validation
        if not self.settings["assistant_name"]:
            messagebox.showwarning("Warning", "Assistant Name cannot be empty!")
            return
        if not self.settings["wake_word"]:
            messagebox.showwarning("Warning", "Wake word cannot be empty!")
            return
            
        # Perform save
        if save_settings(self.settings):
            messagebox.showinfo("Success", "Settings saved successfully to settings.json!")

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminPanel(root)
    root.mainloop()
