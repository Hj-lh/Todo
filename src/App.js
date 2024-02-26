import './App.css';
import { useEffect, useState } from 'react';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import {CiCircleRemove} from 'react-icons/ci';
import {useAutoAnimate} from '@formkit/auto-animate/react';

function App() {
  const [todo, setTodo] = useState([])
  const [input, setInput] = useState("")
  
  const [isComplete, setComplete] = useState(false)
  const [Completedtodo, setCompletedtodo] = useState([])
  
  const [animatelist] = useAutoAnimate();

  function fixid(){
    return Math.floor(Math.random() * 100000)
  }


  const handleComplete = (id) => {
    const completeditem = todo.find(item => item.id === id);

    if(completeditem){
      const updatedTodo = todo.filter(item => item.id !== id);
      setTodo(updatedTodo);

      const updatedCompleted = [...Completedtodo,{text: completeditem.text, id: fixid()}];
      setCompletedtodo(updatedCompleted)
      localStorage.setItem('completed-todo-list', JSON.stringify(updatedCompleted))
      const updatedremove = todo.filter((t) => t.id!==id)
      localStorage.setItem('todo-list', JSON.stringify(updatedremove))
    }
  }
  
  const handleSubmit = () => {
    if(input !== ''){
      const updatedTodo = [...todo,{text:input, id:fixid()}]
      setTodo(updatedTodo);
      localStorage.setItem('todo-list', JSON.stringify(updatedTodo))
      setInput('');

      //animation class
      const addButton = document.querySelector('#add')
      addButton.classList.add('animate');

      setTimeout(() => {
        addButton.classList.remove('animate');
      }, 200)
    }
    
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todo-list'))
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completed-todo-list'))
    if(savedTodo){
      setTodo(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedtodo(savedCompletedTodo);
    }
  }, []);
  

  const removetodo = (id) => {
    const updatedremove = todo.filter((t) => t.id!==id)
    const updatedremoveC = Completedtodo.filter((t) => t.id!==id)
    setCompletedtodo(updatedremoveC)
    setTodo(updatedremove)
    localStorage.setItem('todo-list', JSON.stringify(updatedremove))
    localStorage.setItem('completed-todo-list', JSON.stringify(updatedremoveC))

  }

  const handleDeleteAll = () => {
    setTodo([])
    setCompletedtodo([])
    localStorage.setItem('todo-list', JSON.stringify([]))
    localStorage.setItem('completed-todo-list', JSON.stringify([]))


  }

  return (
    <>
    <div className="container" >
      <input 
      type='text' 
      value={input}
      placeholder='type a Todo'
      onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit} className='button1' id='add'>Add</button>
      <button onClick={handleDeleteAll} className='button1' id='deleteAllButton'>Delete All</button>

      
      <div className='TC'>
          <button className={`isCompleted ${isComplete===false && 'active'}`} id='tasktab' onClick={() => setComplete(false)} >Tasks</button>
          <button className={`isCompleted ${isComplete===true && 'active'}`} onClick={() => setComplete(true)} id='completetab'>Completed</button>
      </div>
{/* ------------------------------------------------------------------------------------------------------ */}
      
      <ul className='todo-list' ref={animatelist}>
        {
          isComplete === false && todo.map(({text,id}) => {
            return(
              <li key={id} className="todo">
              <span>{text}</span>
              <div className='icons'>
              <CiCircleRemove className='delete' onClick={() => removetodo(id)}/>
              <AiOutlineCheckCircle className='chick' onClick={() => handleComplete(id)}/>
              </div>
            </li>)
          })}
{/* ------------------Completed tab----------------------------------------------------------------------------- */}
          {
          isComplete === true && Completedtodo.map(({text,id}) => {
            return(
              <li key={id} className="todo">
              <span>{text}</span>
              {/* <p><small>Completed on {id.CompletedOn} </small></p> */}
              <div className='icons'>
              <CiCircleRemove className='delete' onClick={() => removetodo(id)}/>
              </div>
            </li>)
          })}
      </ul>
{/* ------------------------------------------------------------------------------------------------------ */}


    </div>

    </>
    
  );
}


export default App;
