import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {animal ,animalId, inputNome, inputPeso, inputPelagem, inputAltura, inputTag, inputEspecie, inputNascimento, inputCiclo, inputDesc, element, animalIndex, numeroBode, numeroOvelha, numeroTotal} from '../../Animal.js';
import './cadastroAnimal.css';

const AnimalCadastro = () => {
  const navigate = useNavigate();

  const [animalData, setAnimalData] = useState({
    nome: '',
    peso: '',
    idade: '',
    sexo: '',
    pelagem: '',
    altura: '',
    tag: '',
    especie: '',
    nascimento: '',
    cicloAstral: '',
    descricao: ' ',
    foto: '',
  });

  const handleChange = (field, value) => {
    setAnimalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // pegando as informações digitadas pelo usuário
    element = document.getElementById('nome');
    inputNome = element.value;
    element = document.getElementById('peso');
    inputPeso = element.value;
    element = document.getElementById('pelagem');
    inputPelagem = element.value;
    element = document.getElementById('altura');
    inputAltura = element.value;
    element = document.getElementById('tag');
    inputTag = element.value;
    element = document.getElementById('especie');
    inputEspecie = element.value;
    element = document.getElementById('nasc');
    inputNascimento = element.value;
    element = document.getElementById('ciclo');
    inputCiclo = element.value;
    element = document.getElementById('desc');
    inputDesc = element.value;
    if (
      !animalData.nome ||
      !animalData.peso ||
      !animalData.pelagem ||
      !animalData.altura ||
      !animalData.especie ||
      !animalData.nascimento 
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    animal = {id: animalId, nome: inputNome, peso: inputPeso, pelagem: inputPelagem, altura:inputAltura, tag: inputTag, especie: inputEspecie, nascimento: inputNascimento, ciclo: inputCiclo, desc: inputDesc};
    animalIndex = animalId;
    localStorage.setItem('animal ' + animalIndex, JSON.stringify(animal)); // armazena o animal
    animalId++; // auto-incrementação dos id's
    alert("Animal Cadastrado!");
    navigate('/rebanho');

    
  };

  const redirectTo = (path) => {
    navigate(path);
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
      <h2>Cadastro de animal</h2>

      <label>
        Nome:
        <input
          type="text"
          value={animalData.nome}
          id='nome'
          onChange={(e) => handleChange('nome', e.target.value)}
        />
      </label>

      <label>
        Peso:
        <input
          type="text"
          value={animalData.peso}
          id='peso'
          onChange={(e) => handleChange('peso', e.target.value)}
        />
      </label>

      <label>
        Pelagem:
        <input
          type="text"
          value={animalData.pelagem}
          id='pelagem'
          onChange={(e) => handleChange('pelagem', e.target.value)}
        />
      </label>

      <label>
        Altura:
        <input
          type="text"
          value={animalData.altura}
          id='altura'
          onChange={(e) => handleChange('altura', e.target.value)}
        />
      </label>

      <label>
        Sexo:
        <input
          type="text"
          value={animalData.tag}
          id='tag'
          onChange={(e) => handleChange('tag', e.target.value)}
        />
      </label>

      <label>
        Espécie:
        <input
          type="text"
          value={animalData.especie}
          id='especie'
          onChange={(e) => handleChange('especie', e.target.value)}
        />
      </label>

      <label>
        Nascimento:
        <input
          type="text"
          value={animalData.nascimento}
          id='nasc'
          onChange={(e) => handleChange('nascimento', e.target.value)}
        />
      </label>

      <label>
        Último Ciclo Astral:
        <input
          type="text"
          value={animalData.cicloAstral}
          id='ciclo'
          onChange={(e) => handleChange('cicloAstral', e.target.value)}
        />
      </label>

      <label>
        Descrição:
        <textarea
          value={animalData.descricao}
          id='desc'
          onChange={(e) => handleChange('descricao', e.target.value)}
        />
      </label>

      <label>
        Foto:
        <input
          type="file"
          accept=".png" 
          value={animalData.foto}
          onChange={(e) => handleChange('foto', e.target.files[0])}
        />
      </label>

      <button onClick={handleSave} className="cadastroSalvar-button">
        Salvar
      </button>
    </main>
      <footer>
        All Rights Reserved
      </footer>

    </div>
  );
};

export default AnimalCadastro;
