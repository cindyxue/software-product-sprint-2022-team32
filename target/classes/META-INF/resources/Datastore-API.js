// Module to handle the Datastore API - java servlets

export async function login(username, passwordHash){
    /*
    String username, String passwordHash
    Returns a json, either json.error or json.success.
    Json.success contains the user matching the username and passwordHash credentials.
    */
    
    const payload = {
        username: username, passwordHash: passwordHash
    }
    
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const json = await response.json();

    return json;
}

export async function deleteCurrentUser(username, passwordHash){
    /*
    String username, String passwordHash
    Returns a json, either json.error or json.success.
    Deletes the user matching the username and passwordHash credentials.
    */

    const payload = {
        username: username, passwordHash: passwordHash
    }
    
    const response = await fetch('/api/delete-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const json = await response.json();

    return json;
}

export async function register(username, passwordHash, email, firstName, middleName, lastName){
    /*
    String username, String passwordHash, String email, String firstName, String middleName, String lastName
    Returns a json, either json.error or json.success.
    Registers a new user if the username and email are not already in the database.
    */

    const payload = {
        username: username, passwordHash: passwordHash, email: email, firstName: firstName, middleName: middleName, lastName: lastName
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const json = await response.json();

    return json;
}

export async function getUser(username, passwordHash){
    /*
    String username, String passwordHash
    If the username and passwordHash credentials are valid, returns a json matching the user defined in the database.
    If not, alerts: alert("Something Went Wrong: " + response.error);
    */
   
    const jsonResponse = await login(username, passwordHash);
    if (await jsonResponse.error) {
        alert("Something Went Wrong: " + response.error);
    }
    else{
        const user = jsonResponse.success;
        return user;
    }
}

export async function addDayToCalendar(username, passwordHash, day) {
    /*
    String username, String passwordHash, Day:{date:long(timestamp),mood:int} day
    Returns a json, either json.error or json.success.
    Adds the given day to the calend
    */
    
    const user = await getUser(username, passwordHash);
    console.log("Retrieved user:", await user);
    await user.calendar.push(day);

    const prevEmail = await user.email;

    const json = await updateUser(username, passwordHash, prevEmail, user);

    return json;
}

export async function addEntryToJournal(username, passwordHash, entry) {
    /*
    String username, String passwordHash, String entry
    Returns a json, either json.error or json.success.
    Adds the given entry to the journal of the user matching the username and passwordHash credentials.
    */
    
    const user = await getUser(username, passwordHash);

    const prevEmail = user.email;

    console.log("Retrieved user:", user);
    user.journal.push(entry);

    const json = await updateUser(username, passwordHash, prevEmail, user);

    return json;
}

export async function addOneToPanicButton(username, passwordHash){
    /*
    String username, String passwordHash
    Returns a json, either json.error or json.success.
    Adds 1 to the panic button counter of the user matching the username and passwordHash credentials.
    */

    const user = await getUser(username, passwordHash);

    const prevEmail = await user.email;

    console.log("Retrieved user:", await user);
    user.panicButtonPressed = await user.panicButtonPressed+1;

    console.log("Added one to panic button:",await user)

    const json = await updateUser(username, passwordHash, prevEmail, user);

    return json;
    
}

export async function updateUser(username, passwordHash, prevEmail, user){
    /*
        String username, String passwordHash, String prevEmail, 
        User: {
        username: string,
        passwordHash: string,
        calendar: array[day],
        firstName: string,
        middleName: string,
        lastName: string,
        panicButtonPressed: int, 
        journal: array[string]
        } user
        Returns a json, either json.error or json.success.
        Updates the user matching the username and password, the new user data is the data from the user parameter.
    */

   const payload = {
    user: user, 
    prevUsername: username, 
    prevPasswordHash: passwordHash, 
    prevEmail: prevEmail
    }

    console.log("Payload (Update User):",payload)
    
    const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    const json = await response.json();

    return json;
}

export async function getUserCalendar(username, passwordHash){
    /*
    String username, String passwordHash
    Returns the calendar of the user matching the username and password.
    */

    const user = await getUser(username, passwordHash);
    
    return user.calendar;
}

export async function  getUserJournal(username, passwordHash){
    /*
    String username, String passwordHash
    Returns the journal of the user matching the username and password.
    */

    const user = await getUser(username, passwordHash);
    
    return user.journal;
}

export async function getUserPanicButton(username, passwordHash){
    /*
    String username, String passwordHash
    Returns the panic button counter of the user matching the username and password.
    */

    const user = await getUser(username, passwordHash);
    
    return user.panicButtonPressed;
}