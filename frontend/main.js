// Wrap your code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    getVisitCount();
});

const localApi = 'http://localhost:7071/api/UpdateVisitorCount';
const functionApi = 'https://pythoncounter.azurewebsites.net/api/UpdateVisitorCount?code=CV2o1cNOLDRT-jtkF5p_DcOpQe-jpO6vi-_QKBOjul6_AzFul9thKQ==';

const getVisitCount = () => {
    let count = 0;
    console.log("Before fetch"); // Debug message
    fetch(functionApi)
    .then(response => {
        console.log("After fetch"); // Debug message
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Parse response as text
    })
    .then(responseText => {
        console.log("Response received"); // Debug message
        count = parseInt(responseText); // Convert response text to integer
        if (!isNaN(count)) {
            document.getElementById('counter').innerText = count;
        } else {
            console.error("Invalid response: Count is not a number.");
        }
    })
    .catch(function(error) {
        console.error("Error:", error); // Debug message
    });
    console.log("Returning count:", count); // Debug message
    return count;
}
