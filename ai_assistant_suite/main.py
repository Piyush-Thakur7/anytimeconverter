import sys

def main():
    print("==========================================")
    print("        AI Assistant Desktop Suite        ")
    print("==========================================")
    print("Select your preferred interaction mode:")
    print("  [1] Terminal Chat (Command-Line CLI)")
    print("  [2] Desktop GUI Chat (Modern Window)")
    print("------------------------------------------")
    
    try:
        choice = input("Enter choice (1 or 2): ").strip()
        if choice == "1":
            print("\nLaunching Terminal Chat Mode...")
            from terminal_chat import run_terminal_chat
            run_terminal_chat()
        elif choice == "2":
            print("\nLaunching Desktop GUI Chat Mode...")
            from gui_chat import run_gui_chat
            run_gui_chat()
        else:
            print("Invalid choice. Exiting.")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\nExiting. Goodbye!")
        sys.exit(0)

if __name__ == "__main__":
    main()
