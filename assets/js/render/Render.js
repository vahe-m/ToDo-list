class Render {
	static addTodo(){
		let todoHtml = todoArr.map((elm) => {
			return `
				<div class="todo ${elm.status == 'done'? 'task-done' : ''}">
					<p class="todo-text">${elm.todo}</p>
					<div class="btn_check-trash">
						<span class="check ${elm.status == 'done'? 'checked' : ''}" data-id="${elm.id}"><i class="fa fa-check check-btn"></i></span>
						<span class="trash" data-id="${elm.id}"><i class="fa fa-trash trash-btn"></i></span>
					</div>
				</div>
			`
		});
		lists.innerHTML = (todoHtml).join(" ");
	};
	static clearInput() {
		input.value = "";
	};
}