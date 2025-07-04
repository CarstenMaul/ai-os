# AI-OS

"Panta rhei" - "Everything is in flow" - Herakles

A revolutionary web-based operating system interface powered by artificial intelligence that can create and modify applications on demand using natural language commands and voice input.

![AI-OS Desktop](ai-os_desktop.jpg)

## 🚀 Quick Start

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/CarstenMaul/ai-os.git
    cd ai-os
    ```
2.  **Run Locally**: `python -m http.server 8000 --bind 0.0.0.0`
3.  **Open**: `http://127.0.0.1:8000/ai-os.html`
4.  **Setup**: Complete the Setup Assistant or add your API keys in Settings.
5.  **Create**: Say "Create a calculator app" or type your request.

Your apps and data will automatically persist between sessions!

## 🖥️ Running with a Local Webserver (Recommended)

For the best experience and to avoid potential browser security restrictions (CORS), run `ai-os.html` from a local webserver.

### Python (Easiest)
Navigate to the project directory in your terminal and run:
```bash
# For Python 3
python -m http.server 8000 --bind 0.0.0.0
```

### Other Options
-   **Node.js**: `npm install -g http-server && http-server -p 8000 -a 0.0.0.0`
-   **VS Code**: Use the "Live Server" extension.

## 🌟 Core Features

-   **AI-Powered App Generation**: Create functional applications from natural language or screenshots.
-   **Real-time App Modification**: Modify apps on-the-fly using voice or text.
-   **Advanced Version Control**: Full snapshot management with version history.
-   **3D & Visualization**: Built-in support for Three.js and Chart.js.
-   **API Integration**: Connect external APIs to supercharge your generated apps.
-   **Persistent Storage**: Your apps and data are automatically saved locally.

## ⚙️ Configuration

### API Keys
AI-OS requires API keys for its core functionality. You can configure these in the Settings (⚙️) panel after launching.

1.  **LLM Provider** (Choose one):
    *   **OpenRouter** (Recommended)
    *   **OpenAI**
    *   **LMStudio** (for local models)
2.  **OpenAI API Key** (for Whisper voice recognition).

### Recommended Models
-   **Simple/Fast**: `google/gemini-2.5-flash-lite-preview-06-17`
-   **Tough/Advanced**: `anthropic/claude-sonnet-4`

## 📖 Full Documentation

For a deep dive into all features, architecture, development guidelines, and more, please see our comprehensive technical documentation.

➡️ **[Read the Full Documentation](DOCUMENTATION.md)**

## 📜 License

This project is licensed under the terms of the [LICENSE](LICENSE) file.