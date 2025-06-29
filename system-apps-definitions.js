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
- The calculator should be in a html container that ensures it will not resize when the window is beeing resized

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
    prompt: `Create a simple but functional Digital Clock that displays the current time and updates every second.

ESSENTIAL REQUIREMENTS:
- Create a working digital clock that shows the current time
- Update the display every second automatically
- Show hours, minutes, and seconds in HH:MM:SS format
- Use 12-hour format with AM/PM indicator
- add a switch to switch between 12-hour (hh:mm:ss AM/PM) and 24-hour formats (HH:mm:ss)
- the 12/24h switch must move when clicked not just toggle the format
- Center the clock display in the window
- Use a large, readable font for the time display
- Include the current date below the time
- Make it visually appealing with proper theme support

FUNCTIONALITY:
- Automatically start when the app opens
- Update every second without user interaction
- Show accurate current time
- Display current date in a readable format
- Handle time changes correctly (including midnight transitions)

The clock should be immediately functional and start displaying the current time as soon as the app loads.

MANDATORY: Create an init function for app initialization:
window[appNamespace].init = function() {
  // Put all event listeners, timer setup, and initialization code here
  // This function will be called after the app is loaded into the DOM
};`
},

'Cost Tracking': {
    generationMode: 'SIMPLE',
    icon: '💰',
    dimensions: { width: 600, height: 500 },
    prompt: `Create a comprehensive Cost Tracking app that displays API usage costs with real-time data access and proper error handling.

CRITICAL DATA ACCESS REQUIREMENTS:
- MANDATORY: Access cost data using window.dataRegistry.getData('cost-history') || []
- MANDATORY: The cost history contains objects with this exact structure:
  {
    timestamp: "2024-01-01T12:00:00.000Z",  // ISO date string
    cost: 0.0025,                           // Number (decimal cost)
    description: "App Creation Request",     // String description
    prompt: "Create a calculator app..."     // String (user's request)
  }
- CRITICAL: Always use safe access: const costs = window.dataRegistry.getData('cost-history') || [];
- CRITICAL: Handle undefined/null data gracefully with fallback to empty array

SPECIFIC UI REQUIREMENTS:
1. App title: "💰 Cost Tracking" prominently displayed
2. Summary section at top with:
   - Total cost in large, highlighted text: "Total Cost: $X.XXXX"
   - API call count: "Total API Calls: X"
   - Both in a styled summary box with proper contrast
3. Action buttons row:
   - "🔄 Refresh Data" button (calls loadCostData())
   - "🗑️ Clear History" button (clears all cost data with confirmation)
4. Data table with columns: Date/Time | Cost | Description | Request
5. Table features:
   - Scrollable if many entries (max-height with overflow)
   - Sort by newest first (reverse chronological)
   - Proper styling with alternating row colors
   - Responsive design that fits in window
6. Empty state: "No cost entries recorded yet" message when no data

MANDATORY FUNCTIONALITY:
- loadCostData() function that:
  * Safely accesses window.dataRegistry.getData('cost-history') || []
  * Updates summary (total cost and count)
  * Populates table with formatted data
  * Handles empty data gracefully
  * Includes console.log for debugging
- clearCostHistory() function that:
  * Shows confirmation dialog
  * Calls window.dataRegistry.updateData('cost-history', [])
  * Refreshes display after clearing
- Proper date formatting using toLocaleDateString() and toLocaleTimeString()
- Currency formatting to 4 decimal places: $X.XXXX
- Truncate long prompts to 80 characters with "..." suffix

DATA REGISTRY INTEGRATION:
- CRITICAL: Subscribe to data changes: window.dataRegistry.subscribe('cost-history', loadCostData)
- CRITICAL: This enables automatic refresh when cost data is updated by the system
- CRITICAL: Handle the case where cost-history doesn't exist yet
- DEBUGGING: Add console.log('Cost data loaded:', costs.length, 'entries') in loadCostData()

STYLING REQUIREMENTS:
- Professional, clean design with proper spacing
- Summary box with background color and border
- Styled buttons with hover effects
- Table with header styling and alternating row colors
- Responsive layout that works in 600px width window
- Proper color contrast for light/dark themes
- Use theme-aware CSS classes (.app-light-theme and .app-dark-theme)

ERROR HANDLING:
- Handle missing or corrupted cost data
- Graceful fallback for invalid date formats
- Safe number formatting for cost values
- Proper error messages for user feedback

EXAMPLE IMPLEMENTATION STRUCTURE:

function loadCostData() {
    console.log('Loading cost data from data registry...');
    const costs = window.dataRegistry.getData('cost-history') || [];
    console.log('Cost data loaded:', costs.length, 'entries');
    
    // Calculate totals
    const totalCost = costs.reduce((sum, entry) => sum + (entry.cost || 0), 0);
    const totalCalls = costs.length;
    
    // Update summary display
    updateSummaryDisplay(totalCost, totalCalls);
    
    // Update table
    updateCostTable(costs);
}

function updateSummaryDisplay(totalCost, totalCalls) {
    const totalElement = document.getElementById('{appId}_total-cost');
    const countElement = document.getElementById('{appId}_call-count');
    
    if (totalElement) totalElement.textContent = '$' + totalCost.toFixed(4);
    if (countElement) countElement.textContent = totalCalls.toString();
}

function updateCostTable(costs) {
    const tbody = document.getElementById('{appId}_cost-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (costs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #666;">No cost entries recorded yet.</td></tr>';
        return;
    }
    
    // Sort by newest first
    const sortedCosts = costs.slice().reverse();
    
    sortedCosts.forEach(entry => {
        const row = tbody.insertRow();
        const date = new Date(entry.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        const truncatedPrompt = (entry.prompt || 'N/A').length > 80 ?
            (entry.prompt || 'N/A').substring(0, 80) + '...' :
            (entry.prompt || 'N/A');
        
        row.innerHTML =
            '<td>' + formattedDate + '</td>' +
            '<td style="color: #dc3545; font-weight: bold;">$' + (entry.cost || 0).toFixed(4) + '</td>' +
            '<td>' + (entry.description || 'Unknown') + '</td>' +
            '<td>' + truncatedPrompt + '</td>';
    });
}

function clearCostHistory() {
    if (confirm('Are you sure you want to clear all cost history? This action cannot be undone.')) {
        window.dataRegistry.updateData('cost-history', []);
        console.log('Cost history cleared');
        loadCostData(); // Refresh display
    }
}

MANDATORY INIT FUNCTION:
window[appNamespace].init = function() {
    console.log('Cost Tracking app initialized');
    
    // Load initial data
    loadCostData();
    
    // Subscribe to data changes for real-time updates
    window.dataRegistry.subscribe('cost-history', loadCostData);
    
    // Set up button event listeners
    const refreshBtn = document.getElementById('{appId}_refresh-btn');
    const clearBtn = document.getElementById('{appId}_clear-btn');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadCostData);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCostHistory);
    }
    
    console.log('Cost tracking app fully initialized with data subscription');
};

CRITICAL SUCCESS FACTORS:
1. ALWAYS use window.dataRegistry.getData('cost-history') || [] for safe data access
2. ALWAYS subscribe to data changes for automatic updates
3. ALWAYS handle empty/missing data gracefully
4. ALWAYS include proper error handling and logging
5. ALWAYS use the mandatory init function pattern
6. ALWAYS format currency to 4 decimal places
7. ALWAYS sort entries by newest first`
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
- Footer section with action buttons: "Add Sample Data", "Clear Sample Data", "Export Registry"
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
- Add Sample Data button creates test entries using window.dataRegistry.registerData()
- Clear Sample Data button removes test entries using window.dataRegistry.updateData()
- Export Registry button shows JSON representation of all data
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
- Maintain proper state management for sample data
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