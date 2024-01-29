import Login from './Login';
import Principal from './Principal';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Code from './Code';
import Agenda from './components/Agenda/Agenda.jsx';
import Rebanho from './components/Rebanho/Rebanho';
import Ovelhas from './components/Rebanho/Ovelhas/ovelhas';
import Bodes from './components/Rebanho/Bodes/bodes';
import Cabras from './components/Rebanho/Cabras/cabras';

import AnimalCadastro from './components/Rebanho/cadastroAnimal';
import Saude from './components/Saude/Saude';
import {animalId} from './Animal.js';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/code' element={<Code />} />

        <Route path='/principal' element={<Principal />} />
        <Route path='/agenda' element={<Agenda/>}/>
        <Route path="/rebanho" element={<Rebanho/>} />
        <Route path="/ovelhas" element={<Ovelhas/>} />
        <Route path="/bodes" element={<Bodes/>} />
        <Route path="/cabras" element={<Cabras/>} />

        <Route path='/cadastroAnimal' element={<AnimalCadastro/>}/>
        <Route path='/saude' element={<Saude/>} />


      </Routes>
    </Router>
  );
}

document.addEventListener('keydown', function(event) {
  if(event.ctrlKey && event.altKey && event.key === 'p'){
    localStorage.clear();
    animalId = 1; // retroscede a auto-incrementação dos id's
  }
});

export default App;
