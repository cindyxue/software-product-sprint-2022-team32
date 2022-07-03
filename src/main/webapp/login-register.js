import {login, register} from "Datastore-API";

export function handleRegister(){
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

    response = register(username, password, email, firstName, middleName, lastName);

    if (response.success) {
        alert("Registration successful!");
        window.location.href = "/debugger.html";
    }
    else {
        alert("Registration failed: " + response.error);
    }

}

export function handleLogin(){
    // Get data from form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    response = login(username, password);

    if (response.success) {
        alert("Login successful!");
        window.location.href = "/debugger.html";
    }
    else {
        alert("Login failed: " + response.error);
    }
}
