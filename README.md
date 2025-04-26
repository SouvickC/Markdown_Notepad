# Markdown Notepad with Offline Summarizer

Welcome to **Markdown Notepad**, a lightweight **offline-first** note-taking Chrome Extension that allows you to write notes in Markdown and instantly generate **AI-powered summaries** — **without any internet connection**.

[Markdown Notepad Logo](chrome_extension\icon.png)

---

## Key Features

-  **Markdown Support**: Write notes with basic Markdown formatting (bold, italic, headers, lists).
-  **Instant Summarization**: Summarize your notes using a local **gemma3:1b-it-qat LLM** (downloaded from Ollama).
-  **Fully Offline**:  No internet required. Data never leaves your machine.
-  **Save Notes**: One-click export as `.md` files.


---

## Architecture Overview

[Chrome Extension Frontend]
       ↓
[Python Flask Proxy Server]
       ↓
[Ollama Server with Gamma 1B Model]

---

##  Prerequisites

Make sure you have installed:

- **Python 3.x**
- **Chrome Browser**
- **flask**
- **[Ollama](https://ollama.com/)** installed locally (for running LLM models)
- **Desired LLM** model downloaded via Ollama

---

## Steps to Set Up

### 1. Clone This Repository

```bash
git clone https://github.com/your-username/markdown-notepad.git
cd markdown-notepad
