import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import {object, localIndex, localObject, inputElement, inputEmail, inputName, inputPassword} from './User.js'

const Register = () => {

  const navigate = useNavigate(); // Obtém a função de navegação (resposável por trocar de páginas)

  const [action, setAction] = useState("Sign Up");

  const clearEmailInput = () => {
    inputElement = document.getElementById('email');
    inputElement.value = "";
  }

  const register = () => {
    //Lógica de registro
    inputElement = document.getElementById('name');
    inputName = inputElement.value;
    inputElement = document.getElementById('email');
    inputEmail = inputElement.value;
    inputElement = document.getElementById('password');
    inputPassword = inputElement.value;
    object = {nome: inputName, email: inputEmail, password: inputPassword}; // Armazena oq o usuário digitou em um objeto
    localIndex = object.email;
    if(!(inputEmail.includes("@gmail.com")) && !(inputEmail.includes("@hotmail.com")) && !(inputEmail.includes("@ufrn.edu.br"))){ // Verifica se o email é válido
        alert("Email inválido!");
        clearEmailInput();
    }else{
        localObject = JSON.parse(localStorage.getItem(inputEmail));
        if(localObject){ // Verifica se já existe um usuário com esse email
            alert("Já existe um usuário com esse email!");
        }else{
            localStorage.setItem(localIndex, JSON.stringify(object)); // armazena o usuário no localstorage
            alert("Usuário Registrado!");
            navigate('/login'); // volta para a tela de login
        }
    }
  };

  return (
    <>
      {/* <!-- Página de Registro --> */}
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">  </div>
            <div className="col-md-6 right">

              <div className="logo-container">
                <img src="/logo.png" alt="Logo da Pastos" className="logo-image" />
              </div>


              <div className="input-box">
                <header>Crie sua conta</header>
                <div className="input-field">
                  <input type="text" className="input" id="name" required autoComplete="off" />
                  <label htmlFor="name">Nome</label>
                </div>
                <div className="input-field">
                  <input type="text" className="input" id="email" required autoComplete="off" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input type="password" className="input" id="password" required />
                  <label htmlFor="password">Senha</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Registrar-se" id="registerBtn" onClick={register} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Página de Registro --> */}
    </>
  );
};

export default Register;
