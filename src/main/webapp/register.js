import {register,login} from "../api/Datastore-API.js";
import {storeLoginSession} from "./Cookies.js"

const clickBtn = document.getElementById("register-button")

function handleRegisterError(e){
    alert("Registration failed: " + e);


}

async function handleRegister(){
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

    const response = await register(username, password, email, firstName, middleName, lastName);
    console.log(await response);

    if (await response.error) {
        handleRegisterError(response.error);
        return;
    }

    alert("Registration successful!");

    const user = await login(username,password);

    console.log(user);

    // Store data
    storeLoginSession(username,await user.success.passwordHash);

    window.location.href = "/debugger.html";
};

clickBtn.addEventListener('click', e =>{
    e.preventDefault();
    e.stopPropagation();
    handleRegister();
})