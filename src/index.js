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
    editMode: true,
  },
  {
    text: "faire du javascript",
    done: true,
    editMode: false,
  },
];

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

/* Nous allons ensuite créer un écouteur et le gestionnaire d'événement correspondant :  */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;
  li.append(buttonEdit, buttonDelete);
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.addEventListener('click', (event) => {
    event.stopPropagation(); 
    toggleEditMode(index); 
  });
  buttonSave.addEventListener('click', (event) => {
    editTodo(index, input); 

  })

  buttonSave.addEventListener("click", (event) => {
    event.stopPropagation();
    todos[index].text = input.value;
    todos[index].editMode = false;
    displayTodo();
  });

  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    todos[index].editMode = false;
    displayTodo();
  });

  li.append(input, buttonSave, buttonCancel);
  return li;
};

/* création d'une fonction pour ajouter des Todos  */
const addTodo = (text) => {
  todos.push({
    text,
    done: false,
    editMode: false,
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
/* création d'une fonction pour éditer le todo  */
const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value; 
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo(); 

}
displayTodo();
