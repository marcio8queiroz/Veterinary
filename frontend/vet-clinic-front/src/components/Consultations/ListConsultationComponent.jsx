import React, { useEffect, useState } from "react";
import {
  deleteConsultation,
  getAllConsultations,
} from "../../services/ConsultationService";
import { useNavigate } from "react-router-dom";

const ListConsultationComponent = () => {
  const [consultations, setConsultations] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listOfConstultations();
  }, []);

  function listOfConstultations() {
    getAllConsultations()
      .then((response) => {
        // console.log(response.data);
        setConsultations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewConsultation() {
    navigator("/add-consultation");
  }

  function removeConsultation(id) {
    deleteConsultation(id)
      .then((response) => {
        console.log(response.data);
        listOfConstultations();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Brazilian date format (dd/mm/yyyy)
  function formatDate(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("pt-BR", options);
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Lista de Consultas</h2>
      <button className="btn btn-success" onClick={addNewConsultation}>
        Adicionar Consultas
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th style={{ width: "100px" }}>Id</th> */}
            <th>Data</th>
            <th>Valor</th>

            <th>Pet</th>

            <th>Procedimentos</th>
            <th>ações</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation._id}>
              {/* <td>{consultation._id}</td> */}
              {<td>{formatDate(consultation.theDate)}</td> }
              {/* <td>{consultation.theDate}</td> */}
              <td>{consultation.totalCost}</td>

              <td>{consultation.pet.name}</td>

              <td>
                {consultation.procedures.map((procedure) => (
                  <div key={procedure._id}>
                    {procedure.name} - $ {procedure.price}
                  </div>
                ))}
              </td>
              <td>
                <button
                  onClick={() => removeConsultation(consultation._id)}
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

export default ListConsultationComponent;
