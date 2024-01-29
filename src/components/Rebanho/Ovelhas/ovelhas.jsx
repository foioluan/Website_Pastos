import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './ovelhas.css';

const Ovelha = () => {
  const navigate = useNavigate();
  const [ovelhas, setOvelhas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOvelha, setSelectedOvelha] = useState(null);
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
          if (animal.especie.toUpperCase() === 'OVELHA') {
            animais.push(animal);
          }
        }
      }
      setOvelhas(animais);
    };

    // Carregar os dados do localStorage no carregamento inicial
    loadAnimaisFromLocalStorage();
  }, []);

  const openModal = (ovelha) => {
    setSelectedOvelha(ovelha);
    setShowModal(true);
    // Carregar os valores da ovelha selecionada nos campos do modal
    setModalValues(ovelha);
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
    const updatedOvelhas = ovelhas.map((ovelha) =>
      ovelha === selectedOvelha ? { ...ovelha, ...modalValues } : ovelha
    );
    setOvelhas(updatedOvelhas);
  
    // Excluir o animal antigo do localStorage
    const localStorageKey = `animal_${selectedOvelha.id}`;
    localStorage.removeItem(localStorageKey);
  
    // Adicionar o animal atualizado ao localStorage
    const newLocalStorageKey = `animal_${selectedOvelha.id}`;
    localStorage.setItem(newLocalStorageKey, JSON.stringify({ ...selectedOvelha, ...modalValues }));
  
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
        <h1>Ovelhas Cadastradas</h1>

        <div className="cards-container">
          {ovelhas.map((ovelha, index) => (
            <div key={index} className="ovelha-card">
              <div className="card-content">
                <i
                  className="fa fa-cog"
                  aria-hidden="true"
                  onClick={() => openModal(ovelha)}
                ></i>

                <h2>{ovelha.nome}</h2>
                <p>Peso: {ovelha.peso} kg</p>
                <p>Altura: {ovelha.altura} cm</p>
                <p>Sexo: {ovelha.tag}</p>
                <p>Pelagem: {ovelha.pelagem}</p>
                <p>Data de Nascimento: {ovelha.nascimento}</p>
                <p>Descrição: {ovelha.desc}</p>
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

export default Ovelha;
