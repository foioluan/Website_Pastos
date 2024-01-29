import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {inputEmail, inputPassword, localObject, inputElement} from './User.js';

const LogIn = () => {
  
  const navigate = useNavigate(); // Obtém a função de navegação (resposável por trocar de páginas)

  const [action, setAction] = useState("Sign Up");

  //Limpa os inputs
  const clearInputs = () => {
    inputElement = document.getElementById('email');
    inputElement.value = "";
    inputElement = document.getElementById('password');
    inputElement.value = "";
  }

  const login = () => {
    //Lógica de login
    inputElement = document.getElementById('email');
    inputEmail = inputElement.value;
    inputElement = document.getElementById('password');
    inputPassword = inputElement.value;
    localObject = JSON.parse(localStorage.getItem(inputEmail)); // Busca o usuário digitado
    if (localObject) { // Verifica se existe o usuário digitado
      if(inputPassword==localObject.password){ // Verifica se a senha está correta
        alert("Logado com sucesso!");
        navigate('/principal');
      }else{
        alert("Senha incorreta!");

      }
    } else {
      alert("Usuário não identificado!")
    }
    clearInputs();
  };

  const signUp = () => {
    navigate('/registro'); // Navega para a página de registro
  };

  const forgotPassword = () => {
    navigate('/forgotPassword'); 
  };

  return (
    <>
      {/* <!-- Página de Log In --> */}
      <div className="wrapped">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">  </div>
            <div className="col-md-6 right">
              <div className="logo-image"></div>
              
              <div className="logo-container">
                <img src="/logo.png" alt="Logo da Pastos" className="logo-image" />
              </div>


              <div className="input-box">
                <header>Acesse sua conta</header>
                <div className="input-field">
                  <input type="text" className="input" id="email" required autoComplete="off" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input type="password" className="input" id="password" required />
                  <label htmlFor="password">Senha</label>
                </div>

                <div className="forgotPassword">
                  <a href='#' onClick={forgotPassword} className="forgotPasswordLink">Esqueceu a senha?</a>
                </div>

                <div className="input-field">
                  <input type="submit" className="submit" value="Entrar" id="loginBtn" onClick={login} />
                </div>
                <div className="signIn">
                  Ainda não tem uma conta? <a href='#' id="signUpBtn" onClick={signUp}> Crie uma aqui!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Página de Log In --> */}
    </>
  );
};

export default LogIn;
