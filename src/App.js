import "./App.css";
import Home from "./views/Home/Home";
import ListView from "./views/ListView/ListView";
import { Route, Routes } from "react-router-dom";
import DetailView from "./views/Details/DetailView";
import Login from "./views/Login/Login";
import AdminPage from "./views/AdminPage/AdminPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/admin" element={<Login />}></Route>
        <Route exact path="/admin_page" element={<AdminPage />}></Route>{" "}
        {/* ELIMINAR ESTA RUTA!!!!*/}
        <Route exact path="/categorys/:category" element={<ListView />}></Route>
        <Route
          exact
          path="categorys/:category/:id"
          element={<DetailView />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
