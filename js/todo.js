const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDo = document.querySelector(".js-toDo");

const TODO_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target; //이벤트가 일어나는 객체 선택 //임의로 지정한건가?
    const li = btn.parentNode; //li는 btn의 부모찾기
    toDo.removeChild(li); //HTML에서 ul안에 li지우기
    const cleanToDo = toDos.filter(function(toDoList){
        return toDoList.id !== parseInt(li.id); //parseIn는 String으로 인식하는 li.id들을 숫자로 인식하게 하기위해 작성
    });
    toDos = cleanToDo;
    saveToDo();
}

function saveToDo(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDo.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);  //obj를 toDos Array 입력시키기
    saveToDo();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadTodo(){
    const loadedToDo = localStorage.getItem(TODO_LS);
    if (loadedToDo !== null) {
        const parsedToDos = JSON.parse(loadedToDo); //String으로 읽어버리니까 이걸로 object로 불러오게 하기
        parsedToDos.forEach(function(toDoList){  //
            paintToDo(toDoList.text);  //obj 안에 데이터중에 text만 화면상에 띄우기
        });
    }
}

function init(){
    loadTodo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();