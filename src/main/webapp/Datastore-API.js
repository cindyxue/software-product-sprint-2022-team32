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

export async function addDayToUser(username, passwordHash, day) {
    // Day as json object -> {date: long, mood: byte}
    
    // Post method: /api/add-day-to-user
    // Parameters: username, password, day
    // Returns: success or error
    
    const payload = {
        username: username, password: passwordHash, day: day
    }

    const response = await fetch('/api/add-day-to-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const json = await response.json();

    return json;
}
