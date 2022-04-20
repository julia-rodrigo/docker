console.log("Hi");
console.log('http://localhost:5000/users?pageNr=3&pageSize=4&sortBy=name&sortOrder=asc');

const baseURL = "http://localhost:5000";

async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}

// everytime button pressed, get the api
getapi(baseURL + "/users?pageNr=3&pageSize=5&sortBy=name"); // USING


function getParameters (){
    getParameter('pageNr');
    getParameter('pageSize');
    getParameter('orderBy');
    getParameter('sortOrder');
}

function getParameter ( parameterName ){
    let parameters = new URLSearchParams ( window.location.search );
    console.log(parameters.get( parameterName ));
    console.log("search: " + parameters);
    return parameters.get( parameterName );
}
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<thead><tr>
          <th>ID</th>
          <th>Name</th>
         </tr></thead>`;
    
    // Loop to access all rows 
    tab += '<body>'
    for (let r of data) {
        tab += `<tr> 
            <td>${r.id} </td>
            <td>${r.name}</td>        
        </tr>`;
    }
    tab += '</body>';
    // Setting innerHTML as tab variable
    document.getElementById("employees").innerHTML = tab;
}