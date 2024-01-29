import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './Rebanho.css'
import {animalId, localAnimal} from '../../Animal.js';

const Rebanho = () => {
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
    // Verifica a especie dos animais no localstorage e incrementa sua respectível variável
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

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const redirectTo = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
    // Lógica para lidar com a pesquisa (por exemplo, redirecionar para uma página de resultados)
    console.log(`Pesquisar por: ${searchInput}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
        <h2> Pesquise entre as tags:</h2> 

        <div className="search-container">
            <input
              type="text"
              placeholder="Digite alguma característica..."
              value={searchInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Pesquisar</button>
        </div>

      <div className="cards-container rebanho-cards">
        <div className="card" onClick={() => redirectTo('/ovelhas')}>
            <h2>Ovelhas</h2>
            <p>{ovelhasCount}</p>
          </div>
        <div className="card" onClick={() => redirectTo('/bodes')}>
            <h2>Bodes</h2>
            <p>{bodesCount}</p>
        </div>
        <div className="card" onClick={() => redirectTo('/cabras')}>
            <h2>Cabras</h2>
            <p>{cabrasCount}</p>
        </div>
        <div className="card">
            <h2>Todos</h2>
            <p>{todosCount}</p>
        </div>
      </div>

      <button className="cadastroAnimal-button" onClick={() => redirectTo('/cadastroAnimal')}>
            Cadastrar Novo Animal
        </button>

    </main> 
    
      <footer>
      © EAJ 2023. Todos os Direitos Reservados.
      </footer>
    </div>
 )
}

export default Rebanho;