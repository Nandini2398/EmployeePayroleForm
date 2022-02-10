let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" +date.getSeconds() + "Secs";
    }

function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType+" State Changed Called at: " + showTime()+" RS:"+
                    xhr.readystate+" Status:"+xhr.status);
        if (xhr.readyState === 4){            
            if (xhr.status === 200 || xhr.status ===201){
                callback(xhr.responseText);
            } else if (xhr.status >= 400) { 
            console.log("Handle 400 Client Error or 5000 Server Error");

        }          
    }                
    xhr.open(methodType, url, async);
    xhr.send();
    console.log(methodType+" request sent to the server at: "showTime());
}

const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data: " + showTime() + " data: " +data)
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to server at "+showTime);
