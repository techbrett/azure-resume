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
        return response.json()
    })
    .then(response => {
        console.log("Response received", response); // Debug message
        return response.json();
        count = response; document.getElementById('counter').innerText = count;
    }).catch(function(error) {
        console.log("Error:", error); // Debug message
    });
    console.log("Returning count:", count); // Debug message
    return count;
}
