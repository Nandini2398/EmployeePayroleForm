let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType, url, callback, async = true, data = null){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log(methodType+" State Changed Called. Ready State: "+ 
                        xhr.readyState+" Status:"xhr.status);
            if (xhr.readyState === 4){
                if (xhr.status === 200 || xhr.status ===201){
                    callback(xhr.responseText);
                 } else if (xhr.status >= 400) {
                 console.log("Handle 400 Client Error or 5000 Server Error");

                }
            }            
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "apllication/json");
            xhr.send(JSON.stringify(data));
         }
        console.log(methodType+" request sent to the server");
}
const gerURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data: "+data)
}
makeAJAXCall("Get", getURL, getUserDetails);

const deleteURL = "http://localhost:3000/employees/4";
function userDeleted(data){
    console.log("user Delrted "+data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Prudhvi", "salary": "5000"};
function userAdded(data){
        console.log("user Added: "+data)
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);