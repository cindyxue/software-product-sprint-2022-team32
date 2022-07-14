import {getUser,getUserCalendar,getUserJournal,getUserPanicButton,addDayToCalendar,addEntryToJournal,addOneToPanicButton,deleteCurrentUser} from "../api/Datastore-API.js";
import {getCurrentUsername,getCurrentPasswordHash,deleteCookie} from "./Cookies.js"
import {updateText} from "./updateText.js";

window.onLoad = async function(){
    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    updateText("Hello, " + currentUsername + "!","greeter");

    updateText(JSON.stringify(await getUserCalendar(currentUsername,currentPasswordHash)),"my-calendar");

    updateText(JSON.stringify(await getUserJournal(currentUsername,currentPasswordHash)),"my-journal");

    updateText(await getUserPanicButton(currentUsername,currentPasswordHash),"my-panic-button");

    updateText(JSON.stringify(await getUser(currentUsername,currentPasswordHash)),"my-info");
};

window.addToCalendar = async function addToCalendar(){

    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    console.log("Data:",currentUsername,currentPasswordHash);

    const date = document.getElementById("day-date").value;

    const mood = document.getElementById("day-mood").value;

    console.log("Input day:",date,mood);

    const response = await addDayToCalendar(currentUsername, currentPasswordHash, date, mood);

    console.log(await response);
    if (await response.error) {
        alert("addToCalendar failed: " + response.error);
    }
    else{
        updateText(JSON.stringify(await getUserCalendar(currentUsername,currentPasswordHash)),"my-calendar");
        updateText(JSON.stringify(await getUser(currentUsername,currentPasswordHash)),"my-info");
    }

};

window.addToJournal = async function addToJournal(){
    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    console.log("Data:",currentUsername,currentPasswordHash);

    const date = document.getElementById("entry-date").value;

    const entry = document.getElementById("journal-entry").value;

    console.log("New entry:", date, entry);

    const response = await addEntryToJournal(currentUsername, currentPasswordHash, entry, date);

    console.log(await response);
    if (await response.error) {
        alert("addToJournal failed: " + response.error);
    }
    else{
        updateText(JSON.stringify(await getUserJournal(currentUsername,currentPasswordHash)),"my-journal");
        updateText(JSON.stringify(await getUser(currentUsername,currentPasswordHash)),"my-info");
        
    }
};

window.updatePanicButton = async function updatePanicButton(){
    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    const response = await addOneToPanicButton(currentUsername, currentPasswordHash);

    console.log(await response);
    if (await response.error) {
        alert("addOneToPanicButton failed: " + response.error);
    }
    else{
        updateText(await getUserPanicButton(currentUsername,currentPasswordHash),"my-panic-button");
    }
};

window.logout = function logout(){
    deleteCookie("username");
    deleteCookie("passwordHash");
    window.location.href = "/login.html";    
};

window.userDelete = async function userDelete(){

    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    const response = await deleteCurrentUser(currentUsername,currentPasswordHash);

    console.log(await response);
    if (await response.error) {
        alert("delete failed: " + response.error);
    }
    else{
        alert(response.success);
        deleteCookie("username");
        deleteCookie("passwordHash");
        window.location.href = "/login.html";    
    }
};