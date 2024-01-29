import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { localObject, inputElement, inputEmail } from './User.js';

let inputCode
let inputNewPassword

const Code = () => {

  const clearInputs = () => {
    if(isCodeCorrect){
      inputElement = document.getElementById('inputNewPassword');
      inputElement.value = "";
    }else{
      inputElement = document.getElementById('code');
      inputElement.value = "";
    }
  }

  const navigate = useNavigate();
  const localCode = 999;

  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    inputElement = document.getElementById('code');
    inputCode = inputElement.value;

    if (inputCode == localCode) {
      alert("Código correto, redefina sua senha.");
      clearInputs();
      setIsCodeCorrect(true);
    } else {
      alert("O código digitado é inválido.");
      clearInputs();
    }


  };

  // Se o código estiver correto, renderiza a tela de redefinição
  if (isCodeCorrect) {
    const newPasswordSubmit = (e) => {
      e.preventDefault();

      inputElement = document.getElementById('inputNewPassword');
      inputNewPassword = inputElement.value;
      localObject = JSON.parse(localStorage.getItem(inputEmail)); // Busca o usuário digitado
      if(localObject){
          if(localObject.password === inputNewPassword){
            alert("A nova senha não pode ser igual a anterior.");
            clearInputs();
          }else{
            localObject.password = inputNewPassword // Modifica a senha
            localStorage.setItem(inputEmail, JSON.stringify(localObject));
            alert("Senha redefinada com sucesso!");
            navigate('/login'); 
          }
      }
    }

    return (
      <>
        {/* <!-- Layout da página de sucesso --> */}
        <div className="wrapped">
          <div className="container main">
            <div className="row">
              <div className="col-md-6 forgot-image"> </div>
              <div className="col-md-6 right">
                <div className="logo-container">
                  <img src="/logo.png" alt="Logo da Pastos" className="logo-image" />
                </div>
              <div className="input-box">
                <header>Redefinição da senha</header>
                <div className="input-field">
                  <input type="password" className="input" id="inputNewPassword" required autoComplete="off" />
                  <label htmlFor="email">Digite sua nova senha </label>
                </div>
                        
                <div className="input-field">
                  <input type="submit" className="submit" value="Salvar" id="button" onClick={newPasswordSubmit} />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Layout da página de sucesso --> */}
      </>
    );
  }

  // Se o código não estiver correto, renderiza a tela padrão
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
                  <input type="text" className="input" id="code" required autoComplete="off" />
                  <label htmlFor="code">Digite o código recebido </label>
                </div>
                
                <div className="input-field">
                  <input type="submit" className="submit" value="Enviar" id="button" onClick={handleSubmit} />
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

export default Code;
