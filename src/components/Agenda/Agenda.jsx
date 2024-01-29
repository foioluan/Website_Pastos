import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './Agenda.css';

const Agenda = () => {
  const navigate = useNavigate();

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
  const [prazo, setPrazo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const updateLocalStorage = (updatedTasks, updatedCompletedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
  }

  const handleIconClick = (index) => {
    setShowModal(true);
    setSelectedTask(tasks[index]);
    // alert(`Ícone de edição clicado para a tarefa ${index}`);
  };

  const handleCompleteIconClick = (index) => {
    const completedTask = tasks[index];
    const updatedCompletedTasks = [...completedTasks, completedTask];
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
  
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  
    updateLocalStorage(updatedTasks, updatedCompletedTasks);
  
    setShowModal(false);
  };

  const createEditIconClickHandler = (index) => {
    handleIconClick(index);
  };

  const createCompleteIconClickHandler = (index) => {
    handleCompleteIconClick(index);
  };

  const handleCadastroTarefa = () => {
    if (categoria && desc && prazo) {
      const newTask = { categoria, desc, prazo };
      const updateTask = [... tasks, newTask];

      setTasks(updateTask);
      setCategoria('');
      setDesc('');
      setPrazo('');
      
      updateLocalStorage(updateTask, completedTasks);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1; // Mês é baseado em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUpdateTarefa = () => {
    if (selectedTask && categoria && desc && prazo) {
      const updatedTasks = tasks.map((task) =>
        task === selectedTask ? { ...task, categoria, desc, prazo } : task
      );
  
      setTasks(updatedTasks);
      setShowModal(false);
  
      updateLocalStorage(updatedTasks, completedTasks);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  return (
    <div className="Agenda">
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
        <label>
          Categoria:
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </label>
          Prazo:
          <input
            type="date"
            id="prazo"
            onChange={(e) => setPrazo(e.target.value)}
          />
        <label>
          Descrição:
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <label>
        </label>
        <button className="cadastroTarefa-button" onClick={handleCadastroTarefa}>
          Cadastrar Nova Tarefa
        </button>

        <h2> Tarefas atuais </h2>
        <div className="cardsContainer">
          {tasks.map((task, index) => (
            <div key={index} className="cardTask">
              <i
                className="fa fa-cog"
                aria-hidden="true"
                onClick={() => createEditIconClickHandler(index)}
              ></i>
              <i
                className="fa fa-check-circle"
                aria-hidden="true"
                onClick={() => createCompleteIconClickHandler(index)}
              ></i>
              <h2>{task.categoria}</h2>
              <p>{task.desc}</p>
              <p>Prazo: {formatDate(task.prazo)}</p>
            </div>
          ))}
        </div>

        <div className="cardsContainer">
          {completedTasks.map((task, index) => (
            <div key={index} className="cardTask completedTask">
              <h2>{task.categoria}</h2>
              <p>{task.desc}</p>
              <p>Prazo: {formatDate(task.prazo)}</p>
            </div>
          ))}
        </div>
      </main>
      <footer>© EAJ 2023. Todos os Direitos Reservados.</footer>
      {showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
          {/* Renderize os detalhes da tarefa selecionada dentro do modal */}
          <h2>{selectedTask.categoria}</h2>
          <p>{selectedTask.desc}</p>
          <p>Prazo: {formatDate(selectedTask.prazo)}</p>
          <label>
            Categoria:
            <input
              type="text"
              id="categoriaModel"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </label>
            Prazo:
            <input
              type="date"
              id="prazoModel"
              onChange={(e) => setPrazo(e.target.value)}
            />
          <label>
            Descrição:
            <input
              type="text"
              id="descModel"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>
          <label>
          </label>
          <button className="cadastroTarefa-button" onClick={handleUpdateTarefa}>
            Atualizar Tarefa
          </button>
          <i
            className="fa fa-trash"
            aria-hidden="true"
            id='trash'
            onClick={() => handleCompleteIconClick(tasks.indexOf(selectedTask))}
          ></i>
        </div>
      </div>
    )}
    </div>
  );
};

export default Agenda;
