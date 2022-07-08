// Module to Handle Cookies

export function storeLoginSession(username,passwordHash){
    // Store username and password hash as cookies.
    setCookie("username",username,2);
    setCookie("passwordHash",passwordHash,2);
}

// Set a Cookie
export function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

// Get a Cookie with a given name
export function getCookieValue(name){
    const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
    console.log("Cookie Retrieved:",value);
    return value;
}

export function getCurrentUsername(){
    return getCookieValue("username");
}

export function getCurrentPasswordHash(){
    return getCookieValue("passwordHash");
}

// Delete a cookie
export function deleteCookie(cName) {
    document.cookie = cName + "=; Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}