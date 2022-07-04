// Module to handle the Datastore API - java servlets

export async function login(username, passwordHash){
    // Post method: /api/login
    // Parameters: username, password
    // Returns: success or error
    
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

export async function register(username, passwordHash, email, firstName, middleName, lastName){
    // Post method: /api/register
    // Parameters: username, password, email, firstName, middleName, lastName
    // Returns: success or error
    
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
    // Day as json object -> {date: long, mood: byte}

    // Parameters: username, password, day
    // Returns: success or error
    
    const user = await getUser(username, passwordHash);
    console.log("Retrieved user:", await user);
    await user.calendar.push(day);

    const prevEmail = await user.email;

    const json = await updateUser(username, passwordHash, prevEmail, user);

    return json;
}

export async function addEntryToJournal(username, passwordHash, entry) {
    // Entry as an string
    
    // Parameters: username, password, entry
    // Returns: success or error
    
    const user = await getUser(username, passwordHash);

    const prevEmail = user.email;

    console.log("Retrieved user:", user);
    user.journal.push(entry);

    const json = await updateUser(username, passwordHash, prevEmail, user);

    return json;
}

export async function addOneToPanicButton(username, passwordHash){
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
        Update User Call
        /api/update-user
        Post Method, takes the following arguments as the payload:
        {user : User,
        prevUsername : String,
        prevPasswordHash : String}
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
    const user = await getUser(username, passwordHash);
    
    return user.calendar;
}

export async function  getUserJournal(username, passwordHash){
    const user = await getUser(username, passwordHash);
    
    return user.journal;
}

export async function getUserPanicButton(username, passwordHash){
    const user = await getUser(username, passwordHash);
    
    return user.panicButtonPressed;
}