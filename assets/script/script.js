// class Todos {
// 	constructor(){
// 		this.todo = [];
// 	};

// 	addTodo(){
// 		this.todo = this.todo.concat({
// 			name: mainInput.value,
// 			completed: false,
// 			id: randomGen(),
// 		});
// 	};

// 	render(parent){
// 		ul.innerHTML = '';
// 		this.todo.forEach(t => {
// 			let li = document.createElement('li');
// 			li.classList.add('li');
// 			let p = docment.createElement('p');
// 			p.classList.add('para-1');
// 			p.textContent = t.name;
// 			let input = document.createElement('input');
// 			input.setAttribute('type', 'checkbox');
// 			input.checked = t.completed;
// 			input.checked ? p.style.textDecortation = 'strike-through': p.style.textDecortation = 'none';
// 			input.setAttribute('data-key', t.id);
// 			input.classList.add('status');
// 			let deleteit = document.createElement('button')
// 			deleteit.setAttribute('data-key', t.id);
// 			deleteit.textContent = 'X';
// 			li.append(input, p, deleteit);
// 			parent.append(li);
// 		})

// 	};
// }

// export default Todos;


const mainInput = document.querySelector('.main_input');
const ul = document.querySelector('ul')
const itemsLeft = document.querySelector('.items-left');
const active = document.querySelector('.active');
const all = document.querySelector('.all');
const completed = document.querySelector('.completed');
const selectAll = document.querySelector('.far');
let switchIt = false;

function randomGen(str = 'qwertyuio') {
  return str.split('')
    .sort(() => Math.random() - 0.5)
    .join('') + '_' + Math.floor(Math.random() * 1000)
}

class Todos{
  constructor(){
    this.todo = JSON.parse(localStorage.getItem('data')) || [];
  }
    addTodo(){
      this.todo = this.todo.concat({
      name: mainInput.value,
      completed: false,
      id: randomGen()
      })
    }


    render(parent){
      ul.innerHTML = '';
      this.todo.forEach(t =>{
      let li =document.createElement('li');
      li.classList.add('li');
      let p = document.createElement('p');
      p.classList.add('para-1')
      p.textContent = t.name;
      let input = document.createElement('input');
      input.setAttribute('type','checkbox');
      input.checked = t.completed;
      input.checked ? p.style.textDecorationLine = 'line-through': p.style.textDecorationLine = 'none';
      input.setAttribute('data-key',t.id)
      input.classList.add('status');
      let deleteit = document.createElement('button');
      deleteit.setAttribute('data-key',t.id)
      deleteit.classList.add('deleteit');
      deleteit.textContent = 'X'
      li.append(input,p,deleteit);
      parent.append(li);



      //replace para with input box on doubleclick
      const replaceItFunc = function(event){
        const editInput = document.createElement('input');
        editInput.classList.add('editInput');
        li.replaceChild(editInput,p);
        editInput.value = t.name;
        editInput.focus();
        editInput.addEventListener('keyup',event => {
          if(event.keyCode == 13){
            t.name = editInput.value;
            localStorage.setItem('data', JSON.stringify(newtodo.todo))
            newtodo.render(ul);
          }
        })
        editInput.addEventListener('blur',event => {
          t.name = editInput.value;
          localStorage.setItem('data', JSON.stringify(newtodo.todo))
          newtodo.render(ul);
        })
      }


      p.addEventListener('dblclick',replaceItFunc);
      //completed replace para with inputbox on doubleclick


      //items left detailsBox
      function itemsLeftText(){
        itemsLeft.textContent = newtodo.todo.filter(t => t.completed == false).length;
      }
      itemsLeftText();
      //completed items left


      //to delete todo
      const deleteTodo = function({target}){
        newtodo.todo = newtodo.todo.filter(t => target.dataset.key != t.id);
        localStorage.setItem('data', JSON.stringify(newtodo.todo))
        newtodo.render(ul);
      }
      deleteit.addEventListener('click',deleteTodo)
      //completed delete todo


      //toggle todo
      const toggle = function({target}){
        newtodo.todo = newtodo.todo.map(t =>{
           if(target.dataset.key == t.id){
             t.completed = !t.completed;
           }
           return t;
          });
          localStorage.setItem('data', JSON.stringify(newtodo.todo))
          newtodo.render(ul);
      }
      input.addEventListener('click',toggle);
      //completed toggle todo
    })
    }
  }



  let newtodo = new Todos;


  //to add a todo by enter

  const enterTodo = function(event){
    if(event.keyCode == 13){
      // newtodo.name = event.target.value
      newtodo.addTodo();
      event.target.value = '';
      localStorage.setItem('data', JSON.stringify(newtodo.todo))
      newtodo.render(ul);
    }

  }

  mainInput.addEventListener('keyup', enterTodo)

  //completed adding todo by enter


  //active todos function detailsbox
  const activeFunc = function(event){
    let newtodoActive = new Todos;
    newtodoActive.todo = newtodo.todo.filter(t => t.completed == false)
    newtodoActive.render(ul);
    }

  active.addEventListener('click', activeFunc)

  //completed active todos function detailsbox

  //all todos detailsBox
  const allFunc = function(event){
    newtodo.render(ul);
  }

  all.addEventListener('click', allFunc);

  //completed all todos detailsBox



  //function completed detailsBox
  const completedFunc = function(){
    let newtodoCompleted = new Todos;
    newtodoCompleted.todo = newtodo.todo.filter(t => t.completed == true);
    newtodoCompleted.render(ul);
  }
  completed.addEventListener('click', completedFunc);

  //completed detailsBox Complete function



  //selectAll icon functionality
  const selectAllFunc = function(){
    if(switchIt==false){
      newtodo.todo = newtodo.todo.map(t=> {
        t.completed = true;
        return t
      });
    }
    else {
      newtodo.todo = newtodo.todo.map(t=> {
      t.completed = false
      return t});
      }
    switchIt =! switchIt;
    localStorage.setItem('data', JSON.stringify(newtodo.todo))
    newtodo.render(ul);
  }

  selectAll.addEventListener('click',selectAllFunc);

  //completed selectAll icon functionality



  newtodo.render(ul);
