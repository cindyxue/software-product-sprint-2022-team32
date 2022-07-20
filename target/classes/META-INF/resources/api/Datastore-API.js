// Module to handle the Datastore API - java servlets

export async function login(username, unhashedPassword){
    /*
    String username, String unhashedPassword
    Returns a json, either json.error or json.success.
    Json.success contains the user matching the username and password credentials.
    */
    
    const payload = {
        username: username, passwordHash: unhashedPassword
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

export async function register(username, unhashedPassword, email, firstName, middleName, lastName){
    /*
    String username, String unhashedPassword, String email, String firstName, String middleName, String lastName
    Returns a json, either json.error or json.success.
    Registers a new user if the username and email are not already in the database.
    */

    const payload = {
        username: username, passwordHash: unhashedPassword, email: email, firstName: firstName, middleName: middleName, lastName: lastName
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

export async function getUser(username, hashedPassword){
    /*
    String username, String hashedPassword
    If the username and passwordHash credentials are valid, returns a json matching the user defined in the database.
    If not, alerts: alert("Something Went Wrong: " + response.error);
    */

    const payload = {
        username: username, passwordHash: hashedPassword
    }
    
    const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const jsonResponse = await response.json();
    if (await jsonResponse.error) {
        alert("Something Went Wrong: " + jsonResponse.error);
    }
    else{
        const user = jsonResponse.success;
        return user;
    }
}

export async function deleteCurrentUser(username, hashedPassword){
    /*
    String username, String hashedPassword
    Returns a json, either json.error or json.success.
    Deletes the user matching the username and passwordHash credentials.
    */

    const payload = {
        username: username, passwordHash: hashedPassword
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

export async function addDayToCalendar(username, hashedPassword, date, mood) {
    /*
    String username, String hashedPassword, String date ("yyyy-mm-dd"), Int mood
    Returns a json, either json.error or json.success.
    Adds the given day to the calend
    */
    
    const user = await getUser(username, hashedPassword);
    console.log("Retrieved user:", await user);

    const timestamp = new Date(date) * 1;

    const day = {
        date: timestamp,
        mood: mood
    }

    await user.calendar.push(day);

    const prevEmail = await user.email;

    const json = await updateUser(username, hashedPassword, prevEmail, user);

    return json;
}

export async function addEntryToJournal(username, hashedPassword, message, date) {
    /*
    String username, String hashedPassword, String message, String date ("yyyy-mm-dd")
    Returns a json, either json.error or json.success.
    Adds the given entry to the journal of the user matching the username and hashedPassword credentials.
    entry: { timestamp:long, message:string }
    */
    
    const user = await getUser(username, hashedPassword);

    const prevEmail = user.email;

    const timestamp = new Date(date) * 1;

    console.log("Retrieved user:", user);

    const entry = {
        date: timestamp,
        message: message
    }

    user.journal.push(entry);

    const json = await updateUser(username, hashedPassword, prevEmail, user);

    return json;
}

export async function addOneToPanicButton(username, hashedPassword){
    /*
    String username, String hashedPassword
    Returns a json, either json.error or json.success.
    Adds 1 to the panic button counter of the user matching the username and hashedPassword credentials.
    */

    const user = await getUser(username, hashedPassword);

    const prevEmail = await user.email;

    console.log("Retrieved user:", await user);
    user.panicButtonPressed = await user.panicButtonPressed+1;

    console.log("Added one to panic button:",await user)

    const json = await updateUser(username, hashedPassword, prevEmail, user);

    return json;
    
}

export async function updateUser(username, hashedPassword, prevEmail, user){
    /*
        String username, String hashedPassword, String prevEmail, 
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
    prevPasswordHash: hashedPassword, 
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

export async function getUserCalendar(username, hashedPassword){
    /*
    String username, String hashedPassword
    Returns the calendar(array[day]) of the user matching the username and password.
    */

    const user = await getUser(username, hashedPassword);
    
    return user.calendar;
}

export async function  getUserJournal(username, hashedPassword){
    /*
    String username, String hashedPassword
    Returns the journal(array[entry: {timestamp: long, message: string}]) of the user matching the username and password.
    */

    const user = await getUser(username, hashedPassword);
    
    return user.journal;
}

export async function getUserPanicButton(username, hashedPassword){
    /*
    String username, String hashedPassword
    Returns the panic button counter(int) of the user matching the username and password.
    */

    const user = await getUser(username, hashedPassword);
    
    return user.panicButtonPressed;
}

export async function queryJournalEntries(username, hashedPassword, startingDate, endingDate){
    /*
    String username, String hashedPassword, String startingDate ("yyyy-mm-dd"), String endingDate ("yyyy-mm-dd")
    Returns the journal(array[entry: {timestamp: long, message: string}]) of the user matching the username and password.
    */

    const startingTimestamp = new Date(startingDate) * 1;
    const endingTimestamp = new Date(endingDate) * 1;

    const payload = {
        username: username,
        passwordHash: hashedPassword,
        startingTimestamp: startingTimestamp,
        endingTimestamp: endingTimestamp
    }

        const response = await fetch('/api/query-journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const json = await response.json();

        if (await response.error) {
            alert("query failed: " + response.error);
        }
        else{ 
            return json.success;
        }

    
}