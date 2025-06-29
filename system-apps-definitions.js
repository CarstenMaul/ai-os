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
- MANDATORY: Create an init function for app initialization:
  window[appNamespace].init = function() {
    // Put all event listeners and initialization code here
    // This function will be called after the app is loaded into the DOM
    
    // Example keyboard support using the focus-aware key handling API:
    // app.onKey('keydown', function(event) {
    //   if (event.key >= '0' && event.key <= '9') {
    //     // Handle number keys
    //   } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    //     // Handle operator keys
    //   } else if (event.key === 'Enter' || event.key === '=') {
    //     // Handle equals
    //   }
    // });
  };

The calculator must be immediately functional with the exact color scheme and layout specified.`
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
    prompt: `Create a Cost Tracking app that displays API usage costs using the Data Registry system. The app must access cost data through the data registry which contains cost entries with the following structure:

costHistory = [
    {
        timestamp: "2024-01-01T12:00:00.000Z",
        cost: 0.0025,
        description: "App Creation Request",
        prompt: "Create a calculator app..."
    }
]

SPECIFIC REQUIREMENTS:
1. Title: "💰 Cost Tracking"
2. Display total cost at the top in a highlighted summary box
3. Show number of API calls made
4. Display cost history in a table with columns: Date/Time, Cost, Description, Prompt
5. Sort entries by newest first (reverse chronological order)
6. Include a "Clear History" button that clears the cost history data
7. Include a "Load Costs" button that refreshes the data from the data registry
8. Handle empty history with a "No cost entries recorded yet" message
9. Use proper currency formatting ($X.XXXX)
10. Make the table scrollable if there are many entries
11. Truncate long prompts to fit in the table (max 100 characters)

DATA REGISTRY INTEGRATION:
- CRITICAL: Access cost data using window.dataRegistry.getData('cost-history')
- ALWAYS use: const costs = window.dataRegistry.getData('cost-history') || []; to safely access the data
- Calculate total cost: const total = costs.reduce((sum, entry) => sum + entry.cost, 0);
- Format dates using new Date(entry.timestamp).toLocaleDateString() and toLocaleTimeString()
- Clear History button MUST call: window.dataRegistry.updateData('cost-history', [])
- Load Costs button MUST call your local loadCostData() function
- MANDATORY: Create loadCostData() function that refreshes display from data registry
- MANDATORY: Call loadCostData() immediately when app loads AND when 'appShown' event fires
- MANDATORY: Listen for 'appShown' event: document.addEventListener('appShown', loadCostData);
- Handle empty data gracefully with "No cost entries recorded yet" message
- DEBUGGING: Add console.log('Loading cost data:', window.dataRegistry.getData('cost-history')); in loadCostData()
- SUBSCRIBE TO CHANGES: Use window.dataRegistry.subscribe('cost-history', loadCostData) to auto-refresh when data changes
- add proper css styles for any buttons
- add proper css styles for the table and summary section

APP VISIBILITY EVENT:
- The system will dispatch a custom 'appShown' event when the app becomes visible
- Listen for this event: document.addEventListener('appShown', function(event) { if(event.detail.appId === 'your-app-id') loadCostData(); });
- This allows the app to refresh its data when reopened from hidden state
- Always refresh cost data when this event is received

EXAMPLE STRUCTURE:
- Summary section with total cost and call count
- Button row with "Load Costs" and "Clear History" buttons
- Scrollable table with cost entries
- Proper error handling for missing or invalid data

EXAMPLE CODE SNIPPET:
function loadCostData() {
    console.log('Loading cost data from data registry...');
    const costs = window.dataRegistry.getData('cost-history') || [];
    const total = costs.reduce((sum, entry) => sum + entry.cost, 0);
    
    console.log('Found', costs.length, 'cost entries, total:', total);
    
    // Update summary
    const totalElement = document.getElementById('total-cost');
    const countElement = document.getElementById('call-count');
    if (totalElement) totalElement.textContent = '$' + total.toFixed(4);
    if (countElement) countElement.textContent = costs.length;
    
    // Update table
    const tbody = document.getElementById('cost-table-body');
    if (tbody) {
        tbody.innerHTML = '';
        if (costs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">No cost entries recorded yet.</td></tr>';
        } else {
            costs.slice().reverse().forEach(entry => {
                const row = tbody.insertRow();
                const date = new Date(entry.timestamp);
                row.innerHTML = '<td>' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + '</td><td style="color: #dc3545; font-weight: bold;">$' + entry.cost.toFixed(4) + '</td><td>' + entry.description + '</td><td>' + (entry.prompt || 'N/A').substring(0, 100) + '</td>';
            });
        }
    }
}

// MANDATORY: Call loadCostData when app loads and on appShown event
loadCostData();
// Subscribe to data changes for auto-refresh
window.dataRegistry.subscribe('cost-history', loadCostData);
document.addEventListener('appShown', function(event) {
    console.log('App shown event received for:', event.detail.appId);
    loadCostData();
});

MANDATORY: Create an init function for app initialization:
window[appNamespace].init = function() {
  // Put all event listeners and initialization code here
  // This function will be called after the app is loaded into the DOM
  loadCostData(); // Load initial data
  // Subscribe to data changes for auto-refresh
  window.dataRegistry.subscribe('cost-history', loadCostData);
  document.addEventListener('appShown', function(event) {
    console.log('App shown event received for:', event.detail.appId);
    loadCostData();
  });
};`
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