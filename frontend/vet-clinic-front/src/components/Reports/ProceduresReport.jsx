import React, { useEffect, useState } from "react";
import { getAllProcedures } from "../../services/ProcedureService";

const ProceduresReport = () => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    listOfProcedures();
  }, []);

  function listOfProcedures() {
    getAllProcedures()
      .then((response) => {
        // console.log(response.data);
        setProcedures(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Lista de Procedimentos</h2>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "250px" }}>Id</th>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure) => (
            <tr key={procedure._id}>
              <td>{procedure._id}</td>
              <td>{procedure.name}</td>
              <td>{procedure.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProceduresReport;
