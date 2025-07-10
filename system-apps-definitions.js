// System Apps Definition Dictionary
const SYSTEM_APPS_DEFINITIONS = {

'Calculator': {
    generationMode: 'SIMPLE',
    icon: '🧮',
    dimensions: { width: 350, height: 450 },
    prompt:

`Create a fully functional Calculator app with a professional interface and specific design requirements.

EXACT LAYOUT REQUIREMENTS:
- Display screen at the top: large, dark background, white text, right-aligned numbers
- Row 1: Clear (C), Plus/Minus (±), Percentage (%), Division (÷)
- Row 2: Seven (7), Eight (8), Nine (9), Multiplication (×)
- Row 3: Four (4), Five (5), Six (6), Subtraction (-)
- Row 4: One (1), Two (2), Three (3), Addition (+)
- Row 5: Zero (0) spans 2 columns, Decimal (.), Equals (=)
- Center all content in the window

BUTTON SIZING AND SPACING:
- All buttons uniform size: exactly 60px × 60px

VISUAL DESIGN DETAILS:
- Clean, modern calculator appearance
- Subtle shadow effects on buttons for depth
- Hover effects: slight brightness change when hovering over buttons
- Active/pressed state: slightly darker version of button color
- Professional typography with clear, readable fonts
- Responsive design that scales well within the window
- MANDATORY: column spacing between buttons: 5px max
- Button colors:
  - number buttons are grey (#28a745) with white text
  - function buttons (C, ±, %, ÷, ×, -, +) are blue (#007bff) with white text
  - equal button (=) is green (#fd7e14) with white text
  - clear button (C) is red (#dc3545) with white text

FUNCTIONALITY REQUIREMENTS:
- All basic arithmetic operations working correctly
- Clear function resets calculator to zero
- Decimal point support for floating point calculations
- Plus/minus toggle changes sign of current displayed number
- Percentage calculations work properly
- Proper order of operations and chaining calculations
- Error handling for division by zero shows "Error"
- Display updates immediately when any button is pressed
- Keyboard support for number keys and basic operators using app.onKey() API
- MANDATORY: show the selected operation in the display
- MANDATORY: The calculator should be in a container that ensures it will not resize when the window is beeing resized

TECHNICAL IMPLEMENTATION:
- Maintain proper calculator state between operations
- Handle edge cases like multiple operators, leading zeros, decimal points
- Ensure calculator behaves exactly like a standard calculator

CRITICAL INITIALIZATION REQUIREMENTS:
- MANDATORY: You MUST create an init function exactly as shown below
- MANDATORY: The init function MUST be created in the JavaScript section
- MANDATORY: Use the exact function signature and structure provided
- MANDATORY: Include keyboard event handling using the app.onKey() API
- MANDATORY: The init function will be automatically called after the app loads

REQUIRED INIT FUNCTION TEMPLATE (COPY EXACTLY):

// MANDATORY: App initialization function - DO NOT MODIFY THIS SIGNATURE
window[appNamespace].init = function() {
    console.log('Calculator app initialized');
    
    // Add keyboard support using the focus-aware key handling API
    if (typeof app !== 'undefined' && app.onKey) {
        app.onKey('keydown', function(event) {
            // Prevent default behavior for calculator keys
            const calculatorKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','=','Enter','Escape','Backspace','.','%'];
            if (calculatorKeys.includes(event.key)) {
                event.preventDefault();
            }
            
            // Handle number keys
            if (event.key >= '0' && event.key <= '9') {
                handleNumberInput(event.key);
            }
            // Handle operator keys
            else if (event.key === '+') {
                handleOperatorInput('+');
            }
            else if (event.key === '-') {
                handleOperatorInput('-');
            }
            else if (event.key === '*') {
                handleOperatorInput('×');
            }
            else if (event.key === '/') {
                handleOperatorInput('÷');
            }
            // Handle equals
            else if (event.key === 'Enter' || event.key === '=') {
                handleEqualsInput();
            }
            // Handle clear
            else if (event.key === 'Escape') {
                handleClearInput();
            }
            // Handle backspace
            else if (event.key === 'Backspace') {
                handleBackspaceInput();
            }
            // Handle decimal point
            else if (event.key === '.') {
                handleDecimalInput();
            }
            // Handle percentage
            else if (event.key === '%') {
                handlePercentageInput();
            }
        });
    }
    
    // Initialize calculator state
    initializeCalculatorState();
};

IMPLEMENTATION NOTES:
- You MUST implement the helper functions referenced in the init function (handleNumberInput, handleOperatorInput, etc.)
- Each helper function should correspond to the button click handlers for the calculator
- The init function MUST be placed at the end of your JavaScript code
- Do NOT modify the function signature or structure of the init function
- The app.onKey() API handles focus-aware keyboard events automatically
- Test that keyboard input works the same as button clicks

KEYBOARD MAPPING REQUIREMENTS:
- Number keys 0-9: Input corresponding numbers
- +, -, *, / keys: Input corresponding operators (convert * to ×, / to ÷)
- Enter or = key: Execute calculation (equals function)
- Escape key: Clear calculator
- Backspace key: Delete last entered digit
- . key: Input decimal point
- % key: Apply percentage function

The calculator must be immediately functional with both mouse clicks and keyboard input, using the exact color scheme and layout specified.`
},

'Digital Clock': {
    generationMode: 'SIMPLE',
    icon: '🕐',
    dimensions: { width: 400, height: 300 },
    prompt: `Create a reliable Digital Clock app that displays the current time with automatic updates and format switching.

CRITICAL IMPLEMENTATION REQUIREMENTS:
- MANDATORY: Use new Date() to get current time - NEVER hardcode time values
- MANDATORY: Use setInterval() to update every 1000ms (1 second)
- MANDATORY: Store timer reference for cleanup: let clockTimer = setInterval(updateClock, 1000);
- MANDATORY: Call updateClock() immediately on init to show time instantly
- MANDATORY: Use proper time formatting with padStart() for leading zeros
- MANDATORY: Include error handling for date/time operations

SPECIFIC UI ELEMENTS REQUIRED:
1. Main time display: Large, centered text showing HH:MM:SS
2. AM/PM indicator (in 12-hour mode)
3. Date display below time
4. Toggle switch for 12/24 hour format with visual movement
5. All elements must have unique IDs with {appId} prefix

EXACT IMPLEMENTATION STRUCTURE:
- Time display element: <div id="{appId}_time-display">00:00:00</div>
- Date display element: <div id="{appId}_date-display">Loading...</div>
- Format toggle: <div id="{appId}_format-toggle" class="toggle-switch">
- Toggle must visually slide when clicked, not just change text

MANDATORY JAVASCRIPT FUNCTIONS:
function updateClock() {
    try {
        const now = new Date();
        console.log('Updating clock:', now.toLocaleTimeString());
        
        // Get time elements
        const timeDisplay = document.getElementById('{appId}_time-display');
        const dateDisplay = document.getElementById('{appId}_date-display');
        
        if (!timeDisplay || !dateDisplay) {
            console.error('Clock elements not found');
            return;
        }
        
        // Format time based on current mode
        let timeString;
        if (is24HourFormat) {
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            timeString = hours + ':' + minutes + ':' + seconds;
        } else {
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
            timeString = hours.toString().padStart(2, '0') + ':' + minutes + ':' + seconds + ' ' + ampm;
        }
        
        // Update displays
        timeDisplay.textContent = timeString;
        dateDisplay.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
    } catch (error) {
        console.error('Error updating clock:', error);
        // Fallback display
        const timeDisplay = document.getElementById('{appId}_time-display');
        if (timeDisplay) {
            timeDisplay.textContent = 'Clock Error';
        }
    }
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    console.log('Time format toggled to:', is24HourFormat ? '24-hour' : '12-hour');
    
    // Update toggle switch visual state
    const toggle = document.getElementById('{appId}_format-toggle');
    if (toggle) {
        toggle.classList.toggle('active', is24HourFormat);
    }
    
    // Update clock immediately
    updateClock();
}

STYLING REQUIREMENTS:
- Large, readable font for time (minimum 24px)
- Centered layout with proper spacing
- Toggle switch with smooth animation
- Theme-aware colors (light/dark mode support)
- Professional appearance with good contrast

ERROR HANDLING:
- Wrap all time operations in try-catch blocks
- Provide fallback displays for errors
- Log errors to console for debugging
- Handle missing DOM elements gracefully

TIMER MANAGEMENT:
- Store timer reference: let clockTimer;
- Clear existing timer before creating new one
- Start timer in init function
- Update immediately on init (don't wait 1 second)

DEBUGGING FEATURES:
- Console.log current time on each update
- Console.log format changes
- Console.log any errors encountered
- Verify DOM elements exist before using

MANDATORY INIT FUNCTION:
window[appNamespace].init = function() {
    console.log('Digital Clock app initializing...');
    
    // Initialize format state
    let is24HourFormat = false;
    let clockTimer;
    
    // Clear any existing timer
    if (clockTimer) {
        clearInterval(clockTimer);
    }
    
    // Set up format toggle event listener
    const formatToggle = document.getElementById('{appId}_format-toggle');
    if (formatToggle) {
        formatToggle.addEventListener('click', toggleTimeFormat);
    } else {
        console.error('Format toggle element not found');
    }
    
    // Start clock immediately
    updateClock();
    
    // Set up timer for continuous updates
    clockTimer = setInterval(updateClock, 1000);
    
    console.log('Digital Clock initialized with timer ID:', clockTimer);
};

CRITICAL SUCCESS FACTORS:
1. ALWAYS use new Date() for current time
2. ALWAYS call updateClock() immediately in init
3. ALWAYS use setInterval for automatic updates
4. ALWAYS include error handling and logging
5. ALWAYS use padStart() for proper time formatting
6. ALWAYS make toggle switch visually move when clicked
7. NEVER hardcode time values or use static displays`
},

'Cost Tracking': {
    generationMode: 'SIMPLE',
    icon: '💰',
    dimensions: { width: 600, height: 500 },
    prompt: `Create a comprehensive Cost Tracking app that displays API usage costs with real-time data access and robust error handling.
    
    CRITICAL: This app MUST work with the AI-OS system. The cost data is stored in window.dataRegistry.getData('cost-history') and also available as window.costHistory for backward compatibility.
    
    HTML STRUCTURE (replace {appId} with actual app ID):
    <div style="padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <strong>Total Cost:</strong>
                    <span id="{appId}_total-cost" style="color: #dc3545; font-size: 18px; font-weight: bold;">$0.0000</span>
                </div>
                <div>
                    <strong>Total API Calls:</strong>
                    <span id="{appId}_call-count" style="font-size: 16px;">0</span>
                </div>
            </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #dee2e6;">
            <thead>
                <tr style="background: #343a40; color: white;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Date/Time</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Cost</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Description</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Request</th>
                </tr>
            </thead>
            <tbody id="{appId}_cost-table-body">
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px; color: #666;">Loading data...</td>
                </tr>
            </tbody>
        </table>
    </div>
    
 
    
    CRITICAL REQUIREMENTS:
    1. Use app.getElementById() helper function (provided by AI-OS system)
    2. Functions are NOT prefixed with appId - they exist within the app namespace
    3. The init function MUST be window[appNamespace].init
    4. HTML element IDs MUST be prefixed with {appId}_
    5. Use multiple data sources with fallbacks: dataRegistry -> window.costHistory -> localStorage
    6. The cost data structure is: [{timestamp: string, cost: number, description: string, prompt: string}]
    7. Subscribe to 'cost-history' changes for real-time updates
    8. MANDATORY: Access and subscribe the global cost-history data object
    10. MANDATORY: There must be a reload button
    
    The app will work with the AI-OS system's data registry and provide multiple fallback data sources.`
},

'Data Registry': {
    generationMode: 'SIMPLE',
    icon: '📊',
    dimensions: { width: 700, height: 500 },
    prompt: `Create a Data Registry Browser app that displays all registered shared data objects with a professional interface and specific design requirements.

EXACT LAYOUT REQUIREMENTS:
- Header section with title "Data Registry" and refresh button (🔄)
- Main table with columns: Name, Description, Storage Type, Data Type, Current Value Preview, Actions
- Each row must have a "Console Log" button and a "Delete" button in the Actions column
- Handle empty registry state with message "No shared data registered yet"

VISUAL DESIGN DETAILS:
- Clean, modern table design with alternating row colors
- Header row with dark background (#343a40) and white text
- Data rows with light background (#f8f9fa) alternating with white
- Buttons styled consistently: blue for actions, green for positive actions, red for destructive actions
- Console Log buttons should be small, styled with gray background (#6c757d) and white text
- Delete buttons should be small, styled with red background (#dc3545) and white text
- Actions column should be wide enough for both Console Log and Delete buttons
- Responsive design that fits well within the window
- Professional typography with clear, readable fonts
- Proper spacing and padding throughout

FUNCTIONALITY REQUIREMENTS:
- CRITICAL: Display all data using window.dataRegistry.getAllData() (NOT getAllDataRegistry)
- CRITICAL: Show descriptions from window.dataRegistry.getDataInfo(key).description
- CRITICAL: Show structure info from window.dataRegistry.getDataInfo(key).structure
- CRITICAL: Use window.dataRegistry.getData(key) to get individual data objects
- CRITICAL: Show storage type from window.dataRegistry.getDataInfo(key).config.type or detect automatically
- Determine data type using typeof or Array.isArray() for arrays
- Preview values: show first 50 characters for strings, full value for numbers/booleans
- Each row must have a "Console Log" button that outputs the data object to console
- Console Log button should use: console.log('Data Key:', key, 'Value:', window.dataRegistry.getData(key), 'Info:', window.dataRegistry.getDataInfo(key))
- Each row must have a "Delete" button that permanently removes the data object
- Delete button should confirm deletion and use: window.dataRegistry.deleteData(key)
- NEVER use window.dataRegistry.hasData() - this method does not exist
- To check if data exists, use: window.dataRegistry.getData(key) !== undefined
- Refresh button updates the display by calling loadRegistryData() function
- Subscribe to data changes for real-time updates using window.dataRegistry.subscribe()
- CRITICAL: Create a main loadRegistryData() function that populates the table
- CRITICAL: All refresh operations should call loadRegistryData(), not refreshDataTable()

STORAGE TYPE DETECTION:
- Check window.dataRegistry.getDataInfo(key).config.type for explicit type
- If config.type exists, show it (e.g., "app", "data", "persistent")
- If no config.type, detect automatically:
  - "JS-Object" for regular JavaScript objects
  - "IndexedDB" for persistent data objects
  - "localStorage" for localStorage references
  - "sessionStorage" for sessionStorage references
  - "Array" for arrays
  - "Primitive" for strings, numbers, booleans

DELETE FUNCTIONALITY IMPLEMENTATION:
- Add confirmation dialog before deletion: "Are you sure you want to permanently delete '[dataKey]'? This action cannot be undone."
- Use window.dataRegistry.deleteData(key) to remove the data object
- Handle deletion errors gracefully with user feedback
- Refresh the table after successful deletion
- Prevent deletion of critical system data (show warning for system-critical keys)

EXAMPLE DELETE BUTTON IMPLEMENTATION:
function deleteDataObject(key) {
  showCustomConfirm('Are you sure you want to permanently delete "' + key + '"? This action cannot be undone.', 'Confirm Delete').then(confirmed => {
    if (confirmed) {
    try {
      const result = window.dataRegistry.deleteData(key);
      if (result.success) {
        console.log('Successfully deleted data object:', key);
        loadRegistryData(); // Refresh the display using the main load function
      } else {
        showCustomAlert('Failed to delete data object: ' + result.error, 'Error');
      }
    } catch (error) {
      console.error('Error deleting data object:', error);
      showCustomAlert('Error deleting data object: ' + error.message, 'Error');
    }
    }
  });
}

EXAMPLE MAIN LOAD FUNCTION:
function loadRegistryData() {
  try {
    const allData = window.dataRegistry.getAllData();
    const tableBody = document.getElementById('registry-table-body');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (Object.keys(allData).length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No shared data registered yet</td></tr>';
      return;
    }
    
    Object.keys(allData).forEach(key => {
      const data = allData[key];
      const info = window.dataRegistry.getDataInfo(key);
      
      // Detect storage type
      let storageType = 'JS-Object';
      if (info.config && info.config.type) {
        storageType = info.config.type;
      } else if (key === 'localStorage') {
        storageType = 'localStorage';
      } else if (key === 'sessionStorage') {
        storageType = 'sessionStorage';
      } else if (info.config && info.config.persistent) {
        storageType = 'IndexedDB';
      } else if (Array.isArray(data)) {
        storageType = 'Array';
      } else if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
        storageType = 'Primitive';
      }
      
      // Create table row
      const row = tableBody.insertRow();
      row.innerHTML =
        '<td>' + key + '</td>' +
        '<td>' + (info.description || 'No description') + '</td>' +
        '<td><span style="background: #e9ecef; padding: 2px 6px; border-radius: 3px; font-size: 12px;">' + storageType + '</span></td>' +
        '<td>' + typeof data + '</td>' +
        '<td>' + getValuePreview(data) + '</td>' +
        '<td>' +
          '<button onclick="console.log(\'Data Key:\', \'' + key + '\', \'Value:\', window.dataRegistry.getData(\'' + key + '\'), \'Info:\', window.dataRegistry.getDataInfo(\'' + key + '\'))" style="background: #6c757d; color: white; border: none; padding: 4px 8px; margin-right: 4px; border-radius: 3px; font-size: 12px;">Console Log</button>' +
          '<button onclick="deleteDataObject(\'' + key + '\')" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 3px; font-size: 12px;">Delete</button>' +
        '</td>';
    });
  } catch (error) {
    console.error('Error loading registry data:', error);
  }
}

function getValuePreview(data) {
  if (data === null) return 'null';
  if (data === undefined) return 'undefined';
  if (typeof data === 'string') {
    return data.length > 50 ? data.substring(0, 50) + '...' : data;
  }
  if (typeof data === 'number' || typeof data === 'boolean') {
    return String(data);
  }
  if (Array.isArray(data)) {
    return 'Array(' + data.length + ')';
  }
  if (typeof data === 'object') {
    return 'Object(' + Object.keys(data).length + ' keys)';
  }
  return String(data);
}

TECHNICAL IMPLEMENTATION:
- Use proper error handling for missing data or metadata
- Handle all JavaScript data types: string, number, boolean, object, array
- Ensure table updates dynamically when refresh is clicked or data changes
- Include proper null/undefined checks for safety
- Subscribe to data registry changes for automatic updates
- Implement proper confirmation dialogs for destructive actions

MANDATORY FEATURES:
- Must work with the new data registry API system
- Must use window.dataRegistry.getAllData(), getData(), getDataInfo(), registerData(), updateData(), deleteData()
- Must subscribe to data changes for real-time updates
- Must handle empty registry gracefully
- Must show storage type for each data object
- Must provide safe deletion functionality with confirmation
- Must be contained in a proper HTML structure that won't resize unexpectedly
- MANDATORY: Create an init function for app initialization:
  window[appNamespace].init = function() {
    // Put all event listeners and initialization code here
    // This function will be called after the app is loaded into the DOM
    
    // Example of correct data registry usage:
    // const allData = window.dataRegistry.getAllData(); // CORRECT
    // const dataInfo = window.dataRegistry.getDataInfo('user-preferences'); // CORRECT
    // const specificData = window.dataRegistry.getData('user-preferences'); // CORRECT
    // window.dataRegistry.deleteData('key-to-delete'); // For deletion
    
    // NEVER use: window.dataRegistry.getAllDataRegistry() - this method does not exist!
  };`

}
};