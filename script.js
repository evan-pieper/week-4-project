let button = document.querySelector("#button");


let prompt = document.querySelector("#prompt");
let choices = document.querySelector("#choices");
let scoreline = document.querySelector("#scoreline");

// The following function renders items in a todo list as <li> elements
function renderPrompt() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}