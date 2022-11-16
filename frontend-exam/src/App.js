import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./UsersPage";
import ItemsPage from "./ItemsPage";
import Home from "./Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
