import {login, register} from "./Datastore-API.js";
import {setCookie} from "./Cookies.js"

function storeLoginSession(username,passwordHash){
    // Store username and password hash as cookies.
    setCookie("username",username,2);
    setCookie("passwordHash",passwordHash,2);
}

window.handleRegister = async function handleRegister(){
    console.log("Form submitted.")
    // Get data from form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const middleName = document.getElementById("middleName").value;
    const lastName = document.getElementById("lastName").value;

    // Check if passwords match
    if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        return;
    }

    console.log(username, password, email, firstName, middleName, lastName)

    // Encrypt the password, for debugging purposes its not being yet implemented.
    const passwordHash = password;

    const response = await register(username, passwordHash, email, firstName, middleName, lastName);
    console.log(await response);

    if (await response.error) {
        alert("Registration failed: " + response.error);
    }
    else{
        alert("Registration successful!");

        // Store data
        storeLoginSession(username,passwordHash)

        window.location.href = "/debugger.html";
    }
    
};

window.handleLogin = async function handleLogin(){
    // Get data from form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(username, password)

    // Encrypt the password, for debugging purposes its not being yet implemented.
    const passwordHash = password;

    const response = await login(username, passwordHash);
    console.log(await response)

    if (await response.error) {
        alert("Login failed: " + response.error);
        return;
    }
    else{
        alert("Login successful!");

        // Store data
        storeLoginSession(username,passwordHash)

        window.location.href = "/debugger.html";        
    }
    
};
