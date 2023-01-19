//======================================================//
// Esta es la pagina de administracion, em el se recoge //
// el menu y se condiciona el reenderizado de el        //
// componente AdminCategory                             //
//======================================================//

import React, { useState, useEffect } from "react";
import AdminCategorys from "./AdminCategorys";
import "./adminpage.css";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/");
  };

  const [displayCategorys, setDisplayCategorys] = useState(false);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/admin");
    }
  });

  return (
    <section className="admin__page__container">
      <div className="admin__page__buttons__container">
        <button className="admin__page__button" onClick={handleLogout} id="logout">Cerrar sesion</button>
        <button
          className="admin__page__button"
          id="option"
          onClick={() => {setDisplayCategorys(!displayCategorys);}}>Categorias
        </button>
      </div>
      <div className="admin__page__body">
        {displayCategorys && <AdminCategorys />}

      </div>
    </section>
  );
};

export default AdminPage;
