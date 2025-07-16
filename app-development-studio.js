/**
 * App Development Studio - Main JavaScript Controller
 * Integrates with AI-OS system for app development with chat interface and suggestions
 */

// Key event management for App Development Studio
class StudioKeyManager {
    constructor() {
        this.appPreviewHasFocus = false;
        this.appPreviewElement = null;
        this.boundKeyHandler = this.handleKeyEvent.bind(this);
        this.init();
    }

    init() {
        // Add global key event listener
        document.addEventListener('keydown', this.boundKeyHandler, true);
        document.addEventListener('keyup', this.boundKeyHandler, true);
        document.addEventListener('keypress', this.boundKeyHandler, true);
    }

    setAppPreviewElement(element) {
        this.appPreviewElement = element;
        
        // Add click listener to app preview to give it focus
        if (element) {
            element.addEventListener('click', () => {
                this.focusAppPreview();
            });
            
            // Add tabindex to make it focusable
            element.setAttribute('tabindex', '0');
        }
    }

    focusAppPreview() {
        console.log('App preview gained focus');
        this.appPreviewHasFocus = true;
        
        // Visual indication that app has focus
        if (this.appPreviewElement) {
            this.appPreviewElement.style.outline = '2px solid #007bff';
            this.appPreviewElement.style.outlineOffset = '2px';
        }
    }

    blurAppPreview() {
        console.log('App preview lost focus');
        this.appPreviewHasFocus = false;
        
        // Remove visual indication
        if (this.appPreviewElement) {
            this.appPreviewElement.style.outline = '';
            this.appPreviewElement.style.outlineOffset = '';
        }
    }

    handleKeyEvent(event) {
        // If app preview has focus, let the app handle the key event
        if (this.appPreviewHasFocus) {
            // Don't interfere with app key handling
            return;
        }

        // Studio has focus - handle studio-specific keys
        // Allow normal typing in input fields
        const activeElement = document.activeElement;
        if (activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.contentEditable === 'true'
        )) {
            // Let input fields handle their own key events
            return;
        }

        // Handle studio-specific shortcuts
        if (event.type === 'keydown') {
            switch(event.key) {
                case 'Escape':
                    // Escape always returns focus to studio
                    this.blurAppPreview();
                    event.preventDefault();
                    break;
                case 'Tab':
                    // Tab navigation should blur app preview
                    this.blurAppPreview();
                    break;
            }
        }
    }

    destroy() {
        document.removeEventListener('keydown', this.boundKeyHandler, true);
        document.removeEventListener('keyup', this.boundKeyHandler, true);
        document.removeEventListener('keypress', this.boundKeyHandler, true);
    }
}

// Resize handler for the divider between preview and chat
class ResizeHandler {
    constructor() {
        this.isDragging = false;
        this.startX = 0;
        this.startPreviewWidth = 0;
        this.startChatWidth = 0;
        this.divider = null;
        this.previewSection = null;
        this.chatSidebar = null;
        this.init();
    }

    init() {
        this.divider = document.getElementById('app-development-studio_resize-divider');
        this.previewSection = document.querySelector('.appdev__preview-section');
        this.chatSidebar = document.querySelector('.appdev__chat-sidebar');

        if (!this.divider || !this.previewSection || !this.chatSidebar) {
            console.warn('Resize elements not found');
            return;
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.divider.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));
        
        // Prevent text selection during drag
        this.divider.addEventListener('selectstart', (e) => e.preventDefault());
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        
        // Get current widths
        const previewRect = this.previewSection.getBoundingClientRect();
        const chatRect = this.chatSidebar.getBoundingClientRect();
        
        this.startPreviewWidth = previewRect.width;
        this.startChatWidth = chatRect.width;
        
        // Add dragging class for visual feedback
        this.divider.classList.add('appdev__dragging');
        
        // Prevent text selection
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        
        e.preventDefault();
    }

    drag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.startX;
        const containerWidth = this.previewSection.parentElement.getBoundingClientRect().width;
        
        // Calculate new widths
        let newPreviewWidth = this.startPreviewWidth + deltaX;
        let newChatWidth = this.startChatWidth - deltaX;
        
        // Apply constraints
        const minPreviewWidth = 300;
        const minChatWidth = 250;
        const maxChatWidth = containerWidth * 0.6; // 60% max
        
        // Ensure minimum widths
        if (newPreviewWidth < minPreviewWidth) {
            newPreviewWidth = minPreviewWidth;
            newChatWidth = containerWidth - newPreviewWidth - 6; // 6px for divider
        }
        
        if (newChatWidth < minChatWidth) {
            newChatWidth = minChatWidth;
            newPreviewWidth = containerWidth - newChatWidth - 6;
        }
        
        if (newChatWidth > maxChatWidth) {
            newChatWidth = maxChatWidth;
            newPreviewWidth = containerWidth - newChatWidth - 6;
        }
        
        // Apply new widths
        this.previewSection.style.width = `${newPreviewWidth}px`;
        this.chatSidebar.style.width = `${newChatWidth}px`;
        
        e.preventDefault();
    }

    stopDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        
        // Remove dragging class
        this.divider.classList.remove('appdev__dragging');
        
        // Restore normal cursor and text selection
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    }
}

// Global state management
window.AppDevelopmentStudio = {
    currentApp: null,
    savedAppId: null, // Track the ID of the currently saved app
    chatHistory: [],
    isProcessing: false,
    studioId: 'app-development-studio',
    initialized: false,
    uploadedImages: [],
    keyManager: null, // Key event manager for focus handling
    resizeHandler: null, // Resize handler for divider
    
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
        this.initializeKeyManager();
        this.initializeResizeHandler();
        this.showWelcomeMessage();
        this.initialized = true;
        console.log('App Development Studio initialization complete!');
    },

    // Initialize key event management
    initializeKeyManager() {
        console.log('Initializing key manager...');
        this.keyManager = new StudioKeyManager();
        
        // Set up click handlers for studio areas to blur app preview
        const studioAreas = [
            document.getElementById('app-development-studio_chat-container'),
            document.getElementById('app-development-studio_chat-input'),
            document.getElementById('app-development-studio_save-app-btn')
        ];
        
        studioAreas.forEach(element => {
            if (element) {
                element.addEventListener('click', () => {
                    if (this.keyManager) {
                        this.keyManager.blurAppPreview();
                    }
                });
            }
        });
    },

    // Initialize resize handler for divider
    initializeResizeHandler() {
        console.log('Initializing resize handler...');
        this.resizeHandler = new ResizeHandler();
    },
    
    // Set up all event listeners
    setupEventListeners() {
        // Save button - saves generated app to ai-os
        const saveBtn = document.getElementById('app-development-studio_save-app-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveGeneratedApp());
        }
        
        // Export button - downloads app as JSON
        const exportBtn = document.getElementById('app-development-studio_export-app-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportGeneratedApp());
        }
        
        // Test button removed per user request
        
        // Clear chat button
        const clearBtn = document.getElementById('app-development-studio_clear-chat-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearChat());
        }
        
        // Send chat button
        const sendBtn = document.getElementById('app-development-studio_send-chat-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        // Chat input enter key
        const chatInput = document.getElementById('app-development-studio_chat-input');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        // Custom answer submit
        const customSubmitBtn = document.getElementById('app-development-studio_submit-custom-answer');
        if (customSubmitBtn) {
            customSubmitBtn.addEventListener('click', () => this.submitCustomAnswer());
        }
        
        // Custom answer input enter key
        const customInput = document.getElementById('app-development-studio_custom-answer-input');
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
        const imageUploadBtn = document.getElementById('app-development-studio_image-upload-btn');
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
        const fileInput = document.getElementById('app-development-studio_image-file-input');
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
        const chatInput = document.getElementById('app-development-studio_chat-input');
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
            const studioContainer = document.querySelector('.appdev__container');
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
        const fileInput = document.getElementById('app-development-studio_image-file-input');
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
        const container = document.getElementById('app-development-studio_image-preview-container');
        if (!container) return;
        
        const previewDiv = document.createElement('div');
        previewDiv.className = 'appdev__image-preview';
        previewDiv.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageData.base64;
        img.alt = imageData.name;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'appdev__image-remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove image';
        removeBtn.addEventListener('click', () => this.removeImage(index));
        
        previewDiv.appendChild(img);
        previewDiv.appendChild(removeBtn);
        container.appendChild(previewDiv);
    },
    
    // Show image container
    showImageContainer() {
        const container = document.getElementById('app-development-studio_image-preview-container');
        if (container) {
            container.style.display = 'flex';
        }
    },
    
    // Hide image container
    hideImageContainer() {
        const container = document.getElementById('app-development-studio_image-preview-container');
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
        const container = document.getElementById('app-development-studio_image-preview-container');
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
        const container = document.getElementById('app-development-studio_image-preview-container');
        if (container) {
            container.innerHTML = '';
        }
    },

    // Clear image preview display (used after sending message)
    clearImagePreview() {
        this.hideImageContainer();
        const container = document.getElementById('app-development-studio_image-preview-container');
        if (container) {
            container.innerHTML = '';
        }
    },
    
    // Send message to AI
    sendMessage() {
        const chatInput = document.getElementById('app-development-studio_chat-input');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message && this.uploadedImages.length === 0) return;
        
        // Create a copy of images before clearing
        const imagesToDisplay = [...this.uploadedImages];
        
        // Add user message to chat with images
        this.addMessageToChat('user', message || 'Please create an app based on the uploaded image(s)', imagesToDisplay);
        
        // Clear input and uploaded images
        chatInput.value = '';
        this.uploadedImages = []; // Clear uploaded images
        this.clearImagePreview(); // Clear the preview display
        
        // Process with AI
        this.processWithAI(message || 'Please create an app based on the uploaded image(s)');
    },
    
    // Add message to chat history and update display
    addMessageToChat(type, content, images = []) {
        // Add debug output
        console.log('addMessageToChat called with type:', type, 'content:', content, 'images:', images);
        
        const message = {
            type: type,
            content: content,
            images: images || [], // Array of image data URLs
            timestamp: new Date()
        };
        
        this.chatHistory.push(message);
        this.updateChatDisplay();
    },
    
    // Update chat display
    updateChatDisplay() {
        const chatMessages = document.getElementById('app-development-studio_chat-messages');
        if (!chatMessages) return;
        
        chatMessages.innerHTML = '';
        
        this.chatHistory.forEach(message => {
            const messageEl = document.createElement('div');
            messageEl.className = `appdev__chat-message appdev__${message.type}`;
            
            // Format message content with images
            const messageContent = this.formatMessageWithImages(message);
            
            if (message.type === 'assistant') {
                messageEl.innerHTML = `
                    <div class="appdev__message-avatar">🤖</div>
                    <div class="appdev__message-content">${messageContent}</div>
                `;
            } else {
                messageEl.innerHTML = `
                    <div class="appdev__message-content">${messageContent}</div>
                    <div class="appdev__message-avatar">👤</div>
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
        
        // Use marked library to parse markdown (now globally available from ai-os.html)
        let markedParser = null;
        
        // Check for marked library (should be available globally)
        if (typeof window.marked !== 'undefined') {
            if (typeof window.marked.parse === 'function') {
                markedParser = window.marked.parse;
            } else if (typeof window.marked === 'function') {
                markedParser = window.marked;
            }
        }
        
        // Use marked library to parse markdown if available
        if (markedParser) {
            try {
                console.log('Using marked parser to process content');
                return markedParser(content);
            } catch (error) {
                console.warn('Error parsing markdown:', error);
                // Fallback to simple line break replacement
                return content.replace(/\n/g, '<br>');
            }
        } else {
            // Fallback if marked library is not loaded
            console.warn('Marked library not available, using fallback formatting');
            return content.replace(/\n/g, '<br>');
        }
    },

    // Format message content with images
    formatMessageWithImages(message) {
        let formattedContent = '';
        
        // Add text content if present
        if (message.content) {
            formattedContent += this.formatMessage(message.content);
        }
        
        // Add images if present
        if (message.images && message.images.length > 0) {
            if (formattedContent) {
                formattedContent += '<br><br>'; // Add spacing between text and images
            }
            
            message.images.forEach((imageData, index) => {
                // Extract the base64 data URL from the image data object
                const imageUrl = typeof imageData === 'string' ? imageData : imageData.base64;
                
                formattedContent += `
                    <div class="chat-image-container" style="margin: 8px 0;">
                        <img src="${imageUrl}"
                             alt="Uploaded image ${index + 1}"
                             style="max-width: 300px; max-height: 200px; border-radius: 8px; border: 1px solid #e1e5e9; cursor: pointer;"
                             onclick="this.style.maxWidth = this.style.maxWidth === '300px' ? '100%' : '300px'; this.style.maxHeight = this.style.maxHeight === '200px' ? 'auto' : '200px';"
                             title="Click to toggle size">
                    </div>
                `;
            });
        }
        
        return formattedContent || 'No content';
    },
    
    // Process message with AI using dedicated App Development Studio functions
    async processWithAI(message) {
        this.isProcessing = true;
        this.showTypingIndicator();
        this.updateButtonStates(); // Disable buttons when processing starts
        
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
            // Use intelligent error analysis instead of generic message
            this.handleErrorWithAnalysis(error, null);
        } finally {
            this.isProcessing = false;
            this.hideTypingIndicator();
            this.updateButtonStates(); // Re-enable buttons when processing ends
        }
    },

    // Update button states based on processing status
    updateButtonStates() {
        const sendBtn = document.getElementById('app-development-studio_send-chat-btn');
        const imageBtn = document.getElementById('app-development-studio_image-upload-btn');
        
        if (sendBtn) {
            sendBtn.disabled = this.isProcessing;
        }
        
        if (imageBtn) {
            imageBtn.disabled = this.isProcessing;
        }
        
        // Also disable file input
        const fileInput = document.getElementById('app-development-studio_image-upload');
        if (fileInput) {
            fileInput.disabled = this.isProcessing;
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

    // Create prompt for app development using centralized system prompts
    createAppDevelopmentPrompt(userMessage) {
        console.log('Creating App Development Studio prompt using centralized prompts');
        
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

        // Use centralized prompts from system-prompts.js
        let prompt = ROLE_PROMPT +
                     APPCREATION_PROMPT
                         .replace(/{appId}/g, this.studioId)
                         .replace(/{availableDataObjects}/g, availableDataObjects)
                         .replace(/{availableAPIs}/g, availableAPIs)
                         .replace(/{currentTheme}/g, currentTheme) +
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
        console.log('Creating App Development Studio EDIT prompt using centralized prompts');
        
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

        // Use centralized prompts from system-prompts.js
        let prompt = APPMODIFY_PROMPT
            .replace(/{modificationRequest}/g, userMessage)
            .replace(/{appId}/g, this.studioId)
            .replace(/{appTitle}/g, this.currentApp.title)
            .replace(/{promptHistory}/g, 'Previous modifications applied')
            .replace(/{availableDataObjects}/g, availableDataObjects)
            .replace(/{availableAPIs}/g, availableAPIs)
            .replace(/{currentHTML}/g, this.currentApp.html)
            .replace(/{currentCSS}/g, this.currentApp.css)
            .replace(/{currentJavaScript}/g, this.currentApp.javascript)
            .replace(/{currentTheme}/g, currentTheme);

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
            
            // Case 1: Direct object from AI-OS system - check for suggestions first
            if (response && typeof response === 'object') {
                // Check for suggestions format in direct object
                if (response.type === 'suggestions') {
                    console.log('Received direct suggestions object from AI system');
                    this.showSuggestions(response.question, response.suggestions);
                    return;
                }
                // Check for app object
                else if (response.html) {
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
            }
            // Case 2: String response that might be JSON
            else if (typeof response === 'string') {
                console.log('Received string response, attempting to parse');
                
                // Try to extract JSON from the response if it's wrapped in other text
                let jsonString = response.trim();
                
                // Look for JSON object patterns
                const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    jsonString = jsonMatch[0];
                }
                
                try {
                    const parsed = JSON.parse(jsonString);
                    console.log('Successfully parsed JSON response:', parsed);
                    
                    // Check for suggestions format FIRST (most specific)
                    if (parsed.type === 'suggestions') {
                        console.log('Detected suggestions response, showing suggestions panel');
                        this.showSuggestions(parsed.question, parsed.suggestions);
                        return;
                    }
                    // Check if it's an app object
                    else if (parsed.html || (parsed.title && (parsed.css || parsed.javascript))) {
                        appData = {
                            title: parsed.title || 'Generated App',
                            description: parsed.description, // Keep the modification description if provided
                            html: parsed.html || '',
                            css: parsed.css || '',
                            javascript: parsed.javascript || '',
                            icon: parsed.icon || '📱'
                        };
                    }
                    // Other structured responses
                    else {
                        console.log('Parsed JSON but no recognized format, treating as message');
                        this.addMessageToChat('assistant', response);
                        return;
                    }
                } catch (parseError) {
                    console.log('Failed to parse as JSON, error:', parseError.message);
                    console.log('Raw response:', response);
                    
                    // Check if the response looks like suggestions JSON but failed to parse
                    if (response.includes('"type": "suggestions"') || response.includes('"suggestions"')) {
                        console.log('Response appears to be suggestions but failed to parse, showing as message');
                        this.addMessageToChat('assistant', 'I tried to provide suggestions but there was a formatting error. Please try rephrasing your request.');
                        return;
                    }
                    
                    this.addMessageToChat('assistant', response);
                    return;
                }
            }
            // Case 3: Other object types
            else if (response && typeof response === 'object') {
                console.log('Received object response, checking for suggestions');
                
                // Check if it's a suggestions object
                if (response.type === 'suggestions') {
                    console.log('Found suggestions in other object type, showing suggestions panel');
                    this.showSuggestions(response.question, response.suggestions);
                    return;
                }
                
                // Otherwise convert to string and display
                console.log('Converting object response to string');
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
            // Instead of generic error, analyze the problem and provide suggestions
            this.handleErrorWithAnalysis(error, response);
        } finally {
            // Ensure processing state is always reset
            this.isProcessing = false;
            this.hideTypingIndicator();
            this.updateButtonStates();
        }
    },

    // Handle errors with intelligent analysis and suggestions
    async handleErrorWithAnalysis(error, originalResponse) {
        console.log('Analyzing error for intelligent suggestions:', error);
        
        try {
            // Get the last user message from chat history
            const lastUserMessage = this.chatHistory
                .filter(msg => msg.type === 'user')
                .pop();
            
            const userRequest = lastUserMessage ? lastUserMessage.content : 'Unknown request';
            
            // Prepare current app context
            let currentAppContext = 'No current app';
            if (this.currentApp) {
                currentAppContext = `
Current App: ${this.currentApp.title}
HTML: ${this.currentApp.html.substring(0, 500)}...
CSS: ${this.currentApp.css.substring(0, 300)}...
JavaScript: ${this.currentApp.javascript.substring(0, 500)}...`;
            }
            
            // Create error analysis prompt
            const errorAnalysisPrompt = `
You are an expert debugging assistant for the App Development Studio. An error occurred while processing a user request.

ERROR DETAILS:
- Error Message: ${error.message}
- Error Type: ${error.name}
- Stack Trace: ${error.stack ? error.stack.substring(0, 500) : 'Not available'}

USER REQUEST:
${userRequest}

CURRENT APP CONTEXT:
${currentAppContext}

ORIGINAL AI RESPONSE:
${typeof originalResponse === 'string' ? originalResponse.substring(0, 1000) : JSON.stringify(originalResponse, null, 2).substring(0, 1000)}

TASK: Analyze this error and provide helpful suggestions to resolve the issue.

You MUST respond with a JSON object in this exact format:
{
  "type": "suggestions",
  "question": "I encountered an error while processing your request. How would you like me to help resolve this?",
  "suggestions": [
    "Option 1: Specific fix based on error analysis",
    "Option 2: Alternative approach",
    "Option 3: Simplified version",
    "Option 4: Debug and retry"
  ]
}

Make the suggestions specific and actionable based on the error analysis.`;

            // Call LLM for error analysis
            const analysisResponse = await this.callStudioLLM(errorAnalysisPrompt);
            
            if (analysisResponse) {
                // Try to parse and show suggestions
                let suggestions = null;
                
                if (typeof analysisResponse === 'object' && analysisResponse.type === 'suggestions') {
                    suggestions = analysisResponse;
                } else if (typeof analysisResponse === 'string') {
                    try {
                        const parsed = JSON.parse(analysisResponse);
                        if (parsed.type === 'suggestions') {
                            suggestions = parsed;
                        }
                    } catch (parseError) {
                        console.warn('Failed to parse error analysis response:', parseError);
                    }
                }
                
                if (suggestions) {
                    this.showSuggestions(suggestions.question, suggestions.suggestions);
                    return;
                }
            }
        } catch (analysisError) {
            console.error('Error during error analysis:', analysisError);
        }
        
        // Fallback to generic error message if analysis fails
        this.addMessageToChat('assistant', 'Sorry, I encountered an error while processing your request. Please try again or rephrase your request.');
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
        
        const panel = document.getElementById('app-development-studio_suggestions-panel');
        const questionEl = document.getElementById('app-development-studio_suggestions-question');
        const buttonsEl = document.getElementById('app-development-studio_suggestions-buttons');
        
        if (!panel || !questionEl || !buttonsEl) return;
        
        // Display in the requested format: "Suggestion of the LLM:"
        questionEl.textContent = "Suggestion of the LLM:";
        buttonsEl.innerHTML = '';
        
        // Add the question as a message to chat
        const questionStr = typeof question === 'string' ? question : String(question);
        this.addMessageToChat('assistant', questionStr);
        
        // Create max 4 suggestion buttons in the format "Choice X: description"
        suggestions.slice(0, 4).forEach((suggestion, index) => {
            const button = document.createElement('button');
            button.className = 'appdev__suggestion-btn';
            
            // Handle both string suggestions and object suggestions
            let suggestionText, suggestionLabel;
            if (typeof suggestion === 'string') {
                suggestionText = suggestion;
                suggestionLabel = `Choice ${index + 1}: ${suggestion}`;
            } else {
                suggestionText = suggestion.text || suggestion;
                suggestionLabel = `Choice ${index + 1}: ${suggestion.text || suggestion}`;
                if (suggestion.description) {
                    suggestionLabel += ` - ${suggestion.description}`;
                }
            }
            
            button.textContent = suggestionLabel;
            button.addEventListener('click', () => this.selectSuggestion(suggestionText));
            buttonsEl.appendChild(button);
        });
        
        // Always add "None of the above, now create my app" button
        const forceCreateButton = document.createElement('button');
        forceCreateButton.className = 'appdev__suggestion-btn appdev__force-create-btn';
        forceCreateButton.textContent = 'None of the above, now create my app';
        forceCreateButton.addEventListener('click', () => this.forceCreateApp());
        buttonsEl.appendChild(forceCreateButton);
        
        panel.style.display = 'block';
    },
    
    // Select a suggestion
    selectSuggestion(suggestionText) {
        this.hideSuggestions();
        this.addMessageToChat('user', suggestionText);
        this.processWithAI(suggestionText);
    },
    
    // Force create app bypassing suggestions
    forceCreateApp() {
        this.hideSuggestions();
        
        // Get the last user message from chat history
        const lastUserMessage = this.chatHistory
            .filter(msg => msg.type === 'user')
            .pop();
        
        if (!lastUserMessage) {
            this.addMessageToChat('assistant', 'I need a request to create an app. Please describe what you want me to build.');
            return;
        }
        
        const originalRequest = lastUserMessage.content;
        
        // Add a message indicating we're proceeding with the original request
        this.addMessageToChat('user', 'Proceed with my original request: ' + originalRequest);
        
        // Create a modified prompt that forces app generation without suggestions
        const forceCreatePrompt = `
IMPORTANT: The user has explicitly requested to bypass suggestions and create the app directly.
You MUST respond with a complete app JSON object, NOT suggestions.

Original user request: ${originalRequest}

${this.currentApp ? 'MODIFY the existing app based on the request.' : 'CREATE a new app based on the request.'}

You MUST respond with a JSON object containing the complete app code. Do NOT provide suggestions.`;
        
        // Process with AI using the force create prompt
        this.processWithAI(forceCreatePrompt);
    },
    
    // Submit custom answer
    submitCustomAnswer() {
        const customInput = document.getElementById('app-development-studio_custom-answer-input');
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
        const panel = document.getElementById('app-development-studio_suggestions-panel');
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
        const previewArea = document.getElementById('app-development-studio_app-preview-area');
        if (!previewArea) return;
        
        // Create a unique preview container ID
        const previewContainerId = `preview-content-${Date.now()}`;
        
        previewArea.innerHTML = `
            <div class="appdev__app-preview">
                <div class="appdev__app-preview-header">
                    <span>${appData.icon || '📱'} ${appData.title}</span>
                    <span style="font-size: 12px; opacity: 0.7;">${appData.description || 'Generated app'}</span>
                </div>
                <div class="appdev__app-preview-content" id="${previewContainerId}" style="
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
            let styleEl = document.getElementById('app-development-studio_preview-styles');
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
                const executeJS = new Function('appNamespace', 'previewContainerId', 'dataRegistry', 'marked', `
                    try {
                        // Create window namespace for the preview app
                        window[appNamespace] = window[appNamespace] || {};
                        
                        // Create app helper object for preview
                        const app = {
                            id: 'preview-app',
                            getElementById: (id) => document.getElementById(previewContainerId + '_' + id) || document.getElementById(id),
                            querySelector: (selector) => document.querySelector('#' + previewContainerId + ' ' + selector),
                            querySelectorAll: (selector) => document.querySelectorAll('#' + previewContainerId + ' ' + selector),
                            onKey: (eventType, handler) => {
                                // Enable key handling when app preview has focus
                                if (window.AppDevelopmentStudio && window.AppDevelopmentStudio.keyManager) {
                                    const keyManager = window.AppDevelopmentStudio.keyManager;
                                    
                                    // Store the handler for when app has focus
                                    const wrappedHandler = (event) => {
                                        if (keyManager.appPreviewHasFocus) {
                                            handler(event);
                                        }
                                    };
                                    
                                    // Add the event listener
                                    document.addEventListener(eventType, wrappedHandler, true);
                                    
                                    // Store reference for cleanup (optional)
                                    if (!app._keyHandlers) app._keyHandlers = [];
                                    app._keyHandlers.push({ eventType, handler: wrappedHandler });
                                }
                            },
                            data: {}
                        };
                        
                        // Make global objects available in the execution context
                        if (dataRegistry) {
                            window.dataRegistry = dataRegistry;
                        }
                        if (marked) {
                            window.marked = marked;
                        }
                        
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
                
                executeJS(appNamespace, previewContainerId, window.dataRegistry, window.marked);
                
            } catch (error) {
                console.error('Error executing app JavaScript:', error);
                // Show error in preview
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'color: red; padding: 10px; background: #ffe6e6; border: 1px solid #ff9999; border-radius: 4px; margin: 10px;';
                errorDiv.textContent = `JavaScript Error: ${error.message}`;
                document.getElementById(previewContainerId).appendChild(errorDiv);
            }
        }
        
        // Set up key manager for the app preview
        if (this.keyManager) {
            const previewContentElement = document.getElementById(previewContainerId);
            if (previewContentElement) {
                this.keyManager.setAppPreviewElement(previewContentElement);
                console.log('Key manager set up for app preview');
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
    
    // Test function removed per user request
    
    // Clear chat history
    clearChat() {
        this.chatHistory = [];
        this.hideSuggestions();
        this.showWelcomeMessage();
    },
    
    // Show typing indicator
    showTypingIndicator() {
        const chatMessages = document.getElementById('app-development-studio_chat-messages');
        if (!chatMessages) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'appdev__chat-message appdev__assistant';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="appdev__message-avatar">🤖</div>
            <div class="appdev__message-content">
                <div class="appdev__typing-indicator">
                    <span>AI is thinking</span>
                    <div class="appdev__typing-dots">
                        <div class="appdev__typing-dot"></div>
                        <div class="appdev__typing-dot"></div>
                        <div class="appdev__typing-dot"></div>
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
                