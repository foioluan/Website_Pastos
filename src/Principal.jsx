import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {animalId, localAnimal} from './Animal.js';
import 'font-awesome/css/font-awesome.min.css';
import './Principal.css'
import logoImage from './assets/logo.png';

const Principal = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [ovelhasCount, setOvelhasCount] = useState(0);
  const [bodesCount, setBodesCount] = useState(0);
  const [cabrasCount, setCabrasCount] = useState(0);
  const [todosCount, setTodosCount] = useState(0);

  useEffect(() => { // faz com que a função seja chamada sempre que abrir esta página
    updateAnimalCount();
  }, []); // o "[]" faz com que a função seja chamada apenas uma vez ao abrir a página

  const updateAnimalCount = () => {
    let bodes = 0;
    let ovelhas = 0;
    let cabras = 0;
    let i;
    // Verifica a espécie dos animais no localstorage e incrementa sua respectível variável
    for(i=1;i<=animalId;i++){
      localAnimal = JSON.parse(localStorage.getItem('animal ' + i)) // busca o animal por id
      if(localAnimal){
        if(localAnimal.especie.toUpperCase() === "BODE"){
          bodes++;
        }else if(localAnimal.especie.toUpperCase() === "OVELHA"){
          ovelhas++;
        }else if(localAnimal.especie.toUpperCase() === "CABRA"){
          cabras++;
        }
      }
    }
    let total = bodes + ovelhas + cabras;

    // modifica a valor dos cards
    setOvelhasCount(ovelhas);
    setBodesCount(bodes);
    setCabrasCount(cabras);
    setTodosCount(total);
  }

  const redirectTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completeTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    setTasks(tasks);
    setCompletedTasks(completeTasks);
  }, []);


  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [desc, setDesc] = useState('');

  const updateLocalStorage = (updatedTasks, updatedCompletedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
  }



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1; // Mês é baseado em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

 return (
    <div className="Principal">
      
      <header className="App-header">
 
      <h1>PASTOS</h1>
      
        <nav>
          <ul>
            <li onClick={() => redirectTo('/principal')}>Home</li>
            <li onClick={() => redirectTo('/agenda')}>Agenda</li>
            <li onClick={() => redirectTo('/rebanho')}>Rebanho</li>
            <li onClick={() => redirectTo('/saude')}>Saúde</li>
          </ul>
        </nav>
      </header>
    

      <main>
      <div className="mainBackground">
      <div className='animalsContainer'>
        <div className="animalCard" onClick={() => redirectTo('/ovelhas')}>
            <h2>Ovelhas</h2>
            <p>{ovelhasCount}</p>
          </div>
        <div className="animalCard" onClick={() => redirectTo('/bodes')}>
            <h2>Bodes</h2>
            <p>{bodesCount}</p>
        </div>
        <div className="animalCard" onClick={() => redirectTo('/cabras')}>
            <h2>Cabras</h2>
            <p>{cabrasCount}</p>
        </div>
        <div className="animalCard">
            <h2>Todos</h2>
            <p>{todosCount}</p>
        </div>
      </div>

      <div className='tasksContainer'>      
          {tasks.map((task, index) => (
            <div key={index} className="taskCardPrincipal">
              <h2>{task.categoria}</h2>
              <p>{task.desc}</p>
              <p>Prazo: {formatDate(task.prazo)}</p>
            </div>
          ))}
     
      </div>
      
    
    </div>
      
      
      </main>
      <footer>
      © EAJ 2023. Todos os Direitos Reservados.
      </footer>
    </div>
 )
}

export default Principal