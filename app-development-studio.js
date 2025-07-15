/**
 * App Development Studio - Main JavaScript Controller
 * Integrates with AI-OS system for app development with chat interface and suggestions
 */

// Global state management
window.AppDevelopmentStudio = {
    currentApp: null,
    savedAppId: null, // Track the ID of the currently saved app
    chatHistory: [],
    isProcessing: false,
    studioId: 'app-development-studio',
    initialized: false,
    uploadedImages: [],
    
    // Initialize the studio
    init() {
        if (this.initialized) {
            console.log('App Development Studio already initialized, skipping...');
            return;
        }
        
        console.log('App Development Studio initializing...');
        
        // Ensure DOM is ready before setting up
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.doInitialization();
            });
        } else {
            this.doInitialization();
        }
    },
    
    // Perform the actual initialization
    doInitialization() {
        console.log('Performing App Development Studio initialization...');
        this.setupEventListeners();
        this.setupImageUpload();
        this.initializeChatInterface();
        this.showWelcomeMessage();
        this.initialized = true;
        console.log('App Development Studio initialization complete!');
    },
    
    // Set up all event listeners
    setupEventListeners() {
        // Save button - saves generated app to ai-os
        const saveBtn = document.getElementById('save-app-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveGeneratedApp());
        }
        
        // Export button - downloads app as JSON
        const exportBtn = document.getElementById('export-app-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportGeneratedApp());
        }
        
        // Test button - opens app in new window
        const testBtn = document.getElementById('test-app-btn');
        if (testBtn) {
            testBtn.addEventListener('click', () => this.testGeneratedApp());
        }
        
        // Clear chat button
        const clearBtn = document.getElementById('clear-chat-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearChat());
        }
        
        // Send chat button
        const sendBtn = document.getElementById('send-chat-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        // Chat input enter key
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        // Custom answer submit
        const customSubmitBtn = document.getElementById('submit-custom-answer');
        if (customSubmitBtn) {
            customSubmitBtn.addEventListener('click', () => this.submitCustomAnswer());
        }
        
        // Custom answer input enter key
        const customInput = document.getElementById('custom-answer-input');
        if (customInput) {
            customInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.submitCustomAnswer();
                }
            });
        }
    },
    
    // Initialize chat interface
    initializeChatInterface() {
        this.chatHistory = [];
    },
    
    // Show welcome message
    showWelcomeMessage() {
        const welcomeMsg = {
            type: 'assistant',
            content: `Hello! I'm your AI assistant for app development. 

I can help you create custom applications for AI-OS with an interactive chat interface. Here's how it works:

1. **Describe your app** - Tell me what kind of app you want to build
2. **Answer questions** - I'll ask clarifying questions with multiple choice options
3. **Preview & refine** - See your app come to life in real-time
4. **Save to AI-OS** - Your finished app becomes a full AI-OS application

Just start by describing what you want to create!`
        };
        
        this.chatHistory.push(welcomeMsg);
        this.updateChatDisplay();
    },
    
    // Setup image upload functionality
    setupImageUpload() {
        console.log('=== SETTING UP IMAGE UPLOAD ===');
        this.uploadedImages = [];
        
        // Debug: List all elements with IDs
        const allElements = document.querySelectorAll('[id]');
        console.log('All elements with IDs:', Array.from(allElements).map(el => el.id));
        
        // Image upload button
        const imageUploadBtn = document.getElementById('image-upload-btn');
        console.log('Image upload button found:', imageUploadBtn);
        console.log('Image upload button element:', imageUploadBtn ? imageUploadBtn.outerHTML : 'NULL');
        
        if (imageUploadBtn) {
            console.log('Adding click listener to image upload button');
            imageUploadBtn.addEventListener('click', (e) => {
                console.log('=== IMAGE UPLOAD BUTTON CLICKED ===');
                e.preventDefault();
                this.triggerImageUpload();
            });
            
            // Test if button is clickable
            console.log('Button style display:', imageUploadBtn.style.display);
            console.log('Button disabled:', imageUploadBtn.disabled);
        } else {
            console.error('❌ Image upload button not found!');
        }
        
        // File input
        const fileInput = document.getElementById('image-file-input');
        console.log('File input found:', fileInput);
        console.log('File input element:', fileInput ? fileInput.outerHTML : 'NULL');
        
        if (fileInput) {
            console.log('Adding change listener to file input');
            fileInput.addEventListener('change', (e) => {
                console.log('=== FILE INPUT CHANGED ===');
                this.handleImageUpload(e);
            });
        } else {
            console.error('❌ File input not found!');
        }
        
        // Drag and drop support
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('dragover', (e) => {
                e.preventDefault();
                chatInput.style.borderColor = '#3b82f6';
            });
            
            chatInput.addEventListener('dragleave', (e) => {
                e.preventDefault();
                chatInput.style.borderColor = '#d1d5db';
            });
            
            chatInput.addEventListener('drop', (e) => {
                e.preventDefault();
                chatInput.style.borderColor = '#d1d5db';
                this.handleImageDrop(e);
            });
        }
        
        // Paste support - works anywhere in the studio
        console.log('Setting up paste event listener');
        document.addEventListener('paste', (e) => {
            console.log('=== PASTE EVENT DETECTED ===');
            console.log('Paste target:', e.target);
            console.log('Paste target tagName:', e.target.tagName);
            
            // Check if we're in the App Development Studio
            const studioContainer = document.querySelector('.app-development-container');
            console.log('Studio container found:', studioContainer);
            
            if (studioContainer && studioContainer.contains(e.target)) {
                console.log('Paste event is within studio container, processing...');
                this.handleImagePaste(e);
            } else {
                console.log('Paste event not in studio container, ignoring');
            }
        });
    },
    
    // Trigger image upload dialog
    triggerImageUpload() {
        console.log('triggerImageUpload called');
        const fileInput = document.getElementById('image-file-input');
        console.log('File input element:', fileInput);
        if (fileInput) {
            console.log('Clicking file input');
            fileInput.click();
        } else {
            console.error('File input not found when trying to trigger upload');
        }
    },
    
    // Handle image upload from file input
    async handleImageUpload(event) {
        const files = Array.from(event.target.files);
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                await this.processImageFile(file);
            }
        }
        // Clear the input
        event.target.value = '';
    },
    
    // Handle image drop
    async handleImageDrop(event) {
        const files = Array.from(event.dataTransfer.files);
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                await this.processImageFile(file);
            }
        }
    },
    
    // Handle image paste
    async handleImagePaste(event) {
        console.log('Paste event detected in App Development Studio');
        const items = Array.from(event.clipboardData.items);
        let imageFound = false;
        
        for (const item of items) {
            console.log('Clipboard item type:', item.type);
            if (item.type.startsWith('image/')) {
                event.preventDefault();
                imageFound = true;
                const file = item.getAsFile();
                if (file) {
                    console.log('Processing pasted image:', file.name, file.type, file.size);
                    await this.processImageFile(file);
                    
                    // Show feedback message
                    this.addMessageToChat('assistant', 'Image pasted successfully! You can now describe what kind of app you want me to create based on this image.');
                }
            }
        }
        
        if (!imageFound && items.length > 0) {
            console.log('No images found in clipboard, items:', items.map(item => item.type));
        }
    },
    
    // Process image file and convert to base64
    async processImageFile(file) {
        try {
            const base64 = await this.fileToBase64(file);
            const imageData = {
                base64: base64,
                type: file.type,
                name: 'studio-image-' + Date.now() + '.' + file.type.split('/')[1],
                size: file.size
            };
            
            this.uploadedImages.push(imageData);
            this.showImagePreview(imageData, this.uploadedImages.length - 1);
            this.showImageContainer();
            
            console.log('Image uploaded successfully:', imageData.name);
        } catch (error) {
            console.error('Error processing image:', error);
            this.addMessageToChat('assistant', 'Sorry, there was an error processing that image. Please try again.');
        }
    },
    
    // Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },
    
    // Show image preview
    showImagePreview(imageData, index) {
        const container = document.getElementById('image-preview-container');
        if (!container) return;
        
        const previewDiv = document.createElement('div');
        previewDiv.className = 'image-preview';
        previewDiv.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageData.base64;
        img.alt = imageData.name;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'image-remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove image';
        removeBtn.addEventListener('click', () => this.removeImage(index));
        
        previewDiv.appendChild(img);
        previewDiv.appendChild(removeBtn);
        container.appendChild(previewDiv);
    },
    
    // Show image container
    showImageContainer() {
        const container = document.getElementById('image-preview-container');
        if (container) {
            container.style.display = 'flex';
        }
    },
    
    // Hide image container
    hideImageContainer() {
        const container = document.getElementById('image-preview-container');
        if (container) {
            container.style.display = 'none';
        }
    },
    
    // Remove image
    removeImage(index) {
        this.uploadedImages.splice(index, 1);
        this.refreshImagePreviews();
        
        if (this.uploadedImages.length === 0) {
            this.hideImageContainer();
        }
    },
    
    // Refresh image previews
    refreshImagePreviews() {
        const container = document.getElementById('image-preview-container');
        if (container) {
            container.innerHTML = '';
            this.uploadedImages.forEach((imageData, index) => {
                this.showImagePreview(imageData, index);
            });
        }
    },
    
    // Clear uploaded images
    clearUploadedImages() {
        this.uploadedImages = [];
        this.hideImageContainer();
        const container = document.getElementById('image-preview-container');
        if (container) {
            container.innerHTML = '';
        }
    },
    
    // Send message to AI
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message && this.uploadedImages.length === 0) return;
        
        // Add user message to chat
        if (message) {
            this.addMessageToChat('user', message);
        }
        
        // Clear input
        chatInput.value = '';
        
        // Process with AI
        this.processWithAI(message || 'Please create an app based on the uploaded image(s)');
    },
    
    // Add message to chat history and update display
    addMessageToChat(type, content) {
        // Add debug output
        console.log('addMessageToChat called with type:', type, 'content:', content, 'content type:', typeof content);
        
        const message = {
            type: type,
            content: content,
            timestamp: new Date()
        };
        
        this.chatHistory.push(message);
        this.updateChatDisplay();
    },
    
    // Update chat display
    updateChatDisplay() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        chatMessages.innerHTML = '';
        
        this.chatHistory.forEach(message => {
            const messageEl = document.createElement('div');
            messageEl.className = `chat-message ${message.type}`;
            
            if (message.type === 'assistant') {
                messageEl.innerHTML = `
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">${this.formatMessage(message.content)}</div>
                `;
            } else {
                messageEl.innerHTML = `
                    <div class="message-content">${this.formatMessage(message.content)}</div>
                    <div class="message-avatar">👤</div>
                `;
            }
            
            chatMessages.appendChild(messageEl);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    
    // Format message content (convert line breaks to <br>)
    formatMessage(content) {
        // Add debug output and type checking
        console.log('formatMessage called with:', content, 'Type:', typeof content);
        
        // Ensure content is a string
        if (typeof content !== 'string') {
            console.warn('formatMessage received non-string content:', content);
            // Convert to string
            content = String(content);
        }
        
        return content.replace(/\n/g, '<br>');
    },
    
    // Process message with AI using dedicated App Development Studio functions
    async processWithAI(message) {
        this.isProcessing = true;
        this.showTypingIndicator();
        
        try {
            console.log('Processing with App Development Studio AI functions');
            
            // Determine if this is an app creation or modification request
            const isModification = this.isModificationRequest(message);
            console.log('Request type:', isModification ? 'MODIFICATION' : 'NEW APP CREATION');
            
            let response;
            if (this.uploadedImages && this.uploadedImages.length > 0) {
                // Process with images
                console.log('Processing with images:', this.uploadedImages.length);
                if (isModification) {
                    response = await this.callStudioEditLLMWithImages(message, this.uploadedImages);
                } else {
                    response = await this.callStudioLLMWithImages(message, this.uploadedImages);
                }
                
                // Clear images after processing
                this.clearUploadedImages();
            } else {
                // No images
                if (isModification) {
                    response = await this.callStudioEditLLM(message);
                } else {
                    response = await this.callStudioLLM(message);
                }
            }
            
            console.log('Received response from Studio LLM:', response, 'type:', typeof response);
            
            if (response) {
                this.handleStudioAIResponse(response);
            } else {
                throw new Error('No response from AI system');
            }
        } catch (error) {
            console.error('Studio AI processing error:', error);
            this.addMessageToChat('assistant', 'Sorry, I encountered an error while processing your request. Please try again.');
        } finally {
            this.isProcessing = false;
            this.hideTypingIndicator();
        }
    },

    // Determine if the user's message is requesting a modification to the current app
    isModificationRequest(message) {
        // Simple logic: If there's a current app, all follow-up requests are modifications
        // unless explicitly asking for a new app
        if (!this.currentApp) {
            console.log('No current app exists, treating as new app request');
            return false; // No current app to modify
        }
        
        const lowerMessage = message.toLowerCase();
        console.log('Current app exists, checking if user wants new app or modification');
        
        // Only check for explicit new app requests
        const newAppKeywords = [
            'create a new', 'make a new', 'build a new', 'new app',
            'different app', 'another app', 'start over', 'from scratch',
            'create an app', 'make an app', 'build an app', 'generate a new'
        ];
        
        const hasNewAppKeywords = newAppKeywords.some(keyword => {
            const found = lowerMessage.includes(keyword);
            if (found) console.log('Found explicit new app keyword:', keyword);
            return found;
        });
        
        // If explicitly asking for new app, return false (create new app)
        if (hasNewAppKeywords) {
            console.log('User explicitly requested new app, not a modification');
            return false;
        }
        
        // Otherwise, if there's a current app, treat as modification
        console.log('Current app exists and no new app request detected - treating as modification');
        return true;
    },

    // Dedicated LLM call function for App Development Studio (without images)
    async callStudioLLM(message) {
        console.log('Calling Studio LLM without images');
        
        if (typeof window.callLLMAPI !== 'function') {
            throw new Error('AI-OS LLM system is not available. Please check your API configuration.');
        }
        
        const prompt = this.createAppDevelopmentPrompt(message);
        console.log('Studio prompt created, length:', prompt.length);
        
        // Call the LLM API directly without using AI-OS app creation functions
        const response = await window.callLLMAPI(prompt, message, 'App Development Studio', this.studioId);
        
        return response;
    },

    // Dedicated LLM call function for App Development Studio (with images)
    async callStudioLLMWithImages(message, images) {
        console.log('Calling Studio LLM with images:', images.length);
        
        if (typeof window.callLLMAPI !== 'function') {
            throw new Error('AI-OS LLM system is not available. Please check your API configuration.');
        }
        
        const prompt = this.createAppDevelopmentPrompt(message);
        console.log('Studio prompt with images created, length:', prompt.length);
        
        // Call the LLM API with images but handle response in studio context
        const response = await window.callLLMAPI(prompt, message, 'App Development Studio', this.studioId, images);
        
        return response;
    },

    // Dedicated edit function for App Development Studio (without images)
    async callStudioEditLLM(message) {
        console.log('Calling Studio Edit LLM without images');
        
        if (typeof window.callLLMAPI !== 'function') {
            throw new Error('AI-OS LLM system is not available. Please check your API configuration.');
        }
        
        if (!this.currentApp) {
            throw new Error('No current app to edit');
        }
        
        const prompt = this.createAppEditPrompt(message);
        console.log('Studio edit prompt created, length:', prompt.length);
        
        // Call the LLM API for editing
        const response = await window.callLLMAPI(prompt, message, 'App Development Studio - Edit', this.studioId);
        
        return response;
    },

    // Dedicated edit function for App Development Studio (with images)
    async callStudioEditLLMWithImages(message, images) {
        console.log('Calling Studio Edit LLM with images:', images.length);
        
        if (typeof window.callLLMAPI !== 'function') {
            throw new Error('AI-OS LLM system is not available. Please check your API configuration.');
        }
        
        if (!this.currentApp) {
            throw new Error('No current app to edit');
        }
        
        const prompt = this.createAppEditPrompt(message);
        console.log('Studio edit prompt with images created, length:', prompt.length);
        
        // Call the LLM API with images for editing
        const response = await window.callLLMAPI(prompt, message, 'App Development Studio - Edit', this.studioId, images);
        
        return response;
    },

    // Create prompt for app development using the same system prompts as AI-OS
    createAppDevelopmentPrompt(userMessage) {
        console.log('Creating App Development Studio prompt');
        
        // Get current theme
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        
        // Get available data objects from registry
        let availableDataObjects = 'None currently registered';
        if (window.dataRegistry && typeof window.dataRegistry.getAllData === 'function') {
            const allData = window.dataRegistry.getAllData();
            if (Object.keys(allData).length > 0) {
                availableDataObjects = Object.keys(allData).map(key => {
                    const info = window.dataRegistry.getDataInfo ? window.dataRegistry.getDataInfo(key) : {};
                    const data = allData[key];
                    
                    // Analyze structure if not provided
                    let structure = info.structure;
                    if (!structure || structure === 'Unknown structure') {
                        structure = this.analyzeDataStructure(data);
                    }
                    
                    return `- ${key}: ${info.description || 'No description'} (${structure})`;
                }).join('\n');
            }
        }
        
        // Get available APIs from registry
        let availableAPIs = 'None currently registered';
        if (window.apiRegistry && typeof window.apiRegistry.getAPIPromptInfo === 'function') {
            availableAPIs = window.apiRegistry.getAPIPromptInfo();
        }
        
        // Use the exact same prompt structure as AI-OS system
        const ROLE_PROMPT = `
You are an expert web developer specializing in creating modular, theme-aware web applications.
Your task is to generate HTML, CSS, and JavaScript code for a new app based on user requests.

        `;

        const API_ENDPOINT_PROMPT = `

API REGISTRY SYSTEM:
- Access API info: window.apiRegistry.getAPI('apiName')
- List all APIs: window.apiRegistry.getAllAPIs()
- Apps make direct fetch() calls using the provided API keys and endpoints

AVAILABLE APIS:
${availableAPIs}

        `;

        const CONTEXT_PROMPT = `

AI-OS SYSTEM CONTEXT:

You are generating code for ai-os, a windowed operating system that runs web applications in isolated environments.

FUNDAMENTAL CONCEPTS:
1. ENVIRONMENT: ai-os is the host system that manages multiple apps in resizable windows
2. ISOLATION: Each app runs in its own namespace to prevent conflicts with other apps
3. LIFECYCLE: Apps are created, initialized, and managed by the ai-os system automatically
4. INTEGRATION: Apps can access shared data and system services through well-defined APIs

NAMESPACE SYSTEM (CRITICAL UNDERSTANDING):
- The ai-os system automatically creates a unique namespace for each app
- Variable 'appNamespace' is PROVIDED to your code (DO NOT declare it yourself)
- All HTML element IDs MUST use {appId}_ prefix (this gets replaced by the system)
- All CSS classes MUST use {appId}__ prefix (this gets replaced by the system)
- Your init function MUST be: window[appNamespace].init = function() { ... }
- NEVER write: const appNamespace = ... or let appNamespace = ... or var appNamespace = ...
- The appNamespace variable is already available in your code scope

        `;

        const APPCREATION_PROMPT = `
${CONTEXT_PROMPT}

${API_ENDPOINT_PROMPT}

TASK:
You are creating a functional app for a windowed operating system interface.

CRITICAL REQUIREMENTS:
1. Create a COMPLETE, FUNCTIONAL app that works in a window
2. The app will be placed inside a window with ID "content_{appId}"
3. Use vanilla HTML, CSS, and JavaScript - pre-loaded libraries (Three.js, Chart.js) are available if needed
4. Make the app responsive and fit well in a window (300-600px wide)
5. Include ALL necessary functionality for the requested app
6. Use modern, clean UI design

RESPONSE FORMAT - Return ONLY a JSON object with this structure:
{
  "title": "App Name",
  "icon": "📱",
  "html": "complete HTML content",
  "css": "complete CSS styles",
  "javascript": "complete JavaScript functionality INCLUDING MANDATORY INIT FUNCTION"
}

CRITICAL: Your JavaScript MUST include this init function pattern:
window[appNamespace].init = function() {
  // ALL initialization code goes here
};

DATA REGISTRY SYSTEM:
Apps can access and register shared data objects through the global data registry system:

AVAILABLE DATA OBJECTS:
${availableDataObjects}

        `;

        const NAMESPACEISOLATION_GUIDELINES = `

NAMESPACE ISOLATION REQUIREMENTS:
- ALL HTML element IDs MUST be prefixed with "{appId}_" (e.g., id="{appId}_button1")
- ALL CSS classes MUST be prefixed with "{appId}__" (e.g., class="{appId}__container")
- ALL JavaScript variables and functions MUST be scoped to avoid conflicts
- ALL custom events MUST be prefixed with "{appId}:" (e.g., "{appId}:dataChanged")
- Use querySelector with app-specific selectors: document.querySelector('#{appId}_elementId')
        `;

        const CSS_GUIDELINES = `

ESSENTIAL CSS GUIDELINES FOR THEME SUPPORT AND ACCESSIBILITY:

CRITICAL THEME REQUIREMENTS:
- Apps automatically inherit .app-light-theme or .app-dark-theme classes
- ALWAYS design for BOTH light and dark modes
- Current theme: ${currentTheme}

MANDATORY CONTRAST RULES:
1. NEVER light text on light backgrounds or dark text on dark backgrounds
2. Display text must be clearly visible against display background
3. Use CSS theme classes: .app-light-theme and .app-dark-theme for all styling

        `;

        const JAVASCRIPT_GUIDELINES = `

ESSENTIAL JAVASCRIPT CODE GENERATION GUIDELINES:
- Write your JavaScript to handle all user interactions using addEventListener pattern
- CRITICAL: NEVER create a namespace variable yourself - it is already available as variable appNamespace
- CRITICAL: never use window.prompt() or window.alert() in the JavaScript code
- CRITICAL: NEVER add global key event listeners
- CRITICAL: Use the provided app.onKey() method instead for key handling

CRITICAL REQUIREMENT - INIT FUNCTION:
- YOU MUST CREATE AN INIT FUNCTION - THIS IS MANDATORY AND NON-NEGOTIABLE
- Use this EXACT pattern: window[appNamespace].init = function() { ... };

        `;

        const LIBRARIES_GUIDELINES = `

AVAILABLE LIBRARIES (Pre-loaded and Ready):
- THREE.js v0.177.0 (namespace: THREE) - For 3D graphics, WebGL, animations
- Chart.js v4.4.1 (namespace: Chart) - For data visualization, charts, graphs

        `;

        let prompt = ROLE_PROMPT +
                     CONTEXT_PROMPT +
                     APPCREATION_PROMPT.replace(/{appId}/g, this.studioId).replace(/{availableDataObjects}/g, availableDataObjects).replace(/{availableAPIs}/g, availableAPIs) +
                     NAMESPACEISOLATION_GUIDELINES.replace(/{appId}/g, this.studioId) +
                     CSS_GUIDELINES.replace(/{currentTheme}/g, currentTheme) +
                     JAVASCRIPT_GUIDELINES.replace(/{appId}/g, this.studioId) +
                     LIBRARIES_GUIDELINES.replace(/{appId}/g, this.studioId) +
                     "Now create a functional app for: " + userMessage;

        return prompt;
    },

    // Analyze data structure helper function
    analyzeDataStructure(data) {
        if (Array.isArray(data)) {
            if (data.length === 0) return 'Empty array';
            const firstItem = data[0];
            if (typeof firstItem === 'object') {
                const keys = Object.keys(firstItem).slice(0, 3);
                return `Array of objects with keys: ${keys.join(', ')}${keys.length < Object.keys(firstItem).length ? '...' : ''}`;
            }
            return `Array of ${typeof firstItem}`;
        } else if (typeof data === 'object' && data !== null) {
            const keys = Object.keys(data).slice(0, 3);
            return `Object with keys: ${keys.join(', ')}${keys.length < Object.keys(data).length ? '...' : ''}`;
        }
        return typeof data;
    },

    // Create prompt for app editing (includes current app code)
    createAppEditPrompt(userMessage) {
        console.log('Creating App Development Studio EDIT prompt');
        
        if (!this.currentApp) {
            throw new Error('No current app to edit');
        }
        
        // Get current theme
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        
        // Get available data objects from registry
        let availableDataObjects = 'None currently registered';
        if (window.dataRegistry && typeof window.dataRegistry.getAllData === 'function') {
            const allData = window.dataRegistry.getAllData();
            if (Object.keys(allData).length > 0) {
                availableDataObjects = Object.keys(allData).map(key => {
                    const info = window.dataRegistry.getDataInfo ? window.dataRegistry.getDataInfo(key) : {};
                    const data = allData[key];
                    
                    // Analyze structure if not provided
                    let structure = info.structure;
                    if (!structure || structure === 'Unknown structure') {
                        structure = this.analyzeDataStructure(data);
                    }
                    
                    return `- ${key}: ${info.description || 'No description'} (${structure})`;
                }).join('\n');
            }
        }
        
        // Get available APIs from registry
        let availableAPIs = 'None currently registered';
        if (window.apiRegistry && typeof window.apiRegistry.getAPIPromptInfo === 'function') {
            availableAPIs = window.apiRegistry.getAPIPromptInfo();
        }
        
        // Create edit-specific prompt that includes current app code
        const EDIT_ROLE_PROMPT = `
You are an expert web developer specializing in modifying and improving existing web applications.
Your task is to make SPECIFIC MODIFICATIONS to an existing app based on user requests.

CRITICAL: You are EDITING an existing app, NOT creating a new one from scratch.
Only modify the parts that need to be changed based on the user's request.
        `;

        const EDIT_CONTEXT_PROMPT = `

EDITING CONTEXT:

You are modifying an existing app in ai-os, a windowed operating system that runs web applications.

CURRENT APP INFORMATION:
- Title: ${this.currentApp.title}
- Description: ${this.currentApp.description || 'No description'}

CURRENT APP CODE:
=== HTML ===
${this.currentApp.html}

=== CSS ===
${this.currentApp.css}

=== JAVASCRIPT ===
${this.currentApp.javascript}

EDITING REQUIREMENTS:
1. PRESERVE existing functionality unless specifically asked to change it
2. Make ONLY the modifications requested by the user
3. Maintain the same app structure and namespace system
4. Keep all existing features that aren't being modified
5. Ensure modifications integrate seamlessly with existing code

        `;

        const EDIT_TASK_PROMPT = `

EDITING TASK:
The user wants to modify the current app. Make ONLY the specific changes requested.

USER'S MODIFICATION REQUEST:
${userMessage}

RESPONSE FORMAT - Return ONLY a JSON object with this structure:
{
  "title": "App Name (keep same unless user requests title change)",
  "icon": "📱 (keep same unless user requests icon change)",
  "html": "COMPLETE HTML content with modifications applied",
  "css": "COMPLETE CSS styles with modifications applied",
  "javascript": "COMPLETE JavaScript functionality with modifications applied INCLUDING MANDATORY INIT FUNCTION",
  "description": "Brief, clear description of the specific modifications made (e.g., 'Fixed Pac-Man starting position to avoid walls', 'Added sound effects when collecting dots', 'Improved collision detection system')"
}

CRITICAL EDITING GUIDELINES:
1. ONLY modify what the user specifically requested
2. PRESERVE all existing functionality not mentioned in the request
3. Maintain the same namespace system: window[appNamespace].init = function() { ... }
4. Keep the same app structure and layout unless specifically asked to change it
5. If fixing bugs or issues, make minimal changes to resolve the problem
6. Test your modifications mentally to ensure they work with the existing code
7. PROVIDE a clear, concise description of what modifications were made in the "description" field

DESCRIPTION REQUIREMENTS:
- Be specific about what was changed (e.g., "Fixed player starting position", "Added collision detection")
- Mention the key improvements or fixes implemented
- Keep it brief but informative (1-2 sentences)
- Focus on user-visible changes and functional improvements
- Examples: "Fixed Pac-Man starting position to prevent spawning inside walls", "Added sound effects for dot collection and ghost encounters", "Improved game controls responsiveness"

AVAILABLE DATA OBJECTS:
${availableDataObjects}

AVAILABLE APIS:
${availableAPIs}

        `;

        const JAVASCRIPT_EDITING_GUIDELINES = `

CRITICAL JAVASCRIPT EDITING REQUIREMENTS:

MANDATORY INIT FUNCTION ENFORCEMENT:
- EVERY app MUST have a valid init function - THIS IS NON-NEGOTIABLE
- If the current app is missing an init function, YOU MUST ADD ONE
- If the current app has a broken init function, YOU MUST FIX IT
- If the current app has a valid init function, PRESERVE and enhance it as needed

REQUIRED INIT FUNCTION PATTERN:
window[appNamespace].init = function() {
  // ALL initialization code goes here
  // ALL event listeners MUST be inside this function
  // ALL setup logic MUST be inside this function
};

CRITICAL RULES:
- Use window[appNamespace].init, NOT window.app_{appId}.init
- DO NOT declare appNamespace yourself - it is already available
- NEVER write: const appNamespace = ... or let appNamespace = ... or var appNamespace = ...
- ALL event listeners and initialization code MUST go inside the init function
- Do NOT put any event listeners or initialization code outside the init function
- The init function will be automatically called after the app is loaded into the DOM
- FAILURE TO INCLUDE A VALID INIT FUNCTION WILL RESULT IN BROKEN FUNCTIONALITY

INIT FUNCTION VALIDATION:
- Check if the current JavaScript has a valid init function
- If missing: Create one and move all initialization logic inside it
- If present but invalid: Fix the signature and ensure proper structure
- If present and valid: Preserve it and add modifications inside it appropriately

        `;

        const EDIT_GUIDELINES = `

MODIFICATION GUIDELINES:
- Current theme: ${currentTheme}
- Maintain theme compatibility (.app-light-theme and .app-dark-theme)
- Preserve namespace isolation with {appId}_ prefixes
- Keep existing event listeners unless modifying them
- Maintain responsive design
- Preserve accessibility features

        `;

        let prompt = EDIT_ROLE_PROMPT +
                     EDIT_CONTEXT_PROMPT +
                     EDIT_TASK_PROMPT +
                     JAVASCRIPT_EDITING_GUIDELINES +
                     EDIT_GUIDELINES;

        return prompt;
    },
    
    // Handle AI response from AI-OS LLM system (legacy - kept for compatibility)
    handleAIResponse(response) {
        console.log('Legacy handleAIResponse called, redirecting to studio handler');
        this.handleStudioAIResponse(response);
    },

    // Handle AI response specifically for App Development Studio
    handleStudioAIResponse(response) {
        console.log('handleStudioAIResponse called with response:', response, 'response type:', typeof response);
        
        try {
            // Handle different response formats safely within studio context
            let appData = null;
            
            // Case 1: Direct app object from AI-OS system
            if (response && typeof response === 'object' && response.html) {
                console.log('Received direct app object from AI system');
                appData = {
                    title: response.title || 'Generated App',
                    description: response.description, // Keep the modification description if provided
                    html: response.html,
                    css: response.css || '',
                    javascript: response.javascript || '',
                    icon: response.icon || '📱'
                };
            }
            // Case 2: String response that might be JSON
            else if (typeof response === 'string') {
                console.log('Received string response, attempting to parse');
                try {
                    const parsed = JSON.parse(response);
                    console.log('Successfully parsed JSON response:', parsed);
                    
                    // Check if it's an app object
                    if (parsed.html || (parsed.title && (parsed.css || parsed.javascript))) {
                        appData = {
                            title: parsed.title || 'Generated App',
                            description: parsed.description, // Keep the modification description if provided
                            html: parsed.html || '',
                            css: parsed.css || '',
                            javascript: parsed.javascript || '',
                            icon: parsed.icon || '📱'
                        };
                    }
                    // Check for suggestions format
                    else if (parsed.type === 'suggestions') {
                        this.showSuggestions(parsed.question, parsed.suggestions);
                        return;
                    }
                    // Other structured responses
                    else {
                        this.addMessageToChat('assistant', response);
                        return;
                    }
                } catch (parseError) {
                    console.log('Failed to parse as JSON, treating as regular message');
                    this.addMessageToChat('assistant', response);
                    return;
                }
            }
            // Case 3: Other object types
            else if (response && typeof response === 'object') {
                console.log('Received object response, converting to string');
                this.addMessageToChat('assistant', JSON.stringify(response, null, 2));
                return;
            }
            // Case 4: Other types
            else {
                console.log('Received other response type, converting to string');
                this.addMessageToChat('assistant', String(response));
                return;
            }
            
            // If we have app data, generate the app safely within studio context
            if (appData && appData.html) {
                console.log('Generating app within studio context:', appData.title);
                // Determine if this was a modification request
                const wasModification = this.currentApp !== null;
                this.generateStudioApp(appData, wasModification);
            } else {
                console.warn('No valid app data found in response');
                this.addMessageToChat('assistant', 'I received a response but couldn\'t extract valid app data. Please try rephrasing your request.');
            }
            
        } catch (error) {
            console.error('Error handling studio AI response:', error);
            this.addMessageToChat('assistant', 'Sorry, I encountered an error processing the AI response. Please try again.');
        }
    },

    // Generate app safely within studio context (doesn't affect AI-OS system)
    generateStudioApp(appData, isModification = false) {
        console.log('Generating studio app:', appData.title, 'isModification:', isModification);
        
        // If this is a new app (not a modification), reset the saved app ID
        if (!isModification) {
            this.savedAppId = null;
            console.log('Reset saved app ID for new app creation');
        }
        
        // Store the app data in studio context
        this.currentApp = appData;
        
        // Show preview safely within studio
        this.showAppPreview(appData);
        
        // Add appropriate success message based on whether this is creation or modification
        let message;
        if (isModification) {
            // Include description of modifications if available
            let modificationDetails = '';
            if (appData.description) {
                modificationDetails = `\n\n**Modifications made:** ${appData.description}`;
            }
            message = `Perfect! I've updated your ${appData.title} app based on your request.${modificationDetails}\n\nYou can see the changes in the preview on the left. Would you like me to make any other modifications?`;
        } else {
            message = `Great! I've created a ${appData.title} app for you. You can see the preview on the left. Would you like me to make any modifications?`;
        }
        
        this.addMessageToChat('assistant', message);
        
        console.log('Studio app generated successfully');
    },
    
    // Show suggestions panel
    showSuggestions(question, suggestions) {
        console.log('showSuggestions called with question:', question, 'suggestions:', suggestions);
        
        const panel = document.getElementById('suggestions-panel');
        const questionEl = document.getElementById('suggestions-question');
        const buttonsEl = document.getElementById('suggestions-buttons');
        
        if (!panel || !questionEl || !buttonsEl) return;
        
        questionEl.textContent = question;
        buttonsEl.innerHTML = '';
        
        // Create max 4 suggestion buttons
        suggestions.slice(0, 4).forEach((suggestion, index) => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.innerHTML = `
                <strong>${suggestion.text}</strong>
                ${suggestion.description ? `<br><small style="opacity: 0.8;">${suggestion.description}</small>` : ''}
            `;
            button.addEventListener('click', () => this.selectSuggestion(suggestion.text));
            buttonsEl.appendChild(button);
        });
        
        panel.style.display = 'block';
        
        // Ensure question is a string before adding to chat
        const questionStr = typeof question === 'string' ? question : String(question);
        this.addMessageToChat('assistant', questionStr);
    },
    
    // Select a suggestion
    selectSuggestion(suggestionText) {
        this.hideSuggestions();
        this.addMessageToChat('user', suggestionText);
        this.processWithAI(suggestionText);
    },
    
    // Submit custom answer
    submitCustomAnswer() {
        const customInput = document.getElementById('custom-answer-input');
        if (!customInput) return;
        
        const answer = customInput.value.trim();
        if (!answer) return;
        
        customInput.value = '';
        this.hideSuggestions();
        this.addMessageToChat('user', answer);
        this.processWithAI(answer);
    },
    
    // Hide suggestions panel
    hideSuggestions() {
        const panel = document.getElementById('suggestions-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    },
    
    // Generate app from AI response (legacy - redirects to studio version)
    generateApp(appData) {
        console.log('Legacy generateApp called, redirecting to studio version');
        // Determine if this was a modification request
        const wasModification = this.currentApp !== null;
        this.generateStudioApp(appData, wasModification);
    },
    
    // Show app preview
    showAppPreview(appData) {
        const previewArea = document.getElementById('app-preview-area');
        if (!previewArea) return;
        
        // Create a unique preview container ID
        const previewContainerId = `preview-content-${Date.now()}`;
        
        previewArea.innerHTML = `
            <div class="app-preview">
                <div class="app-preview-header">
                    <span>${appData.icon || '📱'} ${appData.title}</span>
                    <span style="font-size: 12px; opacity: 0.7;">${appData.description || 'Generated app'}</span>
                </div>
                <div class="app-preview-content" id="${previewContainerId}" style="
                    position: relative;
                    overflow: auto;
                    width: 100%;
                    height: 500px;
                    border: 1px solid #e1e5e9;
                    background: white;
                    box-sizing: border-box;
                ">
                    ${appData.html || '<p>No content available</p>'}
                </div>
            </div>
        `;
        
        // Apply CSS styles with proper scoping and containment
        if (appData.css) {
            let styleEl = document.getElementById('preview-styles');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'preview-styles';
                document.head.appendChild(styleEl);
            }
            
            // Scope CSS to the preview container and fix positioning issues
            let scopedCSS = appData.css;
            
            // Replace app content selectors
            scopedCSS = scopedCSS.replace(/#content_[a-zA-Z0-9_-]+/g, `#${previewContainerId}`);
            
            // Scope all CSS rules to the preview container
            scopedCSS = scopedCSS.replace(/([^{}]+){/g, (match, selector) => {
                // Don't scope @rules, keyframes, etc.
                if (selector.trim().startsWith('@')) {
                    return match;
                }
                
                // Add container scope to each selector
                const selectors = selector.split(',').map(s => {
                    const trimmed = s.trim();
                    if (trimmed.startsWith('#' + previewContainerId)) {
                        return trimmed; // Already scoped
                    }
                    return `#${previewContainerId} ${trimmed}`;
                }).join(', ');
                
                return selectors + ' {';
            });
            
            // Add containment rules to prevent overflow while allowing scrolling
            scopedCSS = `
                #${previewContainerId} {
                    position: relative !important;
                    overflow: auto !important;
                    width: 100% !important;
                    height: 500px !important;
                    contain: layout style paint !important;
                    box-sizing: border-box !important;
                }
                
                #${previewContainerId} > * {
                    position: relative !important;
                    max-width: 100% !important;
                }
                
                #${previewContainerId} canvas {
                    position: relative !important;
                    display: block !important;
                }
                
                /* Prevent any fixed/absolute positioning from escaping */
                #${previewContainerId} *[style*="position: fixed"],
                #${previewContainerId} *[style*="position: absolute"] {
                    position: relative !important;
                }
                
                ${scopedCSS}
            `;
            
            styleEl.textContent = scopedCSS;
        }
        
        // Execute JavaScript with proper context
        if (appData.javascript) {
            try {
                // Create the appNamespace variable that AI-OS generated code expects
                const appNamespace = `preview_app_${Date.now()}`;
                
                // Create a safe execution context with better error handling
                const executeJS = new Function('appNamespace', 'previewContainerId', `
                    try {
                        // Create window namespace for the preview app
                        window[appNamespace] = window[appNamespace] || {};
                        
                        // Create app helper object for preview
                        const app = {
                            id: 'preview-app',
                            getElementById: (id) => document.getElementById(previewContainerId + '_' + id) || document.getElementById(id),
                            querySelector: (selector) => document.querySelector('#' + previewContainerId + ' ' + selector),
                            querySelectorAll: (selector) => document.querySelectorAll('#' + previewContainerId + ' ' + selector),
                            onKey: () => {}, // Disabled in preview
                            data: {}
                        };
                        
                        // Execute the app JavaScript with error wrapping
                        try {
                            ${appData.javascript}
                        } catch (jsError) {
                            console.warn('App JavaScript execution error:', jsError);
                            // Don't throw, just log and continue
                        }
                        
                        // Initialize the app if init function exists
                        if (window[appNamespace] && typeof window[appNamespace].init === 'function') {
                            try {
                                window[appNamespace].init();
                            } catch (initError) {
                                console.log('Preview app init error (this is normal):', initError.message);
                            }
                        }
                    } catch (outerError) {
                        console.error('Preview execution error:', outerError);
                    }
                `);
                
                executeJS(appNamespace, previewContainerId);
                
            } catch (error) {
                console.error('Error executing app JavaScript:', error);
                // Show error in preview
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'color: red; padding: 10px; background: #ffe6e6; border: 1px solid #ff9999; border-radius: 4px; margin: 10px;';
                errorDiv.textContent = `JavaScript Error: ${error.message}`;
                document.getElementById(previewContainerId).appendChild(errorDiv);
            }
        }
    },
    
    // Save generated app to AI-OS
    saveGeneratedApp() {
        if (!this.currentApp) {
            alert('No app to save. Please generate an app first.');
            return;
        }
        
        console.log('=== SAVING APP TO AI-OS ===');
        console.log('Current app:', this.currentApp);
        
        try {
            // Debug: Check what AI-OS functions are available
            console.log('Checking AI-OS functions:');
            console.log('- generateAppId:', typeof generateAppId);
            console.log('- apps:', typeof apps, apps ? apps.length : 'undefined');
            console.log('- createWindow:', typeof createWindow);
            console.log('- createTaskbarIcon:', typeof createTaskbarIcon);
            console.log('- createAIGeneratedAppContent:', typeof createAIGeneratedAppContent);
            console.log('- updateSharedAppsRegistry:', typeof updateSharedAppsRegistry);
            console.log('- updateAppsSubmenuContent:', typeof updateAppsSubmenuContent);
            console.log('- updateAppCount:', typeof updateAppCount);
            
            // Check if AI-OS app creation functions are available (use global functions, not window.*)
            if (typeof generateAppId === 'function' && typeof apps !== 'undefined') {
                console.log('AI-OS functions available, proceeding with save...');
                
                // Check if this app was already saved (update existing) or create new
                let appId;
                let isUpdate = false;
                
                if (this.savedAppId) {
                    // App was already saved, update the existing one
                    appId = this.savedAppId;
                    isUpdate = true;
                    console.log('Updating existing app with ID:', appId);
                } else {
                    // First time saving, generate new ID
                    appId = generateAppId();
                    this.savedAppId = appId; // Remember this ID for future updates
                    console.log('Creating new app with ID:', appId);
                }
                
                const title = this.currentApp.title || 'Generated App';
                const icon = this.currentApp.icon || '📱';
                
                console.log('App title:', title);
                console.log('App icon:', icon);
                
                // Create app content using AI-OS function for proper formatting
                const content = typeof createAIGeneratedAppContent === 'function' ?
                    createAIGeneratedAppContent(this.currentApp.html, this.currentApp.css, this.currentApp.javascript, appId) :
                    this.currentApp.html;
                
                console.log('App content prepared for launching, length:', content.length);
                
                // Create app object with the app content stored for later launching
                const app = {
                    id: appId,
                    type: 'ai-generated',
                    title: title,
                    icon: icon,
                    isMinimized: false,
                    isMaximized: false,
                    system: false,
                    customRequest: `App Development Studio: ${title}`,
                    promptHistory: [],
                    namespace: `app_${appId.replace(/-/g, '_')}`, // Store namespace for cleanup
                    // Store the app content for later launching
                    html: this.currentApp.html,
                    css: this.currentApp.css,
                    javascript: this.currentApp.javascript,
                    content: content // Store the formatted content for window creation
                };
                
                console.log('Created app object:', app);
                
                // Handle app registration: update existing or add new
                if (isUpdate) {
                    // Find and update the existing app
                    console.log('Updating existing app in apps array...');
                    const existingAppIndex = apps.findIndex(existingApp => existingApp.id === appId);
                    if (existingAppIndex !== -1) {
                        // Update the existing app with new content
                        apps[existingAppIndex] = { ...apps[existingAppIndex], ...app };
                        console.log('Updated existing app at index:', existingAppIndex);
                    } else {
                        // App not found in array, add it (fallback)
                        console.log('Existing app not found, adding as new...');
                        apps.push(app);
                    }
                } else {
                    // Add new app to apps array
                    console.log('Adding new app to apps array...');
                    apps.push(app);
                }
                console.log('Apps array length:', apps.length);
                
                // 2. Update shared registry
                if (typeof updateSharedAppsRegistry === 'function') {
                    console.log('Updating shared apps registry...');
                    updateSharedAppsRegistry();
                } else {
                    console.warn('updateSharedAppsRegistry not available');
                }
                
                // Note: We don't create taskbar icons or windows here because we only want
                // the app to be saved and registered in the "All Apps" menu.
                // The app can be launched later from the "All Apps" menu.
                console.log('App registered in system - available in All Apps menu');
                
                // 5. Update app count
                if (typeof updateAppCount === 'function') {
                    console.log('Updating app count...');
                    updateAppCount();
                } else {
                    console.warn('updateAppCount function not available');
                }
                
                // 6. Update apps submenu to include the new user-generated app
                if (typeof updateAppsSubmenuContent === 'function') {
                    console.log('Updating apps submenu content...');
                    updateAppsSubmenuContent();
                } else {
                    console.warn('updateAppsSubmenuContent function not available');
                }
                
                // Save app to persistence (same as regular AI-generated apps)
                setTimeout(async () => {
                    try {
                        const appData = {
                            title: title,
                            icon: icon,
                            html: this.currentApp.html,
                            css: this.currentApp.css || '',
                            javascript: this.currentApp.javascript || '',
                            customRequest: `App Development Studio: ${title}`,
                            timestamp: new Date().toISOString()
                        };
                        
                        if (typeof saveAppToPersistence === 'function') {
                            console.log('Saving app to persistence...');
                            const saveResult = await saveAppToPersistence(appId, appData, {
                                description: `App Development Studio app: ${appData.title}`,
                                savePrompt: false
                            });
                            
                            if (saveResult.success) {
                                console.log(`✅ App ${appId} saved to persistence`);
                            } else {
                                console.warn(`⚠️ Failed to save app ${appId} to persistence:`, saveResult.error);
                            }
                        } else {
                            console.warn('saveAppToPersistence function not available');
                        }
                    } catch (error) {
                        console.error(`❌ Error saving app ${appId} to persistence:`, error);
                    }
                }, 500);
                
                console.log('App saved successfully!');
                
                // Different messages for new save vs update
                if (isUpdate) {
                    alert(`App "${app.title}" updated successfully in AI-OS!`);
                    this.addMessageToChat('assistant', `Perfect! Your ${app.title} app has been updated in AI-OS with your latest changes. The updated version is available in the "All Apps" menu.`);
                } else {
                    alert(`App "${app.title}" saved successfully to AI-OS!`);
                    this.addMessageToChat('assistant', `Perfect! Your ${app.title} app has been saved to AI-OS and is now available in the "All Apps" menu. You can launch it from there whenever you need it.`);
                }
            } else {
                console.error('AI-OS functions not available:');
                console.error('- generateAppId:', typeof generateAppId);
                console.error('- apps array:', typeof apps);
                throw new Error('AI-OS app creation functions not available. Make sure you are running this in AI-OS.');
            }
        } catch (error) {
            console.error('=== ERROR SAVING APP ===');
            console.error('Error details:', error);
            console.error('Error stack:', error.stack);
            alert(`Error saving app to AI-OS: ${error.message}. Please check the console for details.`);
        }
    },
    
    // Export generated app as JSON
    exportGeneratedApp() {
        if (!this.currentApp) {
            alert('No app to export. Please generate an app first.');
            return;
        }
        
        const exportData = {
            version: '1.0',
            exported: new Date().toISOString(),
            app: this.currentApp
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentApp.title.replace(/\s+/g, '-').toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.addMessageToChat('assistant', `Your ${this.currentApp.title} app has been exported successfully!`);
    },
    
    // Test generated app in new window
    testGeneratedApp() {
        if (!this.currentApp) {
            alert('No app to test. Please generate an app first.');
            return;
        }
        
        const testWindow = window.open('', '_blank', 'width=600,height=400');
        testWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${this.currentApp.title} - Test</title>
                <style>${this.currentApp.css || ''}</style>
            </head>
            <body>
                ${this.currentApp.html || ''}
                <script>${this.currentApp.javascript || ''}</script>
            </body>
            </html>
        `);
        testWindow.document.close();
        
        this.addMessageToChat('assistant', `${this.currentApp.title} opened in a new window for testing!`);
    },
    
    // Clear chat history
    clearChat() {
        this.chatHistory = [];
        this.hideSuggestions();
        this.showWelcomeMessage();
    },
    
    // Show typing indicator
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'chat-message assistant';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span>AI is thinking</span>
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },
    
    // Hide typing indicator
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing App Development Studio...');
    if (window.AppDevelopmentStudio) {
        window.AppDevelopmentStudio.init();
    }
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.AppDevelopmentStudio) {
            window.AppDevelopmentStudio.init();
        }
    });
} else {
    // DOM already loaded
    console.log('DOM already loaded, initializing immediately...');
    if (window.AppDevelopmentStudio) {
        window.AppDevelopmentStudio.init();
    }
}

// Additional initialization for dynamically loaded content
// This handles the case when the script is loaded after the window is created
setTimeout(() => {
    console.log('Delayed initialization attempt...');
    if (window.AppDevelopmentStudio && !window.AppDevelopmentStudio.initialized) {
        console.log('Studio not yet initialized, attempting now...');
        window.AppDevelopmentStudio.init();
    }
}, 200);

// Also try initialization when the script loads (immediate)
console.log('Script loaded, attempting immediate initialization...');
if (window.AppDevelopmentStudio) {
    window.AppDevelopmentStudio.init();
}
                