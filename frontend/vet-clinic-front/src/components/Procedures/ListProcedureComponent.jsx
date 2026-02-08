import React, { useEffect, useState } from "react";
import {
  deleteProcedure,
  getAllProcedures,
} from "../../services/ProcedureService";
import { useNavigate } from "react-router-dom";

const ListProcedureComponent = () => {
  const [procedures, setProcedures] = useState([]);

  const navigator = useNavigate();

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

  function addNewProcedure() {
    navigator("/add-procedure");
  }

  function updateProcedure(id) {
    navigator(`/edit-procedure/${id}`);
  }

  function removeProcedure(id) {
    deleteProcedure(id)
      .then((response) => {
        console.log(response.data);
        listOfProcedures();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Lista de Procedimentos</h2>
      <button className="btn btn-success" onClick={addNewProcedure}>
        Adicionar Procedimentos
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>nome</th>
            <th>preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure) => (
            <tr key={procedure._id}>
              <td>{procedure._id}</td>
              <td>{procedure.name}</td>
              <td>{procedure.price}</td>
              <td>
                <button
                  onClick={() => updateProcedure(procedure._id)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => removeProcedure(procedure._id)}
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProcedureComponent;
