import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { localObject, inputElement, inputEmail } from './User.js'

const clearInputs = () => {
  inputElement = document.getElementById('email');
  inputElement.value = "";
}

const ForgotPassword = () => {

    const navigate = useNavigate(); // Obtém a função de navegação (responsável por trocar de páginas)

    const [action, setAction] = useState("Sign Up");
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      inputElement = document.getElementById('email');
      inputEmail = inputElement.value;
  
        localObject = JSON.parse(localStorage.getItem(inputEmail)); // Busca o usuário digitado
        if (localObject) { 
            alert(`Um e-mail de recuperação foi enviado para ${inputEmail}`);
            navigate('/code'); // Redireciona para a página de redefinição
        } else {
            alert("O e-mail digitado não está associado a nenhuma conta.");
            clearInputs();
        }
  
    };

  return (
    <>
      {/* <!-- Layout da página --> */}
      <div className="wrapped">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 forgot-image"> </div>
            <div className="col-md-6 right">
              <div className="logo-container">
                <img src="/logo.png" alt="Logo da Pastos" className="logo-image" />
              </div>

              <div className="input-box">
                <header>Recuperação da senha</header>

                <div className="input-field">
                  <input type="text" className="input" id="email" required autoComplete="off" />
                  <label htmlFor="email">Digite seu e-mail </label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Enviar código de recuperação" id="button" onClick={handleSubmit} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Layout da página --> */}
    </>
  );
};



export default ForgotPassword;

