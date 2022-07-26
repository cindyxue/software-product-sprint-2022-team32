import {getCurrentUsername,getCurrentPasswordHash} from "../Cookies.js"
import {updateText} from "../updateText.js";
import {redirectToLoginIfNotLoggedIn} from "../../check_if_logged_in.js"
import {getQuote} from "./components/quote.js"
import {addOneToPanicButton} from "../api/Datastore-API.js"

//loads the user's name to add it as a greeter
window.onLoad = async function(){
    getQuote();
    redirectToLoginIfNotLoggedIn();
    const currentUsername = getCurrentUsername();
    updateText("Hello, " + currentUsername + "!","greeter");
};

let popup = document.getElementById("popup");

window.openPopup = function openPopup(){
    popup.classList.add("open-popup");
}

let popup2= document.getElementById("popup2");

window.openPopupTwo = function openPopupTwo(){
    popup.classList.remove("open-popup");
    popup2.classList.add("open-popup");
}

window.closePopupTwo = function closePopupTwo(){
    popup2.classList.remove("open-popup");
}

window.handlePopUpMaps = async function(){
    await addOneToPanicButton(getCurrentUsername(), getCurrentPasswordHash());
    window.location.href ='/maps/maps.html';
}

window.handlePopUpChat = async function(){
    await addOneToPanicButton(getCurrentUsername(), getCurrentPasswordHash());
    window.location.href = '/chat/chat.html';
}