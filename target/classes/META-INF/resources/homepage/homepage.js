import {getCurrentUsername} from "../Cookies.js"
import {updateText} from "../updateText.js";

window.onLoad = async function(){
    const currentUsername = getCurrentUsername();

    updateText("Hello, " + currentUsername + "!","greeter");
};