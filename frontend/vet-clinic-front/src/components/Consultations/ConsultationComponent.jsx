import React, { useEffect, useState } from "react";
import { getAllPets } from "../../services/PetService";
import { getAllVets } from "../../services/VetService";
import { createConsultation } from "../../services/ConsultationService";
import { getAllProcedures } from "../../services/ProcedureService";
import { useNavigate } from "react-router-dom";

const ConsultationComponent = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [theDate, setTheDate] = useState("");

  // Vet and pet
  const [vet, setVet] = useState("");
  const [vets, setVets] = useState([]);
  const [pet, setPet] = useState("");
  const [pets, setPets] = useState([]);

  // Procedures
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedProcedures, setSelectedProcedures] = useState([]);

  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    vet: "",
    pet: "",
    // totalCost: "",
    theDate: "",
    procedures: "",
  });

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (vet) {
      errorsCopy.vet = "";
    } else {
      errorsCopy.vet = "Select Vet";
      valid = false;
    }

    if (pet) {
      errorsCopy.pet = "";
    } else {
      errorsCopy.pet = "Select Pet";
      valid = false;
    }

    if (theDate.trim()) {
      errorsCopy.theDate = "";
    } else {
      errorsCopy.theDate = "Date is required";
      valid = false;
    }

    if (selectedProcedures.length > 0) {
      errorsCopy.procedures = "";
    } else {
      errorsCopy.procedures = "At least one procedure must be selected";
      valid = false;
    }

    setErrors(errorsCopy);

    console.log(errorsCopy);

    return valid;
  } //validateForm

  useEffect(() => {
    getAllPets()
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => console.error(error));

    getAllVets()
      .then((response) => {
        setVets(response.data);
      })
      .catch((error) => console.error(error));

    getAllProcedures()
      .then((response) => {
        setProcedures(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function addProcedure() {
    const procedureToAdd = procedures.find(
      (proc) => proc._id === selectedProcedure
    );
    if (procedureToAdd && !selectedProcedures.includes(procedureToAdd)) {
      setSelectedProcedures([...selectedProcedures, procedureToAdd]);
      updateTotalCost([...selectedProcedures, procedureToAdd]);
    }
  }

  function removeProcedure(procedureId) {
    const updatedProcedures = selectedProcedures.filter(
      (procedure) => procedure._id !== procedureId
    );
    setSelectedProcedures(updatedProcedures);
    updateTotalCost(updatedProcedures);
  }

  function updateTotalCost(proceduresList) {
    let cost = proceduresList.reduce(
      (total, procedure) => total + procedure.price,
      0
    );
    setTotalCost(cost);
  }

  function saveConsultation(e) {
    e.preventDefault();
    if (validateForm()) {
      const consultation = {
        theDate,
        totalCost,
        vet,
        pet,
        procedures: selectedProcedures.map((procedure) => procedure._id),
      };

      createConsultation(consultation)
        .then((response) => {
          console.log(response.data);
          navigator("/consultations");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Brazilian date format (dd/mm/yyyy)
  function formatDateToInput(value) {
    if (value) {
      const [day, month, year] = value.split("/");
      return `${year}-${month}-${day}`;
    }
    return "";
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-10 offset-md-1">
          <h2 className="text-center">Adicionar Consultas</h2>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-2">
                    <label className="form-label">Data:</label>
                    <input
                      type="date"
                      name="theDate"
                      value={theDate}
                      onChange={(e) => setTheDate(e.target.value)}
                      className={`form-control ${
                        errors.theDate ? "is-invalid" : ""
                      }`}
                    />
                    {errors.theDate && (
                      <div className="invalid-feedback">{errors.theDate}</div>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Selecione o Veterinário:</label>
                    <select
                      className={`form-control ${
                        errors.vet ? "is-invalid" : ""
                      }`}
                      value={vet}
                      onChange={(e) => setVet(e.target.value)}
                    >
                      <option value="Select Vet">Select Vet</option>
                      {vets.map((vet) => (
                        <option key={vet._id} value={vet._id}>
                          {vet.name}
                        </option>
                      ))}
                    </select>
                    {errors.vet && (
                      <div className="invalid-feedback">{errors.vet}</div>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Selecione o Pet:</label>
                    <select
                      className={`form-control ${
                        errors.pet ? "is-invalid" : ""
                      }`}
                      value={pet}
                      onChange={(e) => setPet(e.target.value)}
                    >
                      <option value="Select Pet">Select Pet</option>
                      {pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>
                          {/* {pet.name} {pet.client.name} */}
                          {pet.name}
                        </option>
                      ))}
                    </select>
                    {errors.pet && (
                      <div className="invalid-feedback">{errors.pet}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-2">
                    <label className="form-label ">Selecione o Procedimento:</label>
                    <select
                      className={`form-control ${
                        errors.procedures ? "is-invalid" : ""
                      }`}
                      value={selectedProcedure}
                      onChange={(e) => setSelectedProcedure(e.target.value)}
                    >
                      <option value="">Select Procedure</option>
                      {procedures.map((procedure) => (
                        <option key={procedure._id} value={procedure._id}>
                          {procedure.name} - $ {procedure.price}
                        </option>
                      ))}
                    </select>
                    {errors.procedures && (
                      <div className="invalid-feedback">
                        {errors.procedures}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addProcedure}
                    >
                      Adicione o Procedimento
                    </button>
                  </div>

                  <div className="form-group mb-2 ">
                    <h5>Selected Procedures:</h5>
                    <ul>
                      {selectedProcedures.map((procedure) => (
                        <li
                          key={procedure._id}
                          style={{ marginBottom: "10px" }}
                        >
                          {procedure.name} - $ {procedure.price}{" "}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeProcedure(procedure._id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="form-group mb-2">
                    <label
                      className="form-label text-danger fw-bold"
                      // style={{ fontWeight: "bold", color: "red" }}
                    >
                      Total Cost:
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={totalCost}
                      readOnly
                      // className={`form-control text-danger fw-bold ${
                      //   errors.totalCost ? "is-invalid" : ""
                      // }`}
                      className="form-control text-danger fw-bold"
                      // style={{ fontWeight: "bold", color: "red" }}
                    />
                  </div>
                </div>
              </div>
              <br />

              <div className="form-group mb-2 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={saveConsultation}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationComponent;
