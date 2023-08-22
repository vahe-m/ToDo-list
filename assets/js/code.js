const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");
const dateTime = document.querySelector(".date-time>p");
let todoArr = JSON.parse(Storage.getFromStorage('todo'));

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if(input.value != '') {
		let status = "todo"
		let id = new Date().getTime();
		const todo = new Todo(id, input.value, status);
		todoArr = [...todoArr, todo];
		Render.addTodo();
		Render.clearInput();
		Storage.saveInStorage("todo", JSON.stringify(todoArr));
	}
});

function setDateTime() {
	const d = new Date();
	let date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
	let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
	dateTime.innerHTML = date + '. ' + time;
}
setInterval(setDateTime, 1000);

// done and delete todo
document.addEventListener("click", (elm) => {
	const checkBtn = elm.target.closest(".check-btn");
	const trashBtn = elm.target.closest(".trash-btn");	
	if(checkBtn) {
		let btnId = elm.target.closest(".check").getAttribute("data-id");	
		todoArr.forEach(elm => {
			if(elm.id === +btnId) {
				elm.status = "done";
				Storage.saveInStorage("todo", JSON.stringify(todoArr));
				Render.addTodo();
			}
		})
	} 
	else if (trashBtn) {
		let btnId = elm.target.closest(".trash").getAttribute("data-id");
		elm.target.closest(".todo").remove();
		todoArr = todoArr.filter((elm) => elm.id !== +btnId);
		Storage.saveInStorage("todo", JSON.stringify(todoArr));
	}
})

// background modes
const backgroundColors = document.querySelectorAll(".background-colors button");
[...backgroundColors].map(btn => btn.addEventListener('click', (e) => {
	classN = e.target.getAttribute('data-mode');
	document.body.classList = '';
	document.body.classList.add(classN);
	Storage.saveInStorage('theme', classN);
}));

window.addEventListener("DOMContentLoaded", () => {
	let classN = Storage.getFromStorage('theme')
	document.body.classList.add(classN);
	Render.addTodo();
})