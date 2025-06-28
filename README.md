# AI-OS

A revolutionary web-based operating system interface powered by artificial intelligence that can create and modify applications on demand using natural language commands and voice input.

You will find some demo-apps, that had been generated with ai-os, in the /demo-apps folder. You can load the demo apps via Start -> Load App

Have fun!

![Alt text](ai-os_desktop.jpg)


## 🌟 Features

### User Features

#### Core App Creation & Management
- **AI-Powered App Generation**: Create fully functional applications using natural language descriptions
- **Image-Based App Creation**: Paste screenshots with Ctrl+V when creating apps for visual app generation
- **Real-time App Modification**: Modify existing applications using voice or text commands with context-aware prompts
- **App Export/Import**: Save and load applications as JSON files with versioning support
- **Demo Apps**: Pre-built example apps included in `/demo-apps` folder for immediate use

#### Advanced Voice Control
- **Voice Commands**: Control the system and create apps using voice input (OpenAI Whisper or Web Speech API)
- **Push-to-Talk**: Hold-to-speak functionality for precise voice control (mouse button or touch)
- **Multi-language Support**: 40+ languages supported for Web Speech API
- **Voice Command Popup**: Visual feedback showing recognized voice commands
- **Touch Support**: Mobile-friendly touch events for voice activation

#### Window & Interface Management
- **Dynamic Window Management**: Drag, resize, minimize, maximize, and manage multiple application windows
- **Auto-sizing**: Intelligent window sizing and centering based on content
- **Taskbar Integration**: Quick access to all running applications with hover tooltips
- **Apps Submenu**: Quick access menu in Start menu for all created apps
- **Focus Management**: Visual indicators for active windows with proper focus handling

#### Built-in System Apps
- **Calculator**: Professional calculator with keyboard support and specific color scheme
- **Digital Clock**: Real-time clock with 12/24-hour format toggle and date display
- **Cost Tracking**: Detailed API usage monitoring with history and export functionality
- **Data Registry Browser**: View and manage shared data objects across apps
- **App Manager**: Comprehensive application management interface
- **Setup Assistant**: First-time setup wizard with progress tracking

#### Theme & Customization
- **Theme Support**: Light and Dark mode themes with automatic app theming
- **Smart Icon Generation**: Automatic icon selection based on app content (100+ icon mappings)
- **Consistent Styling**: Unified design language across system and user-generated apps

### Technical Features

#### App Isolation & Security
- **Sandboxed Execution**: Generated apps run in isolated contexts with unique namespaces (`app_${appId}`)
- **Safe App Import**: Automatic app ID reference replacement during import to prevent conflicts
- **Resource Cleanup**: Automatic cleanup of app resources, event handlers, and namespaces on close
- **Input Validation**: All user inputs sanitized and validated for security

#### Shared Data Registry System
- **Global Data Sharing**: Apps can share data through `window.dataRegistry` API
- **Data Subscription**: Real-time notifications when shared data changes
- **Persistent Storage Integration**: Access to localStorage, sessionStorage, and cookies
- **Data Structure Analysis**: Automatic analysis and documentation of data types and structures

#### Advanced AI Integration
- **Multiple LLM Providers**: Support for OpenRouter, OpenAI API, and LMStudio
- **Model Selection**: Choose between "Simple" and "Tough" models for different complexity needs
- **Context-Aware Modification**: Prompt history tracking for intelligent app modifications
- **Image Analysis**: Process pasted images for enhanced app generation
- **Smart Prompting**: Optimized prompts for generating functional web applications
- **Cost Tracking**: Real-time API usage monitoring with detailed cost breakdown

#### Keyboard Event Management
- **Focus-Aware Key Handling**: Keyboard events only sent to active/focused apps
- **App-Specific Shortcuts**: Apps can register custom keyboard handlers using `app.onKey()` API
- **Global Event Distribution**: Centralized keyboard event management system
- **Automatic Cleanup**: Key handlers automatically removed when apps close

#### Performance & Architecture
- **Efficient DOM Manipulation**: Minimal reflows and optimized rendering
- **Smart Caching**: Intelligent caching of app data and settings
- **Single File Architecture**: Lightweight, no external dependencies
- **Responsive Design**: Optimized for desktop and tablet use
- **Error Handling**: Graceful degradation with user-friendly error messages

#### Development & Extensibility
- **Debug Mode**: Comprehensive logging system with `debugLog`, `debugWarn`, `debugError`
- **Settings Persistence**: Cookie-based settings storage with export/import functionality
- **Theme Inheritance**: Automatic theme application to imported and generated apps
- **Namespace Management**: Isolated JavaScript contexts prevent app conflicts

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI features
- Microphone (optional, for voice commands)

### API Keys Required
1. **OpenAI API Key** (for Whisper voice recognition)
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Generate an API key
   - Add to Settings → AI Models → Voice Recognition

2. **LLM Provider API Key** (choose one):
   - **OpenRouter** (recommended): Sign up at [OpenRouter](https://openrouter.ai/)
   - **OpenAI**: Use your existing OpenAI API key (fully compatible as of v2.0.1)
   - **LMStudio**: Run locally, no API key needed

### Recommended Configurations

#### OpenRouter (Recommended)
For the best results, use OpenRouter with these model selections:
- **Simple Mode**: `google/gemini-2.5-flash-lite-preview-06-17` (fast, cost-effective)
- **Tough Mode**: `anthropic/claude-sonnet-4` (high-quality, advanced reasoning)

#### LMStudio Setup
For local LMStudio usage, ensure these settings are enabled in LMStudio server:
- ✅ **Enable CORS** (required for web browser access)
- ✅ **Serve on Local Network** (allows connections from browser)

Recommended models for LMStudio:
- **Simple Mode**: `microsoft/phi-4` (lightweight, fast)
- **Tough Mode**: `deepseek-r1-0528-qwen3-8b` (advanced reasoning)

### Installation
1. Download the [`ai-os.html`](ai-os.html) file
2. Open it in your web browser
3. Complete the Setup Assistand or configure your API keys in Settings (⚙️)
4. Start creating apps with voice or text commands!

## 🎯 Usage

### Creating Apps
1. **Voice Command**: Click the microphone button and say "Create a calculator app"
2. **Text Input**: Click the Start button and type your app description
3. **Image-Based**: Paste screenshots with Ctrl+V in the app request field
4. **Start Menu**: Use the built-in app creation interface

### Voice Commands Examples
- "Create a todo list app"
- "Make a weather dashboard"
- "Build a simple calculator"
- "Create a note-taking application"
- "Make a timer app"

### Modifying Apps
1. Click the microphone button (🎤) in any app window
2. Speak your modification request
3. Or click the text button (✏️) to type modifications

### Window Management
- **Drag**: Click and drag the title bar to move windows
- **Resize**: Drag the resize handle in the bottom-right corner
- **Minimize**: Click the "−" button
- **Maximize**: Click the "□" button
- **Close**: Click the "×" button

### Using System Apps
- **Calculator**: Access via Start menu, includes keyboard support
- **Digital Clock**: Real-time clock with format toggle
- **Cost Tracking**: Monitor API usage and costs
- **Data Registry**: View shared data between apps
- **App Manager**: Manage all created applications

## ⚙️ Configuration

### Settings Categories

#### Appearance
- **Theme**: Light/Dark mode selection
- **Automatic theming**: Apps adapt to system theme

#### Voice & Audio
- **Recognition Engine**: Choose between Whisper and Web Speech API
- **Language**: Select from 40+ supported languages
- **Microphone Test**: Built-in audio level testing

#### AI Models
- **Provider Selection**: OpenRouter (recommended), OpenAI, or LMStudio
- **Model Configuration**: Separate simple/tough model settings for optimal performance
- **API Endpoints**: Customizable API URLs
- **Cost Tracking**: Monitor and track API usage costs

**Recommended Model Settings:**
- **OpenRouter Simple**: `google/gemini-2.5-flash-lite-preview-06-17`
- **OpenRouter Tough**: `anthropic/claude-sonnet-4`
- **OpenAI Simple**: `gpt-4o-mini` (cost-effective, fast)
- **OpenAI Tough**: `gpt-4o` (high-quality, advanced reasoning)
- **LMStudio Simple**: `microsoft/phi-4`
- **LMStudio Tough**: `deepseek-r1-0528-qwen3-8b`

#### System
- **Debug Mode**: Enable detailed logging
- **Settings Export/Import**: Backup and restore configurations
- **Cache Management**: Clear cached data

## 🏗️ Architecture

### Core Components
- **Window Manager**: Handles application windows and UI with focus management
- **AI Engine**: Processes natural language and generates applications
- **Voice System**: Manages speech recognition and audio input with multi-modal support
- **App Runtime**: Executes and manages generated applications with isolation
- **Settings Manager**: Handles configuration and persistence
- **Data Registry**: Global data sharing system between apps
- **Namespace Manager**: Ensures app isolation and prevents conflicts

### Generated App Structure
Each AI-generated app consists of:
- **HTML**: User interface markup
- **CSS**: Styling with theme support
- **JavaScript**: Interactive functionality with isolated namespace
- **Metadata**: Title, description, and configuration
- **Init Function**: Proper initialization with `window[appNamespace].init`

### Theme System
- Apps automatically inherit system theme
- CSS classes: `.app-light-theme` and `.app-dark-theme`
- Consistent color schemes and accessibility
- Dynamic theme application to imported apps

### Data Registry System
- **Global Access**: `window.dataRegistry.getData(name)`
- **Data Registration**: `window.dataRegistry.registerData(name, data, description, structure)`
- **Change Notifications**: `window.dataRegistry.subscribe(name, callback)`
- **Persistent Storage**: Integration with localStorage and sessionStorage

### Keyboard Event System
- **Focus-Aware**: Events only sent to active apps
- **App Registration**: `app.onKey(eventType, handler)`
- **Automatic Cleanup**: Handlers removed when apps close
- **Global Management**: Centralized event distribution

## 🔧 Technical Details

### Supported Technologies
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI Models**: GPT-4, Claude, Gemini, and other LLM providers
- **Voice**: OpenAI Whisper API, Web Speech API
- **Storage**: LocalStorage, Cookies for persistence
- **Data Sharing**: Custom data registry system

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Performance
- **Lightweight**: Single HTML file, no external dependencies
- **Responsive**: Optimized for desktop and tablet use
- **Efficient**: Minimal resource usage, smart caching
- **Isolated Execution**: Apps run in separate namespaces for stability

### Security Features
- **API Key Protection**: Keys stored locally, never transmitted unnecessarily
- **Sandboxed Execution**: Generated apps run in isolated contexts
- **Input Validation**: All user inputs sanitized and validated
- **Safe Import**: App ID references safely replaced during import

## 📊 Cost Management

### Cost Tracking Features
- **Real-time Monitoring**: Track API costs as you use the system through data registry
- **Detailed History**: View cost breakdown by request type with timestamps
- **Export Data**: Download cost reports for analysis
- **Budget Awareness**: Monitor spending across different AI providers
- **Cost Tracking App**: Built-in system app for comprehensive cost analysis

### Typical Costs (Approximate)
- **Simple App Creation**: $0.001 - $0.01 per app
- **Complex App Creation**: $0.01 - $0.05 per app
- **App Modifications**: $0.005 - $0.02 per modification
- **Voice Recognition**: $0.001 - $0.005 per command

## 🛠️ Development

### Extending the System
The AI-OS is designed to be extensible:

1. **Custom Prompts**: Modify the app generation prompts
2. **New Providers**: Add support for additional LLM providers
3. **System Apps**: Create built-in applications
4. **Themes**: Develop custom theme systems
5. **Data Registry**: Create shared data objects for app communication

### App Development Guidelines
- **Use Data Registry**: Access shared data with `window.dataRegistry.getData()`
- **Implement Init Function**: Use `window[appNamespace].init` for setup
- **Handle Keyboard Events**: Register with `app.onKey()` for keyboard support
- **Theme Support**: Use `.app-light-theme` and `.app-dark-theme` classes
- **Namespace Isolation**: All app code should be namespaced properly

### Code Structure
```
ai-os.html
├── HTML Structure
├── CSS Styling
│   ├── Window Management
│   ├── Theme System
│   ├── Setup Assistant
│   └── Component Styles
└── JavaScript Logic
    ├── App Management
    ├── AI Integration
    ├── Voice System
    ├── Settings Manager
    ├── Window Manager
    ├── Data Registry
    ├── Keyboard Handler
    └── Cost Tracking
```

## 🔒 Privacy & Security

### Data Handling
- **Local Storage**: Settings and preferences stored locally
- **API Communication**: Secure HTTPS connections to AI providers
- **No Data Collection**: No personal data collected or transmitted
- **Voice Privacy**: Audio processed by chosen provider only
- **Data Registry**: Shared data stored locally, not transmitted

### Security Features
- **API Key Protection**: Keys stored locally, never transmitted unnecessarily
- **Sandboxed Execution**: Generated apps run in isolated contexts
- **Input Validation**: All user inputs sanitized and validated
- **Safe App Loading**: App ID references safely replaced during import
- **Namespace Isolation**: Apps cannot interfere with each other

## 🐛 Troubleshooting

### Common Issues

#### Voice Recognition Not Working
1. Check microphone permissions in browser
2. Verify API key configuration
3. Test microphone using built-in test tool
4. Try switching between Whisper and Web Speech API

#### App Generation Fails
1. Verify LLM provider API key
2. Check internet connection
3. Review API quota/limits
4. Try switching to different model

#### LMStudio Connection Issues
1. Ensure LMStudio server is running
2. Verify "Enable CORS" is checked in LMStudio server settings
3. Verify "Serve on Local Network" is enabled in LMStudio server settings
4. Check that the correct local URL is configured (usually `http://localhost:1234/v1/chat/completions`)
5. Ensure a model is loaded in LMStudio

#### Performance Issues
1. Close unused applications
2. Clear browser cache
3. Disable debug mode
4. Check available system memory

#### App Import/Export Issues
1. Ensure JSON file is valid
2. Check for app ID conflicts
3. Verify app version compatibility
4. Try importing individual apps instead of bulk import

### Debug Mode
Enable debug mode in Settings → System for detailed logging and troubleshooting information. This provides comprehensive logging through `debugLog`, `debugWarn`, and `debugError` functions.

## 🔄 Recent Updates (v2.0.1)

### OpenAI API Compatibility Improvements
Recent updates have significantly improved OpenAI API integration:

#### Fixed Issues
- **Model Selection Display**: Resolved issue where OpenAI model names weren't displayed correctly when OpenAI was selected as the LLM provider
- **API Parameter Compatibility**: Updated API requests to use OpenAI-compatible parameters:
  - Changed `max_tokens` to `max_completion_tokens` for OpenAI requests
  - Set temperature to `1` (default) for OpenAI models that don't support custom temperature values
  - Maintained backward compatibility with OpenRouter and LMStudio using original parameters

#### Technical Changes
- Enhanced provider-specific parameter handling in API requests
- Improved settings application logic to correctly update model configurations
- Added conditional parameter setting based on the selected LLM provider

#### Benefits
- **Seamless OpenAI Integration**: OpenAI API now works without parameter errors
- **Better Model Display**: Correct model names (e.g., `gpt-4o-mini`, `gpt-4o`) shown in the interface
- **Improved Reliability**: More stable API communication across all supported providers

## 📈 Roadmap

### Planned Features
- **Mobile Support**: Touch-optimized interface for smartphones
- **Plugin System**: Third-party extensions and integrations
- **Collaboration**: Multi-user app development
- **App Store**: Share and discover community-created apps
- **Advanced AI**: More sophisticated app generation capabilities
- **Enhanced Data Registry**: More data types and persistence options

### Version History
- **v2.0.1**: Latest version with improved OpenAI API compatibility
  - Fixed model selection display for OpenAI provider
  - Updated API parameters for OpenAI compatibility (`max_completion_tokens`, temperature handling)
  - Enhanced provider-specific parameter handling
- **v2.0.0**: Voice commands and multi-provider support
- **v1.0.0**: Initial release with basic app generation

## 🤝 Contributing

This is an experimental project exploring AI-powered interfaces. Contributions, suggestions, and feedback are welcome!

### Ways to Contribute
- Report bugs and issues
- Suggest new features
- Improve documentation
- Share interesting use cases
- Develop custom themes or extensions
- Create system apps
- Enhance the data registry system

## 📄 License

This project is released under the Apache 2.0 License. See [`LICENSE`](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI**: For GPT models and Whisper API
- **Anthropic**: For Claude models
- **Google**: For Gemini models
- **OpenRouter**: For unified LLM access
- **Web Speech API**: For browser-based voice recognition

## 📞 Support

For questions, issues, or suggestions:
- Open an issue in the repository
- Check the troubleshooting section
- Review the settings configuration guide
- Use the built-in debug mode for detailed logging

---

**AI-OS** - Where artificial intelligence meets operating system design. Create, modify, and manage applications using the power of natural language and voice commands.