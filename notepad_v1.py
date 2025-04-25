import streamlit as st
import os
from datetime import datetime

# Set your save directory here
SAVE_DIR = "notes"

# Ensure the directory exists
os.makedirs(SAVE_DIR, exist_ok=True)
print(f"DEBUG: Ensured save directory exists at {SAVE_DIR}")

st.title("📝 Simple Note Taking App")

# Text input area
note = st.text_area(
    "Write your note here (use Ctrl+Shift+B for Bold, Ctrl+Shift+H for Highlight):",
    height=300,
    key="note_area"
)
print(f"DEBUG: Retrieved note, length {len(note)} characters")

# Toolbar options
col1, col2 = st.columns(2)

# JavaScript to capture keyboard shortcuts with Ctrl+Shift injected into main DOM
st.markdown(
    """
    <script>
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'b') {
            event.preventDefault();
            console.log('DEBUG: Ctrl+Shift+B detected (JS)');
            const textarea = document.querySelector('textarea');
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const before = text.substring(0, start);
                const selected = text.substring(start, end);
                const after = text.substring(end);
                textarea.value = before + '**' + selected + '**' + after;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'h') {
            event.preventDefault();
            console.log('DEBUG: Ctrl+Shift+H detected (JS)');
            const textarea = document.querySelector('textarea');
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const before = text.substring(0, start);
                const selected = text.substring(start, end);
                const after = text.substring(end);
                textarea.value = before + '`' + selected + '`' + after;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });
    </script>
    """,
    unsafe_allow_html=True,
)

with col1:
    if st.button("Bold Selection"):
        print("DEBUG: Bold button pressed")
        note = f"**{note}**"

with col2:
    if st.button("Highlight Selection"):
        print("DEBUG: Highlight button pressed")
        note = f"`{note}`"

# Autosave functionality
if note:
    # Filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(SAVE_DIR, f"note_{timestamp}.txt")
    print(f"DEBUG: Saving note to {filename}")
    
    # Save the note
    with open(filename, "w", encoding="utf-8") as f:
        f.write(note)
    print("DEBUG: Note saved successfully")

    st.success(f"Note autosaved as {filename}")

st.caption(
    "Type your note, make it bold or highlight, and it will be saved automatically. Use Ctrl+Shift+B to Bold and Ctrl+Shift+H to Highlight!"
)
