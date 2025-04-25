import streamlit as st
import os
from datetime import datetime

# Set your save directory here
SAVE_DIR = "notes"

# Ensure the directory exists
os.makedirs(SAVE_DIR, exist_ok=True)

st.title("📝 Simple Note Taking App")

# Text input area
note = st.text_area("Write your note here:", height=300)

# Toolbar options
col1, col2 = st.columns(2)

with col1:
    if st.button("Bold Selection"):
        note = f"**{note}**"

with col2:
    if st.button("Highlight Selection"):
        note = f"`{note}`"

# Autosave functionality
if note:
    # Filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(SAVE_DIR, f"note_{timestamp}.txt")
    
    # Save the note
    with open(filename, "w", encoding="utf-8") as f:
        f.write(note)

    st.success(f"Note autosaved as {filename}")

st.caption("Type your note, make it bold or highlight, and it will be saved automatically.")
