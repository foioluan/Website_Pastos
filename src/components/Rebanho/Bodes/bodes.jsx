import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './bodes.css'; 

const Bode = () => {
  const navigate = useNavigate();
  const [bodes, setBodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBodes, setSelectedBodes] = useState(null);
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
          if (animal.especie.toUpperCase() === 'BODE') {
            animais.push(animal);
          }
        }
      }
      setBodes(animais);
    };

    // Carregar os dados do localStorage no carregamento inicial
    loadAnimaisFromLocalStorage();
  }, []);

  const openModal = (bode) => {
    setSelectedBodes(bode);
    setShowModal(true);
    // Carregar os valores da ovelha selecionada nos campos do modal
    setModalValues(bode);
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
    const updatedBodes = bodes.map((bode) =>
      bode === selectedBodes ? { ...bode, ...modalValues } : bode
    );
    setBodes(updatedBodes);
  
    // Excluir o animal antigo do localStorage
    const localStorageKey = `animal_${selectedBodes.id}`;
    localStorage.removeItem(localStorageKey);
  
    // Adicionar o animal atualizado ao localStorage
    const newLocalStorageKey = `animal_${selectedBodes.id}`;
    localStorage.setItem(newLocalStorageKey, JSON.stringify({ ...selectedBodes, ...modalValues }));
  
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
        <h1>Bodes Cadastrados</h1>

        <div className="cards-container">
          {bodes.map((bode, index) => (
            <div key={index} className="ovelha-card">
              <div className="card-content">
                <i
                  className="fa fa-cog"
                  aria-hidden="true"
                  onClick={() => openModal(bode)}
                ></i>

                <h2>{bode.nome}</h2>
                <p>Peso: {bode.peso} kg</p>
                <p>Altura: {bode.altura} cm</p>
                <p>Sexo: {bode.tag}</p>
                <p>Pelagem: {bode.pelagem}</p>
                <p>Data de Nascimento: {bode.nascimento}</p>
                <p>Descrição: {bode.desc}</p>
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

export default Bode;
