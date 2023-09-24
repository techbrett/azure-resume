window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});


const localApi = 'http://localhost:7071/api/UpdateVisitorCount';
const functionApi = 'https://pythoncounter.azurewebsites.net/api/UpdateVisitorCount?code=CV2o1cNOLDRT-jtkF5p_DcOpQe-jpO6vi-_QKBOjul6_AzFul9thKQ=='; 

const getVisitCount = () => {
    let count = 0;
    fetch(functionApi)
    .then(response => {
        return response.json()
    })
    .then(response => {
        console.log("Website called function API.");
        count = response.count;
        document.getElementById('counter').innerText = count;
    }).catch(function(error) {
        console.log(error);
      });
    return count;
}