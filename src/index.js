import "./style.css";

/* 1- Affichage des Todos : on créé une référence a notre liste non ordonnée en utilisant 
la méthode querySelector et en passant le type d'elément 
*/
const ul = document.querySelector('ul'); 

/* 2- Ajout de Todo : Nous commençon par créé les deux références dont on aura besoin le form et l'input via le querySelector  */
const form = document.querySelector('form');
const input = document.querySelector('form > input'); 

/* Nous allons ensuite créer un écouteur et le gestionnaire d'événement correspondant :  */ 
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = ''; 
  addTodo(value);
  displayTodo();
}); 
/*nous ajoutons un tableau de todos de départ  */ 
const todos = [
  {
    text: "Je suis une todo",
    done: false,
  },
  {
    text: "faire du javascript",
    done: true,
  },
];

/* Ensuite nous créons une fonctions qui permet d'afficher nos todos initiales */ 
const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    return createTodoElement(todo, index); 
  })
  ul.innerHTML = ''; 
  ul.append(...todosNode); 
 };
/* Nous créons enfin la fonction qui va créer une élément HTML pour chaque objet todo de notre tableau de todos :*/
const createTodoElement = (todo, index) => {
  const li = document.createElement('li');
  const buttonDelete = document.createElement('button');
  buttonDelete.addEventListener('click', (event) =>{
    deleteTodo(index); 
  });
  buttonDelete.innerHTML = `Supprimer`; 
  li.innerHTML = `
    <span class="todo ${ todo.done ? 'done' : ''}"></span>
    <p>${ todo.text}</p>
  `;
  li.appendChild(buttonDelete); 
  return li; 

}
/* Nous créons une fonction addTodo qui va reçevoir comme argument le text de la todo 
qui utilisera la méthode push pour ajouter une nouvelle Todo */ 
const addTodo = (text) => {
  todos.push({
    text, 
    done: false 
  })

}

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo(); 
}
displayTodo(); 