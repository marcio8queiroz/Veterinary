import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
const navigate = useNavigate();

  const handleLogout = () => {
        localStorage.removeItem('token'); //remove o crachá de acesso do usuário
        // console.log("Usuário deslogado");
        navigate('/');
    };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/dashboard">
              Clinica Veterinária
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/clients"
                  >
                    Clientes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/pets">
                    Pets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vets">
                    Veterinários
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/procedures">
                    Procedimentos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/consultations">
                    Consultas
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/reports">
                    Relatórios
                  </a>
                </li>
              </ul>

              <div className="d-flex ms-auto align-items-center">
                <span className="text-ligth me-3 small">Olá, Veterinário!</span>
                <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
