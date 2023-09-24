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
        return response.json() // Parse response as json
    })
    .then(response => {
        console.log("Website called function API."); // Debug message
        count = response.count;

        // Get the last digit of the count
        const lastDigit = count % 10;
        
        // Determine the appropriate suffix based on the last digit
        let suffix;
        switch (lastDigit) {
            case 1:
                suffix = "st";
                break;
            case 2:
                suffix = "nd";
                break;
            case 3:
                suffix = "rd";
                break;
            default:
                suffix = "th";
        }

        document.getElementById('counter').innerText = `${count}${suffix}`;
    }).catch(function(error) {
        console.error("Error:", error); // Debug message
        console.log(error);
    });
    console.log("Returning count:", count); // Debug message
    return count;
}
