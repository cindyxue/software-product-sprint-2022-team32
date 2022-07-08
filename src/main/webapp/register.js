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

const allFields = ["username","password","passwordConfirm","email","firstName","middleName","lastName"];

const clickBtn = document.getElementById("register-button")

function handleError(txt){
    cleanErrors();
    updateText(txt,"errorField")
    if (txt === "Username already taken."){
        userField.classList.add("invalid-field");
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
}

function validateData(password, passwordConfirm){
    let isValid = true;
    // Validate data
    allFields.forEach(field => {
        if(document.getElementById(field).value === "" && field !== "middleName"){
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
    console.log("Form submitted.")
    // Get data from form
    const username = usernameField.value;
    const password = passwordField.value;
    const passwordConfirm = passwordConfirmField.value;
    const email = emailField.value;
    const firstName = firstNameField.value;
    const middleName = middleNameField.value;
    const lastName = lastNameField.value;

    validateData(password, passwordConfirm);

    const response = await register(username, password, email, firstName, middleName, lastName);

    if (await response.error) {
        handleError(response.error);
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

allFields.forEach(field => {
    document.getElementById(field).addEventListener('input',e=>{
        cleanError(field);
    }
    );
}
);

passwordField.addEventListener('input',e=>{
    // Check if passwords match
    if (passwordField.value !== passwordConfirmField.value && passwordConfirmField.value !== ""){
        passwordConfirmField.classList.add("invalid-field");
        updateText("Passwords do not match.","errorField")
        return;
    }
    
    // Validate strong password
    if (passwordField.value.length < 8){
        passwordField.classList.add("invalid-field");
        updateText("Password must be at least 8 characters long.","errorField");
        return;
    }
    if (passwordField.value.length > 20){
        passwordField.classList.add("invalid-field");
        updateText("Password must be less than 20 characters long.","errorField");
        return;
    }
    if (!passwordField.value.match(/[a-z]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one lowercase letter.","errorField");
        return;
    }
    if (!passwordField.value.match(/[A-Z]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one uppercase letter.","errorField");
        return;
    }
    if (!passwordField.value.match(/[0-9]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one number.","errorField");
        return;
    }
    if (!passwordField.value.match(/[^a-zA-Z0-9]/)){
        passwordField.classList.add("invalid-field");
        updateText("Password must contain at least one special character.","errorField");
        return;
    }
}
)

emailField.addEventListener('input',e=>{
    // Validate email
    if (!emailField.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        emailField.classList.add("invalid-field");
        updateText("Invalid email.","errorField");
        return;
    }
}
)

