const form = document.querySelector('form')
const containerDiv  = document.querySelector('#list')


form.addEventListener('submit', (e) => {
	e.preventDefault()
	formdata = new FormData(form)
	todo =  formdata.get('todo')
	console.log(todo);
	todos = {
		todos: todo
	}
	fetch("http://localhost:5000/todos",{
		method:"POST",
		body : JSON.stringify(todos),
		headers: {'content-type': 'application/json'}
		})
		.then(res => res.json())
		.then(result => {
			form.reset();
			window.location = window.location
		})
})	



async function allTodos(){
 	await fetch("http://localhost:5000/todos")
 	.then((res) => res.json())
 	.then(data => {
 		let todos = data.Result
 		todos.reverse();
 		todos.forEach( todo => {
 			if(todo.completed === "false"){
	 	
	 			const ul = document.createElement('ul')
				ul.className = "list-group bg-dark"
				const li = document.createElement('li')
				li.className = "list-group-item justify	-content-center"
				li.innerHTML = "<h4>"+todo.todo +"</h4>"
				const btn =  document.createElement('button')
				btn.className = "btn btn-danger sm-2 float-right"
				btn.innerHTML  = "X"

				const checkbox = document.createElement('input')
				checkbox.className = "form-check-input float-left"
				checkbox.type =  "checkbox"
				checkbox.value = "true"
				const label = document.createElement('label')
				label.className = "form-check-label"
				label.innerHTML = "completd"
				const checkboxDiv = document.createElement('div');
				checkboxDiv.className = 'form-check'
				checkboxDiv.appendChild(checkbox)
				checkboxDiv.appendChild(label)


				li.appendChild(btn)
				li.appendChild(checkboxDiv)
				ul.appendChild(li)
				// ul.appendChild(btn)
				containerDiv.appendChild(ul)

				btn.addEventListener('click', () => {
					fetch("http://localhost:5000/todos/"+todo.ID, { method:"DELETE"})
					.then(res => res.json())
					.then(result => {
						// console.log(result.Result);
						window.location = window.location
					})
					
				})

				checkbox.addEventListener("change", () => {
					fetch("http://localhost:5000/todos/"+todo.ID, { method:"PATCH"})
					.then(res => res.json())
					.then(result => {
						// console.log(result.Result);
						window.location = window.location
					})
				})
			}
 		})

 	})
}
allTodos()
