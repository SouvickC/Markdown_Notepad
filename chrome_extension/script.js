const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');
const summarizeBtn = document.getElementById('summarizeBtn');
const status = document.getElementById('status');
const summaryText = document.getElementById('summaryText');

let sessionFilename;

// Initialize new session
function initSession() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.]/g, '');
  sessionFilename = `note-${timestamp}.md`;
  status.textContent = `Ready to save: ${sessionFilename}`;
}

// Save document
function saveDoc() {
  const htmlContent = editor.innerHTML;
  const mdContent = htmlContent.replace(/<[^>]*>?/gm, '');
  const blob = new Blob([mdContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = sessionFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  status.textContent = `Saved: ${sessionFilename} at ${new Date().toLocaleTimeString()}`;
}

// Summarize note using local Ollama Gamma
async function summarizeNote() {
  const noteContent = editor.innerText.trim();

  if (!noteContent) {
    summaryText.innerText = "Please write something to summarize.";
    return;
  }

  status.textContent = "Summarizing...";

  try {
    const response = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gemma3:1b-it-qat",
        prompt: `Summarize the following text:\n\n${noteContent}`,
        stream: false
      })
    });

    const data = await response.json();
    console.log("Received data from server:", data);
    const summary = data.response || data.message || "No summary found.";

    summaryText.innerText = summary;
    status.textContent = "Summary generated!";
  } catch (error) {
    console.error("Error summarizing:", error);
    summaryText.innerText = "Failed to summarize. Please check if Ollama is running.";
    status.textContent = "Error.";
  }
}

// Shortcuts and button bindings
window.addEventListener('DOMContentLoaded', () => {
  initSession();
  saveBtn.addEventListener('click', saveDoc);
  summarizeBtn.addEventListener('click', summarizeNote);

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      document.execCommand('bold', false, null);
    }
  });
});
