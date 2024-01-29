import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './Saude.css'

const Saude = () => {
  const navigate = useNavigate();

  const redirectTo = (path) => {
    navigate(path);
  };

    useEffect(() => {
    const vacinas = JSON.parse(localStorage.getItem('vacinas')) || [];
    const completeVacinas = JSON.parse(localStorage.getItem('completedVacinas')) || [];
    const meds = JSON.parse(localStorage.getItem('med')) || [];
    const completeMeds = JSON.parse(localStorage.getItem('completedMeds')) || [];

    setVacinas(vacinas);
    setCompletedVacinas(completeVacinas);
    setMed(meds);
    setCompletedMeds(completeMeds);
  }, []);

  const updateLocalStorageVacina = (updatedVacinas, updatedCompletedVacinas) => {
    localStorage.setItem('vacinas', JSON.stringify(updatedVacinas));
    localStorage.setItem('completedVacinas', JSON.stringify(updatedCompletedVacinas));
  }

  const updateLocalStorageMeds = (updatedMeds, updatedCompletedMeds) => {
    localStorage.setItem('med', JSON.stringify(updatedMeds));
    localStorage.setItem('completedMeds', JSON.stringify(updatedCompletedMeds));
  }

  const [vacinas, setVacinas] = useState([]);
  const [descVacina, setDesVacina] = useState('');
  const [prazoVacina, setPrazoVacina] = useState('');
  const [completedVacinas, setCompletedVacinas] = useState([]);
  const [med, setMed] = useState([]);
  const [descMed, setDesMed] = useState('');
  const [prazoMed, setPrazoMed] = useState('');
  const [completedMeds, setCompletedMeds] = useState([]);
  const [showModalVacina, setShowModalVacina] = useState(false);
  const [selectedVacina, setSelectedVacina] = useState(null);
  const [showModalMed, setShowModalMed] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);

  const handleCadastroVacina = () => {
    if (descVacina && prazoVacina) {
      const newVacina = { descVacina, prazoVacina };
      const updateVacina = [...vacinas, newVacina];
      setVacinas(updateVacina);
      setDesVacina('');
      setPrazoVacina('');

      updateLocalStorageVacina(updateVacina, completedVacinas);
    } else {
      alert('Por favor, preencha os campos.');
    }
  }

  const handleCadastroMed = () => {
    if (descMed && prazoMed) {
      const newMed = { descMed, prazoMed };
      const updateMed = [...med, newMed];

      setMed(updateMed);
      setDesMed('');
      setPrazoMed('');

      updateLocalStorageMeds(updateMed, completedMeds);
    } else {
      alert('Por favor, preencha os campos.');
    }
  }

  const handleCompleteVacinaIconClick = (index) => {
    const completedVacina = vacinas[index];
    const updateCompletedVacinas = [...completedVacinas, completedVacina];
    const updatedVacinas = [...vacinas];
    updatedVacinas.splice(index, 1);

    setVacinas(updatedVacinas);
    setCompletedVacinas(updateCompletedVacinas);

    updateLocalStorageVacina(updatedVacinas, updateCompletedVacinas);

    setShowModalVacina(false);
  };

  const handleCompleteMedIconClick = (index) => {
    const completedMed = med[index];
    const updateCompletedMeds = [...completedMeds, completedMed];
    const updatedMeds = [...med];
    updatedMeds.splice(index, 1);

    setMed(updatedMeds);
    setCompletedMeds(updateCompletedMeds);

    updateLocalStorageMeds(updatedMeds, updateCompletedMeds);

    setShowModalMed(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Mês é baseado em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleUpdateIconClickVacina = (vacina) => {
    setSelectedVacina(vacina);
    setShowModalVacina(true);
  };

  const handleUpdateIconClickMed = (medicacao) => {
    setSelectedMed(medicacao);
    setShowModalMed(true);
  };

  const handleUpdateVacina = () => {
    if(selectedVacina && descVacina && prazoVacina) {
      const updatedVacinas = vacinas.map((vacina) => 
        vacina === selectedVacina ? {...vacina, descVacina, prazoVacina} : vacina
      );

      setVacinas(updatedVacinas);
      setShowModalVacina(false);

      updateLocalStorageVacina(updatedVacinas, completedVacinas);
    }
  }

  const handleUpdateMed = () => {
    if(selectedMed && descMed && prazoMed) {
      const updatedMeds = med.map((med) => 
        med === selectedMed ? {...med, descMed, prazoMed} : med
      );

      setMed(updatedMeds);
      setShowModalMed(false);

      updateLocalStorageMeds(updatedMeds, completedMeds);
    }
  }

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
      <h2> Próximas vacinas:</h2>

      <div className="cards-container saude-cards">
      {vacinas.map((vacina, index) => (
            <div key={index} className="card">
              <i className="fa fa-cog" aria-hidden="true" onClick={() => handleUpdateIconClickVacina(vacina)}></i>
              <i className="fa fa-check-circle" aria-hidden="true" onClick={() => handleCompleteVacinaIconClick(index)}></i>
              <h2>{vacina.descVacina}</h2>
              <p>{formatDate(vacina.prazoVacina)}</p>
             
            </div>
          ))}
      </div>
      <div className="cards-container saude-cards">
      {completedVacinas.map((vacina, index) => (
            <div key={index} className="card completed">
              <h2>{vacina.descVacina}</h2>
              <p>{formatDate(vacina.prazoVacina)}</p>
            </div>
          ))}
      </div>

      <label>
          Descrição:
          <input
            type="text"
            id="descVacina"
            value={descVacina}
            onChange={(e) => setDesVacina(e.target.value)}
          />
        </label>
        <label>
          Prazo:
          <input
            type="date"
            id="prazoVacina"
            value={prazoVacina}
            onChange={(e) => setPrazoVacina(e.target.value)}
          />
        </label>
        <button className="cadastroVacina-button" onClick={handleCadastroVacina}>
            Cadastrar nova vacina
        </button>

      <h2> Próximas medicações:</h2> 

      <div className="cards-container med-cards">
      {med.map((medicacao, index) => (
            <div key={index} className="card">
              <i
                className="fa fa-cog"
                aria-hidden="true"
                onClick={() => handleUpdateIconClickMed(medicacao)}
              ></i>
              <i
                className="fa fa-check-circle"
                aria-hidden="true"
                onClick={() => handleCompleteMedIconClick(index)}
              ></i>
              <h2>{medicacao.descMed}</h2>
              <p>{formatDate(medicacao.prazoMed)}</p>
            </div>
          ))}
      </div>

      <div className="cards-container med-cards">
      {completedMeds.map((medicacao, index) => (
            <div key={index} className="card completed">
              <h2>{medicacao.descMed}</h2>
              <p>{formatDate(medicacao.prazoMed)}</p>
            </div>
          ))}
      </div>

      <label>
          Descrição:
          <input
            type="text"
            id="descMed"
            value={descMed}
            onChange={(e) => setDesMed(e.target.value)}
          />
        </label>
        <label>
          Prazo:
          <input
            type="date"
            id="prazoMed"
            value={prazoMed}
            onChange={(e) => setPrazoMed(e.target.value)}
          />
        </label>

      <button className="cadastroVacina-button" onClick={handleCadastroMed}>
            Cadastrar nova medicação
      </button>
        
    
    </main> 
    
      <footer>
        © EAJ 2023. Todos os Direitos Reservados.
      </footer>
      {showModalVacina && selectedVacina && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalVacina(false)}>
              &times;
            </span>
            <h2>{selectedVacina.descVacina}</h2>
            <p>{formatDate(selectedVacina.prazoVacina)}</p>
            <label>
              Descrição:
              <input
                type="text"
                id="descVacinaModel"
                value={descVacina}
                onChange={(e) => setDesVacina(e.target.value)}
              />
            </label>
            <label>
              Prazo:
              <input
                type="date"
                id="prazoVacinaModel"
                value={prazoVacina}
                onChange={(e) => setPrazoVacina(e.target.value)}
              />
            </label>
            <button className="cadastroVacina-button" onClick={handleUpdateVacina}>
                Atualizar Vacina
            </button>
            <i
              className="fa fa-trash"
              aria-hidden="true"
              id='trash'
              onClick={() => handleCompleteVacinaIconClick(vacinas.indexOf(selectedVacina))}
            ></i>
          </div>
        </div>
      )}

      {showModalMed && selectedMed && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalMed(false)}>
              &times;
            </span>
            <h2>{selectedMed.descMed}</h2>
            <p>{formatDate(selectedMed.prazoMed)}</p>
            <label>
              Descrição:
              <input
                type="text"
                id="descMedModel"
                value={descMed}
                onChange={(e) => setDesMed(e.target.value)}
              />
            </label>
            <label>
              Prazo:
              <input
                type="date"
                id="prazoMedModel"
                value={prazoMed}
                onChange={(e) => setPrazoMed(e.target.value)}
              />
            </label>
            <button className="cadastroVacina-button" onClick={handleUpdateMed}>
                Atualizar Medicação
            </button>
            <i
              className="fa fa-trash"
              aria-hidden="true"
              id='trash'
              onClick={() => handleCompleteMedIconClick(med.indexOf(selectedMed))}
            ></i>
          </div>
        </div>
      )}
    </div>
 )
}

export default Saude;