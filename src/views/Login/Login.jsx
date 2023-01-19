import "./login.css";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../aplication/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const HandleSubmit = async (e) => {
    const errorHandler = (message) => {
      switch (message) {
        case "auth/network-request-failed":
          return toast.error("Problemas al conectar con el servidor");
          break;
        case "auth/invalid-email":
          return toast.error("Correo electronico incorrecto");
          break;
        case "auth/wrong-password":
          return toast.error("Contrasena incorrecta");
          break;
        default:
          return toast.error(
            "Upss... algo salio mal, revise sus datos e intente otra vez"
          );
      }
    };

    e.preventDefault();
    // Escribir la logica de autenticacion aqui
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // Signed in
        const user = response.user;
        navigate("/admin_page");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        errorHandler(error.code);
      });
  };

  return (
    <form className="login-container" onSubmit={HandleSubmit}>
      <ToastContainer />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
        required
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
        required
      ></input>
      <button type="submit" className="input-btn">
        Entrar
      </button>
      {error && (
        <h5 className="error-message">Email o contraseña incorrectos</h5>
      )}
    </form>
  );
};

export default Login;
