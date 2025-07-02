# AI-OS

"Panta rhei" - "Everything is in flow"  
Greek philosopher Herakles  


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
- **Advanced Version Control**: Complete snapshot management with smart save states and version history
- **App Export/Import**: Save and load applications as JSON files with versioning support
- **Demo Apps**: Pre-built example apps included in `/demo-apps` folder for immediate use

#### Advanced Version Control System
- **Smart Save Management**: Save button only enabled when apps have unsaved changes
- **Snapshot Creation**: Create named snapshots of app states with custom descriptions
- **Version History**: Complete timeline of all app modifications with timestamps
- **Active State Tracking**: Visual indicators show which snapshot is currently active
- **Safe Snapshot Deletion**: Remove unwanted versions with protection for active snapshots
- **Unified Management Interface**: Single dialog for viewing, reverting, and managing all snapshots
- **Non-Blocking Dialogs**: Custom prompts and confirmations that don't freeze the interface
- **Automatic State Detection**: System intelligently tracks when apps are modified or saved

#### App & Data Persistence
- **Persistent App Storage**: Apps automatically saved to IndexedDB when created or modified
- **Session Restoration**: Apps and their data persist across browser sessions
- **Lazy Loading**: Persistent apps only loaded when accessed from Start menu
- **Data Object Persistence**: Shared data objects maintain state between sessions
- **Smart Duplicate Prevention**: System apps don't create duplicate entries in persistence
- **Automatic State Recovery**: Apps restore to their exact last state including data

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
- **API Registry Manager**: Configure and manage external API endpoints with authentication
- **App Manager**: Comprehensive application management interface
- **Setup Assistant**: First-time setup wizard with progress tracking

#### Enhanced User Interface
- **Non-Blocking Dialog System**: Custom prompts and confirmations that maintain interface responsiveness
- **Professional Popups**: Styled dialogs replace browser defaults with consistent design
- **Smart Save Controls**: Visual feedback for save states with intelligent button management
- **Version Management UI**: Comprehensive interface for snapshot creation, deletion, and restoration
- **Accessible Design**: Screen reader friendly with proper ARIA support and keyboard navigation
- **Theme Integration**: All dialogs automatically adapt to light/dark themes

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
- **Persistent Storage Integration**: Automatic persistence to IndexedDB
- **Session Recovery**: Data objects restored on system startup
- **Data Structure Analysis**: Automatic analysis and documentation of data types and structures
- **Cross-Session Continuity**: Data maintains state between browser sessions

#### API Registry System
- **External API Integration**: Register and manage external API endpoints for app generation
- **Authentication Support**: Multiple authentication types (Bearer tokens, API keys, query parameters)
- **API Testing**: Built-in connection testing with detailed status reporting
- **Smart Authentication**: Automatic Bearer token formatting for OpenAI and similar APIs
- **API Discovery**: LLM automatically discovers and uses registered APIs when generating apps
- **Secure Storage**: API keys stored locally with proper encryption and access control
- **Usage Guidance**: Contextual help and examples for different API authentication methods
- **Status Monitoring**: Real-time API health monitoring with detailed error reporting

#### Advanced AI Integration
- **Multiple LLM Providers**: Support for OpenRouter, OpenAI API, and LMStudio
- **Model Selection**: Choose between "Simple" and "Tough" models for different complexity needs
- **Context-Aware Modification**: Prompt history tracking for intelligent app modifications
- **Image Analysis**: Process pasted images for enhanced app generation
- **Smart Prompting**: Optimized prompts for generating functional web applications
- **Cost Tracking**: Real-time API usage monitoring with detailed cost breakdown

#### 3D Graphics & Visualization Support
- **Three.js Integration**: Pre-loaded Three.js v0.177.0 for 3D graphics, WebGL, and immersive animations
- **Chart.js Integration**: Pre-loaded Chart.js v4.4.1 for data visualization and charts
- **Responsive 3D Rendering**: Automatic window sizing and resize handling for 3D scenes
- **High-Quality Graphics**: Anti-aliasing and high-DPI display support for crisp visuals
- **Dynamic Layout Support**: ResizeObserver integration for adaptive 3D containers

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
3. Complete the Setup Assistant or configure your API keys in Settings (⚙️)
4. **Your apps and data will automatically persist between sessions**
5. Start creating apps with voice or text commands!

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

### Version Control & Snapshots
1. **Creating Snapshots**: Click the save button (💾) when you want to save the current app state
2. **Smart Save Indication**: Save button is only enabled when there are unsaved changes
3. **Managing Versions**: Click the revert button (🔄) to view, restore, or delete snapshots
4. **Active State Tracking**: Current active snapshot is clearly marked with green border and "(ACTIVE)" label
5. **Safe Deletion**: Delete unwanted snapshots while protecting the currently active version
6. **Custom Descriptions**: Add meaningful descriptions when creating snapshots for easy identification

### 3D Graphics & Visualization Apps
AI-OS now supports creating sophisticated 3D graphics and data visualization applications:

#### 3D Graphics Examples
- "Create a 3D rotating cube viewer"
- "Make a 3D solar system simulation"
- "Build a WebGL particle system"
- "Create an immersive 3D scene"
- "Make a 3D game with physics"

#### Data Visualization Examples
- "Create a sales dashboard with charts"
- "Make an interactive pie chart for budget tracking"
- "Build a real-time analytics dashboard"
- "Create a data visualization tool for CSV files"

#### Advanced Features
- **Responsive Design**: 3D scenes automatically adapt to window resizing
- **High-Quality Rendering**: Anti-aliasing and high-DPI support for crisp graphics
- **Performance Optimized**: Efficient rendering with proper resource management

### Window Management
- **Drag**: Click and drag the title bar to move windows
- **Resize**: Drag the resize handle in the bottom-right corner
- **Minimize**: Click the "−" button
- **Maximize**: Click the "□" button
- **Close**: Click the "×" button

### App Persistence & Management
- **Automatic Saving**: Apps are automatically saved when created or modified
- **Session Recovery**: All apps and data restored when reopening AI-OS
- **Start Menu Access**: Persistent apps appear in Start → All Apps submenu
- **Lazy Loading**: Apps load only when clicked, improving performance
- **Data Continuity**: Apps resume exactly where you left off

### Using System Apps
- **Calculator**: Access via Start menu, includes keyboard support
- **Digital Clock**: Real-time clock with format toggle
- **Cost Tracking**: Monitor API usage and costs
- **Data Registry**: View shared data between apps
- **API Registry**: Configure external APIs for enhanced app generation
- **App Manager**: Manage all created applications

### API Registry & External Services
AI-OS now supports integrating external APIs to enhance app generation capabilities:

#### Setting Up APIs
1. **Access API Registry**: Go to Settings → API Registry
2. **Add New API**: Click "Add New API" button
3. **Configure Authentication**: Choose appropriate authentication method
4. **Test Connection**: Use built-in testing to verify API connectivity
5. **Enable for Apps**: Activated APIs are automatically available to generated apps

#### Supported Authentication Types
- **Bearer Token**: For APIs like OpenAI, Anthropic Claude (Authorization header)
- **API Key (Header)**: Custom header-based authentication
- **API Key (Query Parameter)**: URL parameter-based authentication
- **No Authentication**: For public APIs

#### Popular API Examples
- **OpenAI API**: For ChatGPT integration in generated apps
- **Weather APIs**: For weather data in dashboard apps
- **News APIs**: For news aggregation applications
- **Financial APIs**: For stock market and trading apps
- **Social Media APIs**: For social platform integrations

#### How It Works
1. **Automatic Discovery**: When creating apps, the LLM automatically detects available APIs
2. **Smart Integration**: APIs are intelligently integrated based on app requirements
3. **Proper Authentication**: Authentication is handled automatically with correct formatting
4. **Error Handling**: Built-in error handling and fallback mechanisms

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

#### API Registry
- **External API Management**: Register and configure third-party APIs for app generation
- **Authentication Configuration**: Support for Bearer tokens, API keys, and query parameters
- **Connection Testing**: Built-in API testing with detailed status reporting
- **Usage Examples**: Contextual guidance for popular APIs like OpenAI, weather services
- **Security**: Local storage of API keys with proper encryption

#### System
- **Debug Mode**: Enable detailed logging
- **Settings Export/Import**: Backup and restore configurations
- **Cache Management**: Clear cached data

## 🏗️ Architecture

### Core Components
- **Window Manager**: Handles application windows and UI with focus management
- **AI Engine**: Processes natural language and generates applications
- **Version Control System**: Advanced snapshot management with smart save states and history tracking
- **3D Graphics Engine**: Three.js integration for WebGL and 3D rendering
- **Visualization Engine**: Chart.js integration for data visualization
- **Voice System**: Manages speech recognition and audio input with multi-modal support
- **App Runtime**: Executes and manages generated applications with isolation
- **Persistence Manager**: Handles app and data persistence using IndexedDB
- **Settings Manager**: Handles configuration and persistence
- **Data Registry**: Global data sharing system between apps with persistence support
- **API Registry**: External API management system with authentication and testing capabilities
- **Namespace Manager**: Ensures app isolation and prevents conflicts
- **Non-Blocking Dialog System**: Custom prompts and confirmations for responsive user interactions

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
- **3D Graphics**: Three.js v0.177.0 (WebGL, 3D scenes, animations)
- **Data Visualization**: Chart.js v4.4.1 (charts, graphs, dashboards)
- **AI Models**: GPT-4, Claude, Gemini, and other LLM providers
- **Voice**: OpenAI Whisper API, Web Speech API
- **Storage**: IndexedDB, LocalStorage, Cookies for persistence
- **Data Sharing**: Custom data registry system with persistence
- **API Integration**: External API registry with authentication and testing

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

### 3D Graphics & Visualization Capabilities

#### Three.js Features
- **WebGL Rendering**: Hardware-accelerated 3D graphics
- **Responsive Viewports**: Automatic sizing and aspect ratio handling
- **High-DPI Support**: Crisp rendering on retina displays
- **Anti-aliasing**: Smooth graphics with reduced jagged edges
- **Dynamic Resizing**: Real-time adaptation to window size changes
- **Performance Optimization**: Efficient rendering loops and resource management

#### Chart.js Features
- **Multiple Chart Types**: Bar, line, pie, doughnut, and more
- **Responsive Design**: Charts adapt to container size changes
- **Interactive Elements**: Hover effects and click handlers
- **Theme Integration**: Automatic adaptation to light/dark themes
- **Data Binding**: Integration with AI-OS data registry system

#### Technical Implementation
- **Pre-loaded Libraries**: No dynamic loading, immediate availability
- **Namespace Isolation**: 3D scenes and charts isolated per app
- **Memory Management**: Proper cleanup when apps are closed
- **Cross-browser Compatibility**: Consistent behavior across modern browsers

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
6. **API Registry**: Register external APIs for enhanced app capabilities

### App Development Guidelines
- **Use Data Registry**: Access shared data with `window.dataRegistry.getData()`
- **Use API Registry**: Access external APIs with `window.apiRegistry.getAPI()`
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
│   ├── Custom Popup System
│   └── Component Styles
└── JavaScript Logic
    ├── App Management
    ├── AI Integration
    ├── Voice System
    ├── Persistence Manager
    ├── Settings Manager
    ├── Window Manager
    ├── Data Registry
    ├── API Registry
    ├── Custom Popup System
    ├── Keyboard Handler
    └── Cost Tracking
```

## 🔒 Privacy & Security

### Data Handling
- **Local Persistence**: Apps and data stored locally in IndexedDB
- **No Cloud Storage**: All persistence handled locally, no external servers
- **Session Privacy**: Data never leaves your browser
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

#### Persistence & Data Issues
1. **Apps not saving**: Check browser IndexedDB permissions
2. **Data not restoring**: Verify browser storage isn't being cleared
3. **Performance with many apps**: Use lazy loading (apps load on-demand)
4. **Storage quota exceeded**: Clear unused persistent apps via Data Registry
5. **Secure Storage**: IndexedDB provides encrypted local storage
6. **Data Control**: Full user control over persistent data via Data Registry

#### API Registry Issues
1. **API Connection Failed**: Verify API endpoint URL and network connectivity
2. **Authentication Errors**: Check API key format and authentication type selection
3. **OpenAI API Issues**: Ensure "Bearer Token" authentication with "Authorization" header
4. **CORS Errors**: Some APIs don't support browser requests (expected behavior)
5. **Rate Limiting**: Check API provider's rate limits and usage quotas
6. **API Key Invalid**: Verify API key is correct and has proper permissions
7. **Generated Apps Not Using APIs**: Ensure APIs are active and properly configured

### Debug Mode
Enable debug mode in Settings → System for detailed logging and troubleshooting information. This provides comprehensive logging through `debugLog`, `debugWarn`, and `debugError` functions.

## 🔄 Recent Updates (v2.4.0)

### API Registry System
Revolutionary new feature enabling external API integration for enhanced app generation:

#### New API Registry Features
- **External API Management**: Register and configure third-party APIs (OpenAI, weather, news, financial APIs)
- **Multiple Authentication Types**: Support for Bearer tokens, API keys, query parameters, and header authentication
- **Smart Authentication Handling**: Automatic Bearer token formatting for OpenAI and similar APIs
- **Built-in API Testing**: Comprehensive connection testing with detailed status reporting and error analysis
- **Intelligent API Discovery**: LLM automatically detects and integrates registered APIs when generating apps
- **Secure Local Storage**: API keys stored locally with proper encryption and access control
- **Usage Guidance**: Contextual help and examples for different API authentication methods

#### Technical Improvements
- **Enhanced System Prompts**: Updated LLM prompts with API usage patterns and examples
- **Automatic API Integration**: Generated apps automatically use appropriate APIs based on functionality
- **Error Handling**: Robust error handling with user-friendly messages and fallback mechanisms
- **Status Monitoring**: Real-time API health monitoring with detailed connection status
- **Bearer Token Support**: Proper Bearer token formatting for modern APIs like OpenAI

#### User Experience Enhancements
- **Intuitive Configuration**: Step-by-step API setup with clear guidance for popular services
- **Visual Status Indicators**: Color-coded status indicators showing API health and connectivity
- **Test Results**: Detailed test results explaining connection status and authentication issues
- **Configuration Help**: Built-in examples and guidance for OpenAI, weather APIs, and other services

#### Benefits
- **Enhanced App Capabilities**: Generated apps can now integrate with external services automatically
- **Seamless Integration**: APIs are intelligently selected and integrated based on app requirements
- **Professional Authentication**: Proper handling of modern API authentication patterns
- **Local Security**: All API keys stored locally with no external transmission
- **Developer-Friendly**: Clear error messages and testing tools for easy troubleshooting

### Previous Updates (v2.3.0)

### Advanced Version Control & Snapshot Management
Revolutionary improvements to app version control with comprehensive snapshot management:

#### New Version Control Features
- **Smart Save Button**: Only enabled when apps have unsaved changes, disabled after saving
- **Active Snapshot Tracking**: Visual indicators show which snapshot is currently active
- **Snapshot Deletion**: Remove unwanted snapshots with protection for active versions
- **Enhanced Version Dialog**: Unified interface for reverting and managing all snapshots
- **Non-Blocking Dialogs**: Custom prompt and confirmation dialogs replace browser defaults

#### Technical Improvements
- **Dirty State Tracking**: Intelligent detection of app modifications for save button management
- **Active Snapshot Management**: System tracks and protects currently active app states
- **Safe Deletion Logic**: Prevents accidental deletion of active snapshots with clear warnings
- **Consistent UX**: Unified snapshot selection interface for single or multiple versions
- **Automatic Cleanup**: Proper cleanup of version control state when apps are closed

#### User Experience Enhancements
- **Visual Feedback**: Clear indication of save state, active snapshots, and available actions
- **Intuitive Controls**: Save button provides immediate feedback about unsaved changes
- **Safe Operations**: Confirmation dialogs prevent accidental data loss
- **Streamlined Workflow**: Consistent interface for all version management operations
- **Professional Dialogs**: Custom styled dialogs match application theme and design

#### Benefits
- **Intelligent Saving**: No more unnecessary saves - button only available when needed
- **Complete Control**: Full management of app version history with safe deletion
- **Clear State Awareness**: Always know which version is active and what changes are unsaved
- **Professional UX**: Non-blocking dialogs maintain responsive user experience
- **Data Safety**: Multiple layers of protection against accidental version loss

### Previous Updates (v2.2.0)

#### Enhanced 3D Graphics & Visualization Support
Major improvements for creating immersive and responsive 3D applications:

##### New Features
- **Three.js v0.177.0 Integration**: Full 3D graphics and WebGL support
- **Chart.js v4.4.1 Integration**: Comprehensive data visualization capabilities
- **Responsive 3D Rendering**: Automatic window sizing and resize handling
- **High-Quality Graphics**: Anti-aliasing and high-DPI display support
- **Dynamic Layout Support**: ResizeObserver integration for adaptive containers

##### Technical Improvements
- **Pre-loaded Libraries**: Three.js and Chart.js available immediately
- **Enhanced Guidelines**: LLM-optimized patterns for consistent 3D app generation
- **Window-Filling Animations**: 3D scenes automatically fill available space
- **Performance Optimization**: Efficient rendering with proper resource cleanup
- **Cross-Session Persistence**: 3D app state maintained between browser sessions

##### Benefits
- **Immersive Experiences**: Create sophisticated 3D applications and visualizations
- **Professional Quality**: High-DPI rendering with anti-aliasing for crisp graphics
- **Responsive Design**: 3D content adapts seamlessly to window resizing
- **Easy Development**: LLM generates properly configured 3D applications automatically

### Previous Updates (v2.1.0)

#### App & Data Persistence System
Major new features for enhanced user experience and data continuity:

##### New Features
- **Complete Persistence**: Apps and data automatically saved to IndexedDB
- **Session Recovery**: Full state restoration across browser sessions
- **Lazy Loading**: Performance optimization with on-demand app loading
- **Custom Popup System**: Professional dialogs replace browser defaults
- **Enhanced UX**: Consistent, accessible user interface improvements

##### Technical Improvements
- **IndexedDB Integration**: Robust local storage for apps and data
- **Smart Duplicate Prevention**: System apps don't create duplicate entries
- **Cross-Session Continuity**: Data maintains state between browser sessions
- **Performance Optimization**: Apps load only when needed from Start menu
- **Unified Dialog System**: Custom popups with theme integration and accessibility

##### Benefits
- **Seamless Experience**: Apps and data persist automatically without user intervention
- **Improved Performance**: Lazy loading reduces initial load time and memory usage
- **Better UX**: Professional, consistent dialogs throughout the system
- **Data Security**: All persistence handled locally with no external dependencies

### Previous Updates (v2.0.1)
- OpenAI API compatibility improvements
- Model selection display fixes
- Enhanced provider-specific parameter handling

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