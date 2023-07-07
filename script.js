let button = document.createElement("button");
let score = document.createElement("h2");
let timer = document.createElement("h2");
let promptParagraph = document.createElement("p");
let choiceButton = document.createElement("button");




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