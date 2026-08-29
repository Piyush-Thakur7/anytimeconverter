import os
import json
import tkinter as tk
from tkinter import ttk, messagebox
import threading
from api_client import NIMApiClient
from voice_engine import speak, stop_voice_engine

# Preset personalities
PERSONALITY_PRESETS = {
    "Jarvis-style (Formal Butler)": "You are a sophisticated British butler-style assistant like Jarvis from Iron Man. Address the user as \"Sir\". Be calm, precise, and subtly witty. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Chill Best Friend": "You are the user's laid-back best friend. Talk casually with slang, crack light jokes, be supportive but honest. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Savage / Roast Mode": "You are a sarcastic assistant with attitude. Help the user but tease them playfully and roast them lightly. Never be actually mean or refuse to help. Keep answers short, 1-3 sentences, spoken aloud.",
    "Study Coach": "You are a motivating study mentor. Explain concepts simply, quiz the user when asked, encourage focus, and discourage procrastination. Keep answers short and spoken-friendly.",
    "Hinglish Mode": "You are a friendly desi assistant. Reply in Hinglish (Hindi-English mix) casually, like a close friend from India. Keep answers short, 1-3 sentences, since they are spoken aloud.",
    "Professional Secretary": "You are an efficient professional secretary. Be brief, organized, and action-oriented. Confirm tasks clearly. No small talk unless asked. Answers must be short and spoken aloud."
}

# Settings file path
SETTINGS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "settings.json")

class DesktopChatGui:
    def __init__(self, root):
        self.root = root
        self.root.title("Assistant Desktop Suite")
        self.root.geometry("900x650")
        self.root.resizable(False, False)
        
        # Initialize API client
        self.client = NIMApiClient(SETTINGS_PATH)
        self.settings = self.client.load_settings()
        
        # Color Theme
        self.bg_color = "#1e1e2e"       # Dark slate
        self.card_bg = "#252538"        # Card background
        self.fg_color = "#cdd6f4"       # Light text
        self.accent_color = "#89b4fa"   # Soft blue
        self.btn_send = "#a6e3a1"       # Soft green
        self.chat_user_color = "#89b4fa" # User tag
        self.chat_assistant_color = "#a6e3a1" # Assistant tag
        
        # Apply window background
        self.root.configure(bg=self.bg_color)
        
        # Style configurations
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self.style.configure("TFrame", background=self.bg_color)
        self.style.configure("Sidebar.TFrame", background=self.card_bg)
        self.style.configure("TLabel", background=self.card_bg, foreground=self.fg_color, font=("Segoe UI", 10))
        self.style.configure("Header.TLabel", background=self.card_bg, foreground=self.accent_color, font=("Segoe UI", 12, "bold"))
        self.style.configure("TCheckbutton", background=self.card_bg, foreground=self.fg_color)
        self.style.configure("TCombobox", fieldbackground="#313244", background="#313244", foreground=self.fg_color)
        
        # MAIN GRID LAYOUT
        self.root.columnconfigure(0, weight=1)  # Sidebar (weight 1)
        self.root.columnconfigure(1, weight=2)  # Chat area (weight 2)
        self.root.rowconfigure(0, weight=1)
        
        # --- LEFT SIDEBAR (SETTINGS) ---
        sidebar = ttk.Frame(self.root, style="Sidebar.TFrame", padding=15)
        sidebar.grid(row=0, column=0, sticky="nsew", padx=(10, 5), pady=10)
        
        ttk.Label(sidebar, text="Settings & Customization", style="Header.TLabel").pack(anchor="w", pady=(0, 15))
        
        # User Name
        ttk.Label(sidebar, text="User Name:").pack(anchor="w", pady=(5, 2))
        self.user_name_var = tk.StringVar(value=self.settings.get("user_name", "Boss"))
        self.ent_user_name = tk.Entry(sidebar, textvariable=self.user_name_var, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_user_name.pack(fill="x", pady=(0, 10))
        
        # Assistant Name
        ttk.Label(sidebar, text="Assistant Name:").pack(anchor="w", pady=(5, 2))
        self.assistant_name_var = tk.StringVar(value=self.settings.get("assistant_name", "Jarvis"))
        self.ent_assistant_name = tk.Entry(sidebar, textvariable=self.assistant_name_var, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_assistant_name.pack(fill="x", pady=(0, 10))
        
        # API Key
        ttk.Label(sidebar, text="NVIDIA API Key:").pack(anchor="w", pady=(5, 2))
        self.api_key_var = tk.StringVar(value=self.settings.get("nvidia_api_key", ""))
        self.api_frame = tk.Frame(sidebar, bg=self.card_bg)
        self.api_frame.pack(fill="x", pady=(0, 10))
        
        self.ent_api_key = tk.Entry(self.api_frame, textvariable=self.api_key_var, show="*", bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 10))
        self.ent_api_key.pack(side="left", fill="x", expand=True)
        
        self.btn_show_key = tk.Button(self.api_frame, text="👁", command=self.toggle_api_visibility, bg="#45475a", fg=self.fg_color, relief="flat", activebackground="#585b70", activeforeground=self.fg_color, font=("Segoe UI", 8))
        self.btn_show_key.pack(side="right", padx=(5, 0))
        
        # Voice Enable Toggle
        self.voice_enabled_var = tk.BooleanVar(value=self.settings.get("voice_enabled", True))
        self.chk_voice = ttk.Checkbutton(sidebar, text="Enable Voice Output", variable=self.voice_enabled_var, style="TCheckbutton")
        self.chk_voice.pack(anchor="w", pady=(5, 10))
        
        # Personality Presets
        ttk.Label(sidebar, text="Personality Preset:").pack(anchor="w", pady=(5, 2))
        self.preset_var = tk.StringVar(value="Jarvis-style (Formal Butler)")
        self.combo_preset = ttk.Combobox(sidebar, textvariable=self.preset_var, values=list(PERSONALITY_PRESETS.keys()), state="readonly")
        self.combo_preset.pack(fill="x", pady=(0, 10))
        self.combo_preset.bind("<<ComboboxSelected>>", self.on_preset_select)
        
        # Personality prompt text
        ttk.Label(sidebar, text="System Prompt:").pack(anchor="w", pady=(5, 2))
        self.txt_personality = tk.Text(sidebar, height=5, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 9), wrap="word")
        self.txt_personality.pack(fill="both", expand=True, pady=(0, 15))
        self.txt_personality.insert("1.0", self.settings.get("personality", PERSONALITY_PRESETS["Jarvis-style (Formal Butler)"]))
        
        # Save Settings Button
        self.btn_save = tk.Button(sidebar, text="💾 Save Configurations", command=self.save_settings, bg=self.btn_send, fg="#11111b", relief="flat", font=("Segoe UI", 10, "bold"), pady=6, activebackground="#8fdb89")
        self.btn_save.pack(fill="x")
        
        
        # --- RIGHT COLUMN (CHAT SYSTEM) ---
        chat_container = ttk.Frame(self.root, style="TFrame")
        chat_container.grid(row=0, column=1, sticky="nsew", padx=(5, 10), pady=10)
        
        chat_container.columnconfigure(0, weight=1)
        chat_container.rowconfigure(0, weight=1)  # Message history logs
        chat_container.rowconfigure(1, weight=0)  # Input entry frame
        
        # Message log text area
        self.chat_history = tk.Text(chat_container, bg="#181825", fg=self.fg_color, relief="flat", state="disabled", font=("Segoe UI", 11), wrap="word")
        self.chat_history.grid(row=0, column=0, sticky="nsew", pady=(0, 10))
        
        # Add scrollbar to text log
        scrollbar = ttk.Scrollbar(chat_container, command=self.chat_history.yview)
        scrollbar.grid(row=0, column=0, sticky="nse")
        self.chat_history.configure(yscrollcommand=scrollbar.set)
        
        # Configure tags for chat bubbles
        self.chat_history.tag_configure("user_tag", foreground=self.chat_user_color, font=("Segoe UI", 11, "bold"), justify="right")
        self.chat_history.tag_configure("user_body", foreground=self.fg_color, font=("Segoe UI", 11), justify="right")
        self.chat_history.tag_configure("assistant_tag", foreground=self.chat_assistant_color, font=("Segoe UI", 11, "bold"), justify="left")
        self.chat_history.tag_configure("assistant_body", foreground=self.fg_color, font=("Segoe UI", 11), justify="left")
        self.chat_history.tag_configure("system_log", foreground="#cba6f7", font=("Segoe UI", 10, "italic"), justify="center")
        
        # Bottom Input Area
        input_frame = tk.Frame(chat_container, bg=self.bg_color)
        input_frame.grid(row=1, column=0, sticky="ew")
        
        input_frame.columnconfigure(0, weight=1)
        
        self.entry_message = tk.Entry(input_frame, bg="#313244", fg=self.fg_color, insertbackground=self.fg_color, relief="flat", font=("Segoe UI", 11), bd=8)
        self.entry_message.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.entry_message.bind("<Return>", self.send_message)
        
        self.btn_send_msg = tk.Button(input_frame, text="🕊 Send", command=self.send_message, bg=self.accent_color, fg="#11111b", relief="flat", font=("Segoe UI", 10, "bold"), padx=15, pady=4, activebackground="#74c7ec")
        self.btn_send_msg.grid(row=0, column=1, sticky="ns")
        
        # Welcome greeting output log
        self.append_system_msg("Assistant Desktop Suite initialized. Type your query below.")
        
        # Speak startup greeting
        greeting = f"Hello {self.user_name_var.get()}, {self.assistant_name_var.get()} is online."
        speak(greeting, self.settings.get("voice_gender", "male"), self.settings.get("speech_rate", 170), self.voice_enabled_var.get())
        
    def toggle_api_visibility(self):
        """Show/hide API key character mask."""
        if self.ent_api_key.cget("show") == "*":
            self.ent_api_key.configure(show="")
            self.btn_show_key.configure(text="🙈")
        else:
            self.ent_api_key.configure(show="*")
            self.btn_show_key.configure(text="👁")
            
    def on_preset_select(self, event=None):
        """Change system prompt when personality preset dropdown is selected."""
        name = self.preset_var.get()
        if name in PERSONALITY_PRESETS:
            self.txt_personality.delete("1.0", tk.END)
            self.txt_personality.insert("1.0", PERSONALITY_PRESETS[name])
            
    def append_system_msg(self, text):
        """Append a system instruction message to chat log."""
        self.chat_history.configure(state="normal")
        self.chat_history.insert(tk.END, f"\n*** {text} ***\n", "system_log")
        self.chat_history.see(tk.END)
        self.chat_history.configure(state="disabled")
        
    def append_message(self, sender, text, tag_prefix):
        """Insert a message card alignment into the text log."""
        self.chat_history.configure(state="normal")
        self.chat_history.insert(tk.END, f"\n{sender}\n", f"{tag_prefix}_tag")
        self.chat_history.insert(tk.END, f"{text}\n", f"{tag_prefix}_body")
        self.chat_history.see(tk.END)
        self.chat_history.configure(state="disabled")
        
    def save_settings(self):
        """Collect variables and write back to settings.json."""
        self.settings["user_name"] = self.user_name_var.get().strip()
        self.settings["assistant_name"] = self.assistant_name_var.get().strip()
        self.settings["nvidia_api_key"] = self.api_key_var.get().strip()
        self.settings["voice_enabled"] = self.voice_enabled_var.get()
        self.settings["personality"] = self.txt_personality.get("1.0", tk.END).strip()
        
        if not self.settings["user_name"] or not self.settings["assistant_name"]:
            messagebox.showwarning("Warning", "Names cannot be left blank!")
            return
            
        try:
            with open(SETTINGS_PATH, "w", encoding="utf-8") as f:
                json.dump(self.settings, f, indent=2)
            self.append_system_msg("Configurations saved successfully.")
            messagebox.showinfo("Success", "Settings saved!")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save settings: {e}")
            
    def send_message(self, event=None):
        """Sends chat input, calls API in background, and schedules reply."""
        text = self.entry_message.get().strip()
        if not text:
            return
            
        self.entry_message.delete(0, tk.END)
        
        user_name = self.user_name_var.get()
        self.append_message(user_name, text, "user")
        
        # Disable input while thinking
        self.btn_send_msg.configure(state="disabled")
        self.entry_message.configure(state="disabled")
        
        # Run API request in background thread to prevent UI freezing
        t = threading.Thread(target=self.fetch_api_response, args=(text,))
        t.start()
        
    def fetch_api_response(self, user_query):
        """Background worker thread function for fetching response."""
        reply = self.client.get_response(user_query)
        # Schedule message update in main UI thread
        self.root.after(0, self.on_response_received, reply)
        
    def on_response_received(self, reply):
        """Callback to handle response completion on the main thread."""
        assistant_name = self.assistant_name_var.get()
        
        if reply.startswith("Error:"):
            self.append_system_msg(reply)
            speak("I encountered an error.", self.settings.get("voice_gender", "male"), self.settings.get("speech_rate", 170), self.voice_enabled_var.get())
        else:
            self.append_message(assistant_name, reply, "assistant")
            speak(reply, self.settings.get("voice_gender", "male"), self.settings.get("speech_rate", 170), self.voice_enabled_var.get())
            
        # Re-enable inputs
        self.btn_send_msg.configure(state="normal")
        self.entry_message.configure(state="normal")
        self.entry_message.focus()

def run_gui_chat():
    root = tk.Tk()
    app = DesktopChatGui(root)
    
    # Clean shutdown of speech thread on window close
    def on_closing():
        stop_voice_engine()
        root.destroy()
        
    root.protocol("WM_DELETE_WINDOW", on_closing)
    root.mainloop()

if __name__ == "__main__":
    run_gui_chat()
