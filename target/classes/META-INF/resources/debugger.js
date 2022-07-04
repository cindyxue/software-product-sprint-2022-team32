import {getUser,getUserCalendar,getUserJournal,getUserPanicButton,addDayToCalendar,addEntryToJournal,addOneToPanicButton} from "./Datastore-API.js";
import {getCurrentUsername,getCurrentPasswordHash} from "./Cookies.js"

function updateText(txt,fieldName){
    var fieldNameElement = document.getElementById(fieldName);
    while(fieldNameElement.childNodes.length >= 1) {
        fieldNameElement.removeChild(fieldNameElement.firstChild);
    }
    fieldNameElement.appendChild(fieldNameElement.ownerDocument.createTextNode(txt));
    console.log(txt);
}

window.onLoad = async function(){
    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    updateText("Hello, " + currentUsername + "!","greeter");

    updateText(JSON.stringify(await getUserCalendar(currentUsername,currentPasswordHash)),"my-calendar");

    updateText(JSON.stringify(await getUserJournal(currentUsername,currentPasswordHash)),"my-journal");

    updateText(await getUserPanicButton(currentUsername,currentPasswordHash),"my-panic-button");

    updateText(JSON.stringify(await getUser(currentUsername,currentPasswordHash)),"my-info");
}

window.addToCalendar = async function addToCalendar(){

    const currentUsername = getCurrentUsername();
    const currentPasswordHash = getCurrentPasswordHash();

    console.log("Data:",currentUsername,currentPasswordHash);

    const d = document.getElementById("day-date").value;

    const date = new Date(d) * 1;

    const mood = document.getElementById("day-mood").value;

    // day = {date: long, mood: byte}
    const day = {
        date: date,
        mood: mood
    }

    console.log("Input day:",day);

    const response = await addDayToCalendar(currentUsername, currentPasswordHash, day);

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

    const entry = document.getElementById("journal-entry").value;

    console.log("New entry:", entry);

    const response = await addEntryToJournal(currentUsername, currentPasswordHash, entry)

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

    const response = await addOneToPanicButton(currentUsername, currentPasswordHash)

    console.log(await response);
    if (await response.error) {
        alert("addOneToPanicButton failed: " + response.error);
    }
    else{
        updateText(await getUserPanicButton(currentUsername,currentPasswordHash),"my-panic-button");
    }
}