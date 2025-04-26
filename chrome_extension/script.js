
    // ================== Configuration ==================
    // Files download silently to the browser's default download location.
    // No autosave; use the Save Note button.
    const FILENAME_PREFIX = 'note_';
    // ====================================================

    const editor = document.getElementById('editor');
    const status = document.getElementById('status');
    const saveBtn = document.getElementById('saveBtn');
    let sessionFilename;

    // Generate a unique filename once per page load
    function initSession() {
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, '_');
      sessionFilename = `${FILENAME_PREFIX}${timestamp}.md`;
      status.textContent = `Session file: ${sessionFilename}`;
    }

    // Convert HTML in editor to Markdown (simple conversion)
    function htmlToMarkdown(html) {
      let md = html;
      md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');
      md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
      md = md.replace(/<div>/gi, '\n');
      md = md.replace(/<\/div>/gi, '\n');
      md = md.replace(/<br\s*\/?>/gi, '\n');
      md = md.replace(/<[^>]+>/g, '');
      return md;
    }

    // Save document via silent download
    function saveDoc() {
      const htmlContent = editor.innerHTML;
      const mdContent = htmlToMarkdown(htmlContent);
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

    // Initialize session on load
    window.addEventListener('DOMContentLoaded', initSession);

    // Manual save on button click
    saveBtn.addEventListener('click', saveDoc);

    // Ctrl+B for bold
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        document.execCommand('bold', false, null);
      }
    });