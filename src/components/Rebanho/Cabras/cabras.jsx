import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './cabras.css'; 

const Cabra = () => {
  const navigate = useNavigate();
  const [cabras, setCabras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCabra, setSelectedCabra] = useState(null);
  const [modalValues, setModalValues] = useState({
    nome: '',
    peso: '',
    pelagem: '',
    altura: '',
    tag: '',
    especie: '',
    nasc: '',
    ciclo: '',
    desc: '',
  });

  const redirectTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Função para carregar os dados do localStorage
    const loadAnimaisFromLocalStorage = () => {
      const animais = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('animal')) {
          const animal = JSON.parse(localStorage.getItem(key));
          // Verifica se a espécie é ovelha antes de adicionar ao array
          if (animal.especie.toUpperCase() === 'CABRA') {
            animais.push(animal);
          }
        }
      }
      setCabras(animais);
    };

    // Carregar os dados do localStorage no carregamento inicial
    loadAnimaisFromLocalStorage();
  }, []);

  const openModal = (cabra) => {
    setSelectedCabra(cabra);
    setShowModal(true);
    // Carregar os valores da ovelha selecionada nos campos do modal
    setModalValues(cabra);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setModalValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSalvar = () => {
    // Atualizar a ovelha selecionada no estado geral
    const updatedCabras = cabras.map((cabra) =>
      cabra === selectedCabra ? { ...cabra, ...modalValues } : cabra
    );
    setCabras(updatedCabras);
  
    // Excluir o animal antigo do localStorage
    const localStorageKey = `animal_${selectedCabra.id}`;
    localStorage.removeItem(localStorageKey);
  
    // Adicionar o animal atualizado ao localStorage
    const newLocalStorageKey = `animal_${selectedCabra.id}`;
    localStorage.setItem(newLocalStorageKey, JSON.stringify({ ...selectedCabra, ...modalValues }));
  
    // Fechar o modal
    setShowModal(false);
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

      <main className="main">
        <h1>Cabras Cadastradas</h1>

        <div className="cards-container">
          {cabras.map((cabra, index) => (
            <div key={index} className="ovelha-card">
              <div className="card-content">
                <i
                  className="fa fa-cog"
                  aria-hidden="true"
                  onClick={() => openModal(cabra)}
                ></i>

                <h2>{cabra.nome}</h2>
                <p>Peso: {cabra.peso} kg</p>
                <p>Altura: {cabra.altura} cm</p>
                <p>Sexo: {cabra.tag}</p>
                <p>Pelagem: {cabra.pelagem}</p>
                <p>Data de Nascimento: {cabra.nascimento}</p>
                <p>Descrição: {cabra.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        © EAJ 2023. Todos os Direitos Reservados.
      </footer>

      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {/* Renderiza os detalhes da ovelha selecionada dentro do modal */}
            <label>
              Nome:
              <input
                type="text"
                id="nome"
                value={modalValues.nome}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Peso:
              <input
                type="text"
                id="peso"
                value={modalValues.peso}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Pelagem:
              <input
                type="text"
                id="pelagem"
                value={modalValues.pelagem}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Altura:
              <input
                type="text"
                id="altura"
                value={modalValues.altura}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Sexo:
              <input
                type="text"
                id="tag"
                value={modalValues.tag}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Espécie:
              <input
                type="text"
                id="especie"
                value={modalValues.especie}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Nascimento:
              <input
                type="text"
                id="nasc"
                value={modalValues.nasc}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Último Ciclo Astral:
              <input
                type="text"
                id="ciclo"
                value={modalValues.ciclo}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Descrição:
              <textarea
                id="desc"
                value={modalValues.desc}
                onChange={handleInputChange}
              />
            </label>

            <button className="cadastroSalvar-button" onClick={handleSalvar}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabra;
