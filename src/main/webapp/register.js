import {register,login} from "./api/Datastore-API.js";
import {storeLoginSession} from "../Cookies.js"
import {updateText} from "./updateText.js";
import { shakeAnimation } from "./shake.js";

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const passwordConfirmField = document.getElementById("passwordConfirm");
const emailField = document.getElementById("email");
const firstNameField = document.getElementById("firstName");
const middleNameField = document.getElementById("middleName");
const lastNameField = document.getElementById("lastName");

const allFields = ["username","password","passwordConfirm","email","firstName","middleName","lastName"];

const clickBtn = document.getElementById("register-button")

function handleError(txt){
    cleanErrors();
    updateText(txt,"errorField")
    if (txt === "Username already taken."){
        usernameField.classList.add("invalid-field");
        return;
    }
    if (txt === "Email already taken."){
        emailField.classList.add("invalid-field");
        return;
    }    
    allFields.forEach(field => {
        document.getElementById(field).classList.add("invalid-field");
    }
    );
}

function cleanErrors(){
    allFields.forEach(field => {
        document.getElementById(field).classList.remove("invalid-field");
    }
    );
    updateText("","errorField")
}
function cleanError(fieldName){
    document.getElementById(fieldName).classList.remove("invalid-field");
    updateText("","errorField");
}
function validateData(){
    let isValid = true;
    // Validate data
    allFields.forEach(field => {
        if(document.getElementById(field).value == "" && field != "middleName"){
            // Change class of input to red
            document.getElementById(field).classList.add("invalid-field");
            isValid = false;
        }
    }
    );
    if (!isValid){
        updateText("Please fill all required fields.","errorField")
        return false;
    }
    return true;
}

async function handleRegister(){
    // Get data from form
    const username = usernameField.value;
    const password = passwordField.value;
    const email = emailField.value;
    const firstName = firstNameField.value;
    const middleName = middleNameField.value;
    const lastName = lastNameField.value;
    // Check that there are not invalid fields
    const invalidFields = document.getElementsByClassName("invalid-field");
    if (invalidFields.length > 0){
        shakeAnimation(invalidFields);
        return;
    }
    if (!validateData()){
        return;
    }
    const response = await register(username, password, email, firstName, middleName, lastName);
    if (await response.error) {
        handleError(response.error);
        return;
    }
    const user = await login(username,password);
    // Store data
    storeLoginSession(username,await user.success.passwordHash);
    window.location.href = "/homepage/homepage.html";
};

clickBtn.addEventListener('click', e =>{
    e.preventDefault();
    e.stopPropagation();
    handleRegister();
})


function validateStrongPassword(){
    // Validate strong password
    if (passwordField.value.length < 8){
        passwordField.classList.add("invalid-field");
        updateText("Password must be at least 8 characters long.","errorField");
        return false;
    }
    if (passwordField.value.length > 20){
        passwordField.classList.add("invalid-field");
        updateText("Password must be less than 20 characters long.","errorField");
        return false;
    }
    if (!passwordField.value.match(/[a-z]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one lowercase letter.","errorField");
        return false;
    }
    if (!passwordField.value.match(/[A-Z]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one uppercase letter.","errorField");
        return false;
    }
    if (!passwordField.value.match(/[0-9]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one number.","errorField");
        return false;
    }
    if (!passwordField.value.match(/[^a-zA-Z0-9]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one special character.","errorField");
        return false;
    }
    return true;
}


['change','input'].forEach(  function(evt) {
    allFields.forEach(field => {
        document.getElementById(field).addEventListener(evt,e=>{
            cleanError(field);
        }
        );
    });
    passwordField.addEventListener(evt,e=>{
        cleanError("password");
        cleanError("passwordConfirm");
        if (!validateStrongPassword()){
            return;
        }
        // Check if passwords match
        if (passwordField.value != passwordConfirmField.value && passwordConfirmField.value != ""){
            passwordConfirmField.classList.add("invalid-field");
            updateText("Passwords do not match.","errorField")
            return;
        }
    });
    passwordConfirmField.addEventListener(evt,e=>{
        cleanError("passwordConfirm");
        // Check if passwords match
        if (passwordField.value != passwordConfirmField.value && passwordConfirmField.value != "" && validateStrongPassword()){
            passwordConfirmField.classList.add("invalid-field");
            updateText("Passwords do not match.","errorField")
            return;
        }
    });
    emailField.addEventListener(evt,e=>{
        cleanError("email");
        // Validate email
        if (!emailField.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            emailField.classList.add("invalid-field");
            updateText("Invalid email.","errorField");
            return;
        }
    });
});




