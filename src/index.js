import "./style.css";
/* 1- Affichage des Todos : on créé une référence a notre liste non ordonnée en utilisant 
la méthode querySelector et en passant le type d'elément 
*/

const ul = document.querySelector("ul");

/* 2- Ajout de Todo : Nous commençon par créé les deux références dont on aura besoin le form et l'input via le querySelector  */

const form = document.querySelector("form");
const input = document.querySelector("form > input");

/*nous ajoutons un tableau de todos de départ  */ 
const todos = [
  {
    text: "je suis une todo",
    done: false,
  },
  {
    text: "faire du javascript",
    done: true,
  },
];

/* Nous allons ensuite créer un écouteur et le gestionnaire d'événement correspondant :  */ 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;
  li.append(buttonDelete);
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  return li;
};

/* création d'une fonction pour ajouter des Todos  */ 
const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

/* Création d'une fonction pour supprimer une Todo */
const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};
/* Création d'une fonction pour modifier le statut d'une Todo */
const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

displayTodo();
