import {getUser,getUserCalendar,getUserJournal,getUserPanicButton,addDayToCalendar,addEntryToJournal,addOneToPanicButton,deleteCurrentUser,queryJournalEntries} from "../../api/Datastore-API.js";
import {getCurrentUsername,getCurrentPasswordHash,deleteCookie} from "../../Cookies.js"

const gridContainer = document.getElementById('grid-container');
const createDayMenu = document.querySelector('.dark-menu-bg');
const createDayMenuClose = document.querySelector('.close-menu');
const updateDayMenu = document.querySelector('.dark-update-menu-bg');
const updateDayMenuClose = document.querySelector('.close-update-menu');
const colors = ['mood-one','mood-two','mood-three','mood-four','mood-five']

let currentDay;
let colorSelection = 'unselected-color'; 

//get login info
const currentUsername = getCurrentUsername();
const currentPasswordHash = getCurrentPasswordHash();

async function loadGrid() {
    //get array of days
    const userCal = JSON.parse(await getUserCalendar(currentUsername,currentPasswordHash));
    console.log(userCal)

    //populate the grid by creating each day in the array of days
    for (const day of userCal) {
        const mood = day.mood
        //change to the matching mood color
        colorSelectionToClass(mood)
        //create day
        var newDay = document.createElement('li');
        newDay.classList.add('grid-block');
        changeColor(newDay, colorSelection)
        gridContainer.appendChild(newDay);
    }
}


//takes in an int representing a mood from the database and return the corresponding class
function colorSelectionToClass(moodNum) {
    switch (moodNum) {
        case 1:
            setColor('mood-one')
            break
        case 2:
            setColor('mood-two')
            break
        case 3:
            setColor('mood-three')
            break    
        case 4:
            setColor('mood-four')
            break
        case 5:
            setColor('mood-five')
            break
        default:
            setColor('unselected-color')
            console.log('Color was not selected.');
    }
}

//takes in a string representing a mood and return the corresponding int
function colorSelectionToNum(mood) {
    switch (mood) {
        case 'mood-one':
            return 1
        case 'mood-two':
            return 2
        case 'mood-three':
            return 3 
        case 'mood-four':
            return 4
        case 'mood-five':
            return 5
        default:
            console.log('Could not change mood to num.');
    }
    return 0
}

//closes the day menu
createDayMenuClose.addEventListener("click", function() {
	createDayMenu.style.display = "none";
});

//closes the day update menu
updateDayMenuClose.addEventListener("click", function() {
	updateDayMenu.style.display = "none";
});

//opens the day menu
function openCreateDayMenu(){
    createDayMenu.style.display = "flex";
}

//opens the day update menu
function openUpdateDayMenu(){
    updateDayMenu.style.display = "flex";
}

//closes the day menu
function closeCreateDayMenu(){
    createDayMenu.style.display = "none";
}

//closes the day update menu
function closeUpdateDayMenu(){
    updateDayMenu.style.display = "none";
}

//sets the variable colorSelection to the string color
function setColor(color){
    colorSelection = color
    console.log(colorSelection)
}


//creates a day with color and adds it to the grid
async function createDay() {
    var newDay = document.createElement('li');
    newDay.classList.add('grid-block');
    changeColor(newDay, colorSelection)
    gridContainer.appendChild(newDay);

    //adds the data of teh new day to the database
    const date = document.getElementById("date").value;
    const mood = colorSelectionToNum(colorSelection);
    const calRes = await addDayToCalendar(currentUsername, currentPasswordHash, date, mood);
    const entry = document.getElementById('journal-entry').value
    const journalRes = await addEntryToJournal(currentUsername, currentPasswordHash, entry, date);
    if (await calRes.error) {
        alert("addToCalendar failed: " + calRes.error);
    }
    if (await journalRes.error) {
        alert("addToJournal failed: " + journalRes.error);
    }
}

//changes the color when the day is updated in the update menu (not currently in use)
async function updateDay() {
    changeColor(currentDay,colorSelection);
    closeUpdateDayMenu()
}

//checks that a color was selected by the user to make sure a day can be created
function submitDay() {
    if (colorSelection !== 'unselected-color'){
        createDay()
    }
    
    closeCreateDayMenu()
}

//changes the color of the day with a string color
function changeColor(day, color) {
    day.classList.remove(...colors)
    day.classList.add(color);
}

//deletes the day from the frontend (not currently in use)
function deleteDay() {
    currentDay.remove()
    closeUpdateDayMenu();
}

//checks if a day is clicked on and opens the update menu if so
function detectDayClick(e){
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.classList.contains('grid-block')) {
        currentDay = e
        console.log(currentDay)
        openUpdateDayMenu()
    }
}


