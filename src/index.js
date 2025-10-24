document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodo");
  const todoList = document.getElementById("todoList"); // UL LIST ID
  const todos = JSON.parse(localstorage.getItem("todos")) || [];

  // functions will be save the localhost
  function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  //todo list will be cleared
  function rendertodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li"); //add the todo list to create newly
      li.className =
        "flex items-center justify-between bg-grey-500 text-white rounded-lg p-3 py-2 px-4 mb-2 shadow-md";
      li.innerHTML = `
              
              <div class= "flex items-center space-x-2">
              <input type = "checkbox" class="form-checkbox h-5 w-5 text-red-500" 
              ${todo.completed ? "checked" : ""} 
              <span class="todo-text ${
                todo.completed ? "line-through text-red-600" : "text-gray-600"
              }"${todo.text}>
              </span>
              <div class="space-x-2">
              <button class="Edit-btn bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">
              Edit</button>
              <button class="Delete-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">
              Delete </button>
              </div>
              </div>
              `;
      // reference checkbox
      const checkbox = li.querySelector(".form-checkbox");
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.ariaChecked;
        savetodos();
        rendertodos();
      });
      // reference edit button
      const editBtn = li.querySelector(".Edit-btn");
      editBtn.addEventListener("click", () => {
        const newText = prompt("Enter new text", todo.text);
        if (newText !== null) {
          todo.text = newText.trim();
          savetodos();
          rendertodos();
        }
        })
      });
    };
  });
