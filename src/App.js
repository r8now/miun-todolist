import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";


function App() {

  const [todo, setTodo] = useState("");
  const [time, setTime] = useState(0);
  const [listOfTodos, setListOfTodos] = useState([]);

  const addTodo = () => { alert(todo + time);
    Axios.post('https://hosein-mern.herokuapp.com/addtodo', {todo: todo, time: time,
  }).then((response)=> {
    setListOfTodos([...listOfTodos, {_id: response.data._id, todo: todo, time: time}]);
  })
  };

  const updateTodo = (id) => {
    const newTime = prompt("Enter new Time")

    Axios.put('https://hosein-mern.herokuapp.com/update',{newTime: newTime, id: id}).then(() => {
      setListOfTodos(listOfTodos.map((val) => {
        return val._id === id ? { _id: id, todo: val.todo, time: newTime} : val;
      }))
    })
  };

  const deleteTodo = (id) => {
    Axios.delete(`https://hosein-mern.herokuapp.com/delete/${id}`).then(() => {setListOfTodos(listOfTodos.filter((val)=> {
      return val._id !== id;
    })
    
    );
  });
  };

  useEffect(() => { 
    Axios.get("https://hosein-mern.herokuapp.com/read").then((response) => {
      setListOfTodos(response.data);
    }).catch(() => { console.log("Error");
  });
}, []);



  return (
    <div className="App">
     <div className="inputs">

      <input type="text" placeholder="What to do..." onChange={ (event) => {setTodo( event.target.value)}} />
      <input type="number" placeholder="Minutes to finish" onChange={ (event) => {setTime(event.target.value)}} />
      <button onClick={addTodo}>Add todo</button>
      </div>

<div className="listOfTodos">
    {listOfTodos.map((val) => {
      return ( 
      <div className="todoContainer">
      <div className="todos">
     
     
   

        <h3 className="todo">Todo: {val.todo} </h3> 
        <h3 className="time">Time: {val.time} </h3>
       
        
        </div>
       
        <button className="updateButton" onClick={()=>{updateTodo(val._id)}}>Uppdatera</button>
        <button className="removeButton"  onClick={()=>{deleteTodo(val._id)}}>X</button>
        
      </div>
     
  ); 

    })}
    </div>
  

    </div>
  );
  
}

export default App;
