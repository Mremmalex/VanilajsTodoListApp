const containerDiv = document.querySelector('#list')
const container = document.querySelector('#alert')

async function allTodos(){
 	await fetch("http://localhost:5000/todos")
 	.then((res) => res.json())
 	.then(data => {
 		let todos = data.Result
 		todos.reverse();
 		todos.forEach( todo => {
 			if(todo.completed === "true"){
 			
	 			const ul = document.createElement('ul')
				ul.className = "list-group bg-dark"
				const li = document.createElement('li')
				li.className = "list-group-item justify	-content-center"
				li.innerHTML = "<h4>"+todo.todo +"</h4>"
				const btn =  document.createElement('button')
				btn.className = "btn btn-success sm-2 float-right"
				btn.innerHTML  = "Completed"
				li.appendChild(btn)
				ul.appendChild(li)
				containerDiv.appendChild(ul)

				btn.addEventListener('click', () => {
					const div = document.createElement('div')
					div.className = "alert alert-success"
					div.role = "alert"
					div.textContent = "Todo With the ID : " + todo.todoID + " Has Been Completed"
					container.appendChild(div)
				})
			}
 		})

 	})
}
allTodos()
