import {getCurrentUsername} from "../Cookies.js"
import {updateText} from "../updateText.js";

window.onLoad = async function(){
    const currentUsername = getCurrentUsername();

    updateText("Hello, " + currentUsername + "!","greeter");
};

let popup = document.getElementById("popup");

function openPopup(){
    popup.classList.add("open-popup");
}

let popup2= document.getElementById("popup2");

function openPopupTwo(){
    popup.classList.remove("open-popup");
    popup2.classList.add("open-popup");
}

function closePopupTwo(){
    popup2.classList.remove("open-popup");
}