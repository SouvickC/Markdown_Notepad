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
