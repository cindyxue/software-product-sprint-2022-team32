import {getCurrentUsername} from "../Cookies.js"
import {updateText} from "../updateText.js";
import {redirectToLoginIfNotLoggedIn} from "../../check_if_logged_in.js"
import {getQuote} from "./components/quote.js"

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