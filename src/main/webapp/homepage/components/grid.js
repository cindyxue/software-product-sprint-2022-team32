const gridContainer = document.getElementById('grid-container');
const createDayMenu = document.querySelector('.dark-menu-bg');
const createDayMenuClose = document.querySelector('.close-menu');
const updateDayMenu = document.querySelector('.dark-update-menu-bg');
const updateDayMenuClose = document.querySelector('.close-update-menu');
const newJournalEntry = document.getElementById('journal-entry')
const updateJournalEntry = document.getElementById('journal-entry-update')
const date = document.getElementById('date')
const colors = ['mood-one','mood-two','mood-three','mood-four','mood-five']

let currentDay;
let colorSelection = 'white';    




createDayMenuClose.addEventListener("click", function() {
	createDayMenu.style.display = "none";
});

updateDayMenuClose.addEventListener("click", function() {
	updateDayMenu.style.display = "none";
});

function openCreateDayMenu(){
    createDayMenu.style.display = "flex";
}

function openUpdateDayMenu(){
    updateDayMenu.style.display = "flex";
}

function closeCreateDayMenu(){
    createDayMenu.style.display = "none";
}

function closeUpdateDayMenu(){
    updateDayMenu.style.display = "none";
}

function setColor(color){
    colorSelection = color
    console.log(colorSelection)
}

function createDay() {
    var newDay = document.createElement('li');
    newDay.classList.add('grid-block');
    changeColor(newDay, colorSelection)
    gridContainer.appendChild(newDay);
}

function updateDay(color) {
    changeColor(currentDay,colorSelection);
    closeUpdateDayMenu()
}


function submitDay() {
    if (colorSelection !== 'white'){
        createDay()
    }
    
    closeCreateDayMenu()
}

function changeColor(day, color) {
    day.classList.remove(...colors)
    day.classList.add(color);
}

function deleteDay() {
    currentDay.remove()
    closeUpdateDayMenu();
}

function detectDayClick(e){
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.classList.contains('grid-block')) {
        currentDay = e
        openUpdateDayMenu()
    }
}