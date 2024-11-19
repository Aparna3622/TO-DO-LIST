const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");

let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "";

showTodos();

function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
        return '';
    }
    const checked = todo.status === "completed" ? "checked" : "";
    return `
    <li class="todo">
        <label>
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
            <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" onclick="remove(${index})">
            <i class="fa fa-times"></i>
        </button>
    </li>`;
}

function showTodos() {
    if (todosJson.length === 0) {
        todosHtml.innerHTML = '';
        emptyImage.style.display = 'block';
    } else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = 'none';
    }
}

function addTodo() {
    const todo = input.value.trim();
    if (!todo) return;

    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    input.value = '';
    showTodos();
}

function updateStatus(todo) {
    const todoIndex = todo.id;
    todosJson[todoIndex].status = todo.checked ? "completed" : "pending";
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

function remove(index) {
    todosJson.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

addButton.addEventListener("click", addTodo);

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

filters.forEach(filterEl => {
    filterEl.addEventListener("click", () => {
        filters.forEach(el => el.classList.remove("active"));
        filterEl.classList.add("active");
        filter = filterEl.dataset.filter;
        showTodos();
    });
});

deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
});
