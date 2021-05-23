const greeting = document.querySelector(".js-greeting");
const form = document.querySelector(".js-form");
const input = form.querySelector(".js-input");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";
    
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintName(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintName(currentUser);
    }
}

function init(){
    loadName();
}

init();