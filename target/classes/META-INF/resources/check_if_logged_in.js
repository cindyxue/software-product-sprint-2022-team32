import {getCurrentPasswordHash,getCurrentUsername} from "./Cookies.js"

export function isLoggedIn(){
    let cookiesExist = getCurrentPasswordHash() && getCurrentUsername();
    return cookiesExist;
} 

export function redirectToLoginIfNotLoggedIn(){
    if (!isLoggedIn()){
        window.location.href = "/";  
    }
}

window.redirectToLoginIfNotLoggedIn = function(){
    redirectToLoginIfNotLoggedIn();
}