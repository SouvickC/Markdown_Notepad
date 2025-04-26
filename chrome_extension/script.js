const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

let sessionFilename;

// Simple function to generate filename
function initSession() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.]/g, '');
  sessionFilename = `note-${timestamp}.md`;
  status.textContent = `Ready to save: ${sessionFilename}`;
}

// Function to save document
function saveDoc() {
  const htmlContent = editor.innerHTML;
  const mdContent = htmlContent.replace(/<[^>]*>?/gm, ''); // removing HTML tags
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

// Wait until page loaded
window.addEventListener('DOMContentLoaded', () => {
  initSession();
  saveBtn.addEventListener('click', saveDoc);

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      document.execCommand('bold', false, null);
    }
  });
});


const summarizeBtn = document.getElementById('summarizeBtn');
const summaryText = document.getElementById('summaryText');

// Summarize note function
async function generateSummary() {
  const content = editor.innerText.trim();
  if (!content) {
    summaryText.textContent = "No content to summarize!";
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this text:\n\n${content}` }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const summary = data.choices[0].message.content.trim();
    summaryText.textContent = summary;
  } catch (error) {
    console.error(error);
    summaryText.textContent = "Error generating summary.";
  }
}

// Attach listener
summarizeBtn.addEventListener('click', generateSummary);
