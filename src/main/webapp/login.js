import {login} from "../api/Datastore-API.js";
import {storeLoginSession} from "./Cookies.js"

const clickBtn = document.getElementById("login-button")



async function handleLogin(){
    // Get data from form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate data
    if(username == ""){
        // Change class of input to red
        alert("Username is required");
        document.getElementById("username").classList.add("is-invalid");
        return;
    }

    console.log(username, password)

    // Encrypt the password, for debugging purposes its not being yet implemented.
    const passwordHash = password;

    const response = await login(username, passwordHash);
    console.log(await response)

    if (await response.error) {
        alert("Login failed: " + response.error);
        return;
    }
    
    alert("Login successful!");

    // Store data
    storeLoginSession(username,passwordHash)

    window.location.href = "/debugger.html";        
    
    
};

clickBtn.addEventListener('click', e =>{
    e.preventDefault();
    e.stopPropagation();
    handleLogin();
})
