import {register,login} from "../api/Datastore-API.js";
import {storeLoginSession} from "./Cookies.js"
import {updateText} from "./updateText.js";

const usernameField = document.getElementById("username").value;
const passwordField = document.getElementById("password").value;
const passwordConfirmField = document.getElementById("passwordConfirm").value;
const emailField = document.getElementById("email").value;
const firstNameField = document.getElementById("firstName").value;
const middleNameField = document.getElementById("middleName").value;
const lastNameField = document.getElementById("lastName").value;

const clickBtn = document.getElementById("register-button")

function handleError(txt){
    cleanErrors();
    updateText(txt,"errorField")
    if (txt === "Invalid username."){
        userField.classList.add("invalid-field");
        return;
    }
    if (txt === "Invalid password."){
        passwordField.classList.add("invalid-field");
        return;
    }    
    userField.classList.add("invalid-field");
    passwordField.classList.add("invalid-field");
}

function cleanErrors(){
    userField.classList.remove("invalid-field");
    passwordField.classList.remove("invalid-field");
    updateText("","errorField")
}

function cleanError(fieldName){
    document.getElementById(fieldName).classList.remove("invalid-field");
}

function validateData(username, password){
    let isValid = true;
    // Validate data
    if(username == ""){
        // Change class of input to red
        userField.classList.add("invalid-field");
        isValid = false;
    }
    if(password == ""){
        // Change class of input to red
        passwordField.classList.add("invalid-field");
        isValid = false;
    }
    if (!isValid){
        updateText("Please fill all required fields.","errorField")
    }


    // Check if passwords match
    if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        return;
    }

    return isValid;
}

async function handleRegister(){
    console.log("Form submitted.")
    // Get data from form
    const username = usernameField.value;
    const password = passwordField.value;
    const passwordConfirm = passwordConfirmField.value;
    const email = emailField.value;
    const firstName = firstNameField.value;
    const middleName = middleNameField.value;
    const lastName = lastNameField.value;

    validateData(username,password,passwordConfirm,email,firstName,middleName,lastName);

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