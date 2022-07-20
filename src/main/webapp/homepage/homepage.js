import {getCurrentUsername} from "../Cookies"
import {updateText} from "../updateText.js";

//loads the user's name to add it as a greeter
window.onLoad = async function(){
    const currentUsername = getCurrentUsername();

    updateText("Hello, " + currentUsername + "!","greeter");
};