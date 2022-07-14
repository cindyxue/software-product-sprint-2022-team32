import {redirectToLoginIfNotLoggedIn} from "./check_if_logged_in-js";

window.onLoad = function(){
    redirectToLoginIfNotLoggedIn();
}