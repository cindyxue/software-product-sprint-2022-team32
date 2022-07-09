import {login} from "../api/Datastore-API.js";
import {storeLoginSession} from "./Cookies.js";
import {updateText} from "./updateText.js";

const clickBtn = document.getElementById("login-button");
const userField = document.getElementById("username");
const passwordField = document.getElementById("password");


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
    updateText("","errorField");
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
    return isValid;
}

async function handleLogin(){
    // Get data from form
    const username = userField.value;
    const password = passwordField.value;
    if (!validateData(username, password)){
        return;
    }
    const response = await login(username, password);
    if (await response.error) {
        handleError(response.error);
        return;
    }
    // Store data
    storeLoginSession(username,await response.success.passwordHash)
    window.location.href = "/debugger.html";        
};

clickBtn.addEventListener('click', e =>{
    e.preventDefault();
    e.stopPropagation();
    handleLogin();
});

['change','input'].forEach(  function(evt) {
    userField.addEventListener(evt,e=>{
        cleanError("username");
    });
    passwordField.addEventListener(evt,e=>{
        cleanError("password");
    });
});
