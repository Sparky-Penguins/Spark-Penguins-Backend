const fs = require('fs');

// Function to parse CSV and convert it to JSON
function csvToJson(csvFilePath) {
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  // Split the CSV data by newlines
  const lines = csvData.split('\n');
  
  // Get the header (first line)
  const header = lines[0].split(',').map(col => col.trim());
  console.log(header)
  console.log(lines[0])
  // Initialize an array to store the rows as objects
  const result = [];
  
  // Loop through each data row (excluding the header)
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(col => col.trim());
    
    // Only process rows with valid data
    if (row.length === header.length) {
      const rowObject = {};
      header.forEach((key, index) => {
        rowObject[key] = row[index];
      });
      result.push(rowObject);
    }
  }

  // Return the result as JSON
  return JSON.stringify(result, null, 2);
}

// Example usage
const csvFilePath = 'Products.csv';
const jsonOutput = csvToJson(csvFilePath);

// Output the JSON to a file
fs.writeFileSync('output.json', jsonOutput, 'utf-8');
console.log('CSV converted to JSON and saved as output.json');