// Test script for Google Apps Script form submission
// Run this in browser console after replacing YOUR_WEB_APP_URL with your actual script URL

function testFormSubmission() {
  const scriptUrl = "YOUR_WEB_APP_URL"; // Replace with your actual web app URL
  
  const testData = {
    name: "Test User",
    email: "test@example.com",
    description: "This is a test submission from the browser console"
  };
  
  console.log("Sending test submission to:", scriptUrl);
  console.log("With data:", testData);
  
  fetch(scriptUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  })
  .then(response => response.text())
  .then(data => {
    console.log("Server response:", data);
    console.log("Test completed successfully!");
  })
  .catch(error => {
    console.error("Error during test:", error);
  });
}

// To run the test, call testFormSubmission() in the browser console 