import React, { useEffect, useState } from "react";
import { getAllConsultations } from "../../services/ConsultationService";

const ConsultationsReport = () => {
  const [consultations, setConsultations] = useState([]);

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

  // Brazilian date format(dd/mm/yyyy)
  function formatDate(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("pt-BR", options);
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Lista de Consultas</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th style={{ width: "100px" }}>Id</th> */}
            <th>Data</th>
            <th>Valor</th>
            <th>Veterinário</th>
            <th>Pet</th>

            <th>Procedimentos</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation._id}>
              {/* <td>{consultation._id}</td> */}
              {/* <td>{consultation.theDate}</td> */}
              <td>{formatDate(consultation.theDate)}</td>
              <td>{consultation.totalCost}</td>
              <td>{consultation.vet.name}</td>
              <td>{consultation.pet.name}</td>

              <td>
                {consultation.procedures.map((procedure) => (
                  <div key={procedure._id}>
                    {procedure.name} - R$ {procedure.price}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationsReport;
