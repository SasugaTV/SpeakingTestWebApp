// csvUtils.js: Functions for generating and downloading CSV files

// Track filename counts to avoid collisions
const filenameCounters = {};

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects to convert to CSV
 * @param {Array} headers - Optional array of header names
 * @returns {string} CSV string
 */
export function arrayToCSV(data, headers = null) {
  if (!data || !data.length) return '';
  
  // Use provided headers or extract from first object
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create header row
  const headerRow = csvHeaders.join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return csvHeaders.map(header => {
      // Handle values with commas by wrapping in quotes
      const value = item[header] !== undefined ? item[header] : '';
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(',');
  });
  
  // Combine header and data rows
  return [headerRow, ...rows].join('\\n');
}

/**
 * Generate filename with date, class, seat, question info
 * @param {Object} options - Filename options
 * @returns {string} Formatted filename
 */
export function generateFilename({ date, classNumber, seatNumber, questionNumber = null }) {
  const dateStr = date.toISOString().split('T')[0];
  
  if (questionNumber !== null) {
    return `${dateStr}_Class${classNumber}_Seat${seatNumber}_Question${questionNumber}_SpeakingTest.csv`;
  }
  
  return `${dateStr}_Class${classNumber}_Seat${seatNumber}_SpeakingTest.csv`;
}

/**
 * Handle filename collisions by appending (n) if needed
 * @param {string} filename - Original filename
 * @returns {string} Unique filename
 */
export function getUniqueFilename(filename) {
  // Initialize counter if not exists
  if (!filenameCounters[filename]) {
    filenameCounters[filename] = 0;
  }
  
  // Increment counter
  filenameCounters[filename]++;
  
  // If first time, use original filename
  if (filenameCounters[filename] === 1) {
    return filename;
  }
  
  // Otherwise append counter
  const count = filenameCounters[filename];
  const nameParts = filename.split('.');
  const ext = nameParts.pop();
  const baseName = nameParts.join('.');
  
  return `${baseName}(${count}).${ext}`;
}

/**
 * Download CSV data as a file
 * @param {string} csvContent - CSV content to download
 * @param {string} filename - Filename for download
 */
export function downloadCSV(csvContent, filename) {
  // Create unique filename to avoid browser prompts
  const uniqueFilename = getUniqueFilename(filename);
  
  // Create blob with BOM for Excel compatibility
  const BOM = '\uFEFF'; // UTF-8 BOM
  const blob = new Blob([BOM + csvContent], { 
    type: 'text/csv;charset=utf-8;'
  });
  
  // Try using the SaveAs API if available (msSaveBlob for IE/Edge)
  if (window.navigator && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, uniqueFilename);
    return;
  }
  
  // For other browsers, use the download attribute
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set up download properties
  link.href = url;
  link.download = uniqueFilename;
  
  // Force download mimetype
  link.type = 'application/octet-stream';
  
  // Make link invisible
  link.style.position = 'absolute';
  link.style.left = '-9999px';
  
  // Add to DOM, click, and clean up
  document.body.appendChild(link);
  
  // Use a timeout to ensure the browser processes the download
  setTimeout(() => {
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }, 0);
}
