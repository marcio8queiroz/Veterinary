import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Imports de Componentes
import ClientComponent from "./components/Clients/ClientComponent";
import ListClientComponent from "./components/Clients/ListClientComponent";
import HeaderComponent from "./components/HeaderComponent";
import IndexComponent from "./components/IndexComponent";
import ListPetComponent from "./components/Pets/ListPetComponent";
import PetComponent from "./components/Pets/PetComponent";
import ListVetComponent from "./components/Vets/ListVetComponent";
import VetComponent from "./components/Vets/VetComponent";
import ListProcedureComponent from "./components/Procedures/ListProcedureComponent";
import ProcedureComponent from "./components/Procedures/ProcedureComponent";
import ListConsultationComponent from "./components/Consultations/ListConsultationComponent";
import ConsultationComponent from "./components/Consultations/ConsultationComponent";
import ListReportComponent from "./components/Reports/ListReportComponent";
import ClientsReport from "./components/Reports/ClientsReport";
import VetsReport from "./components/Reports/VetsReport";
import PetsReport from "./components/Reports/PetsReport";
import ProceduresReport from "./components/Reports/ProceduresReport";
import ConsultationsReport from "./components/Reports/ConsultationsReport";

// Import do novo componente de Login
import LoginComponent from "./components/Login/LoginComponent";

/**
 * Componente de Layout que inclui o Header.
 * O componente <Outlet /> indica onde as rotas filhas serão renderizadas.
 */
const MainLayout = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login - Independente (Sem Header) */}
        <Route path="/" element={<LoginComponent />} />

        {/* Grupo de Rotas que UTILIZAM o Header */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<IndexComponent />} />
          
          {/* Clientes */}
          <Route path="/clients" element={<ListClientComponent />} />
          <Route path="/add-client" element={<ClientComponent />} />
          <Route path="/edit-client/:id" element={<ClientComponent />} />
          
          {/* Pets */}
          <Route path="/pets" element={<ListPetComponent />} />
          <Route path="/add-pet" element={<PetComponent />} />
          <Route path="/edit-pet/:id" element={<PetComponent />} />
          
          {/* Veterinários */}
          <Route path="/vets" element={<ListVetComponent />} />
          <Route path="/add-vet" element={<VetComponent />} />
          <Route path="/edit-vet/:id" element={<VetComponent />} />
          
          {/* Procedimentos */}
          <Route path="/procedures" element={<ListProcedureComponent />} />
          <Route path="/add-procedure" element={<ProcedureComponent />} />
          <Route path="/edit-procedure/:id" element={<ProcedureComponent />} />
          
          {/* Consultas */}
          <Route path="/consultations" element={<ListConsultationComponent />} />
          <Route path="/add-consultation" element={<ConsultationComponent />} />
          
          {/* Relatórios */}
          <Route path="/reports" element={<ListReportComponent />} />
          <Route path="/reports/clientsreport" element={<ClientsReport />} />
          <Route path="/reports/vetsreport" element={<VetsReport />} />
          <Route path="/reports/petsreport" element={<PetsReport />} />
          <Route path="/reports/proceduresreport" element={<ProceduresReport />} />
          <Route path="/reports/consultationsreport" element={<ConsultationsReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;