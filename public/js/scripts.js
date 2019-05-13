getData()

function getData(completed) {
  fetch('/api/todos')
    .then(resp => resp.json())
    .then(json => {
      if(json) {
        const sorted = json.sort((a, b) => b.id - a.id)
        displayTodos(!completed ? sorted : sorted.filter(todo => todo.completed))
      }
    })
}
const displayTodos = (todos) => {
  const countDiv = document.querySelector('.total')
  countDiv.innerText = todos.length > 1 ?
    `Total of ${todos.length} Todos` :
    `Total of ${todos.length} Todos`
  const todoList = document.querySelector('.details')
  todos.forEach((todo, index) => {
    let todoItem = document.createElement('div')
    todoItem.className = 'info'
    if(index === 0) {
      todoItem.classList.add('info-first')
    }
    addTodoItems(todo, todoItem)
    todoList.appendChild(todoItem)
  })
}

const addTodoItems = (item, parentDiv) => {
  Object.keys(item)
    .forEach(columnTitle => {
      let columnDiv = document.createElement('div')
      columnDiv.className = columnTitle.replace(/([a-z0-9])([A-Z])/, '$1-$2').toLowerCase()
      if(columnTitle === 'completed') {
        columnDiv.innerText = item[columnTitle] ? 'Y' : 'N'
      } else {
        columnDiv.innerText = item[columnTitle]
      }
      parentDiv.appendChild(columnDiv)
    })
}

const removeAllItems = () => {
  const todoList = document.querySelector('.details')
  const todoArray = Array.from(todoList.children)
  todoArray.forEach((item, index) => {
    if(index) {
      todoList.removeChild(item)
    }
  })
}

const refreshItems = (completed) => {
  removeAllItems()
  getData(completed)
}

const displayAllButton = document.querySelector('.all')
displayAllButton.addEventListener('click', () => refreshItems())

const displayCompletedButton = document.querySelector('.completed')
displayCompletedButton.addEventListener('click' , () => refreshItems(true))
