import {getCurrentUsername} from "../Cookies"
import {updateText} from "../updateText.js";

window.onLoad = async function(){
    const currentUsername = getCurrentUsername();

    updateText("Hello, " + currentUsername + "!","greeter");
};