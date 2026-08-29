import os
import json
from openai import OpenAI
import openai

class NIMApiClient:
    def __init__(self, settings_path):
        self.settings_path = settings_path
        self.conversation_history = []  # Stores list of dicts: {"role": ..., "content": ...}
        
    def load_settings(self):
        """Helper to reload settings dynamically on query."""
        if os.path.exists(self.settings_path):
            try:
                with open(self.settings_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return {}

    def clear_memory(self):
        """Clears conversation context memory."""
        self.conversation_history = []

    def get_response(self, user_query):
        """Sends user query to Llama 3.1 8B via NVIDIA NIM API and returns response text."""
        settings = self.load_settings()
        api_key = settings.get("nvidia_api_key", "").strip()
        model_name = settings.get("nvidia_model", "meta/llama-3.1-8b-instruct")
        personality = settings.get("personality", "You are a helpful assistant.")
        user_name = settings.get("user_name", "Boss")
        assistant_name = settings.get("assistant_name", "Jarvis")
        
        # Check if key is empty/placeholder
        if not api_key or api_key == "PASTE_KEY_HERE":
            return "Error: NVIDIA API Key is not configured. Please enter it in the settings sidebar."
            
        try:
            # Initialize client
            client = OpenAI(
                base_url="https://integrate.api.nvidia.com/v1",
                api_key=api_key
            )
            
            # Format system prompt
            system_content = f"{personality}\nThe user's name is {user_name}. Your name is {assistant_name}."
            
            # Build messages list
            messages = [{"role": "system", "content": system_content}]
            
            # Append conversation history
            messages.extend(self.conversation_history)
            
            # Append current user query
            messages.append({"role": "user", "content": user_query})
            
            # Call NVIDIA NIM API
            # max_tokens=150 since answers should be kept short (1-3 sentences)
            completion = client.chat.completions.create(
                model=model_name,
                messages=messages,
                temperature=0.2,
                top_p=0.7,
                max_tokens=150
            )
            
            reply = completion.choices[0].message.content.strip()
            
            # Update memory history
            self.conversation_history.append({"role": "user", "content": user_query})
            self.conversation_history.append({"role": "assistant", "content": reply})
            
            # Maintain memory limit (keep only last 10 messages = 5 exchanges)
            if len(self.conversation_history) > 10:
                self.conversation_history = self.conversation_history[-10:]
                
            return reply
            
        except openai.AuthenticationError:
            return "Error: Authentication failed. The NVIDIA API key in settings is invalid."
        except openai.APIConnectionError:
            return "Error: Network connection failed. Please check your internet connection."
        except Exception as e:
            return f"Error: An unexpected error occurred: {e}"
