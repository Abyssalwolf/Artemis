from win10toast import ToastNotifier
import time

# Create an instance of the ToastNotifier
toaster = ToastNotifier()

def focus_reminder():
    while True:
        # Show a desktop notification
        toaster.show_toast(
            "Focus Reminder", 
            "Remember to focus on your task! Stay productive.", 
            duration=10  # Notification will stay for 10 seconds
        )
        # Wait for 10 minutes (600 seconds) before sending the next notification
        time.sleep(20)

# Start the reminder
focus_reminder()
