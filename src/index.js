import "./style.css";

/* on créé une référence a notre liste non ordonnée en utilisant 
la méthode querySelector et en passant le type d'elément 
*/
const ul = document.querySelector('ul'); 

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
  li.innerHTML = `
    <span class="todo ${ todo.done ? 'done' : ''}"></span>
    <p>${ todo.text}</p>
    <button>Supprimer</button>
  
  `;
  return li; 

}
displayTodo(); 