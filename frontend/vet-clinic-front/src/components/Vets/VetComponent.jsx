import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVet, getVetById, updateVet } from "../../services/VetService";

const VetComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("AC");

  const { id } = useParams();

  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cellPhone: "",
    address: "",
    state: "",
  });

  useEffect(() => {
    if (id) {
      getVetById(id)
        .then((response) => {
          //console.log(response.data.name);

          setName(response.data.name);
          setEmail(response.data.email);
          setCellPhone(response.data.cellPhone);
          setAddress(response.data.address);
          setState(response.data.state);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveorUpdateVet(e) {
    e.preventDefault();
    if (validateForm()) {
      const vet = { name, email, cellPhone, address, state };

      if (id) {
        updateVet(id, vet)
          .then((response) => {
            //console.log(response.data);
            navigator("/vets");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createVet(vet)
          .then((response) => {
            //console.log(response.data);
            navigator("/vets");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Nome é obrigatório";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email é obrigatório";
      valid = false;
    }

    if (cellPhone.trim()) {
      errorsCopy.cellPhone = "";
    } else {
      errorsCopy.cellPhone = "celular é obrigatório";
      valid = false;
    }

    if (address.trim()) {
      errorsCopy.address = "";
    } else {
      errorsCopy.address = "Endereço é obrigatório";
      valid = false;
    }

    if (state.trim()) {
      errorsCopy.state = "";
    } else {
      errorsCopy.state = "Estado é obrigatório";
      valid = false;
    }

    setErrors(errorsCopy);

    //  console.log(errorsCopy);

    return valid;
  } //validateForm

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Vet</h2>;
    } else {
      return <h2 className="text-center">Adicionar Veterinário</h2>;
    }
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-10 offset-md-1 offset-md-1">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Nome:</label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback">{errors.name} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback">{errors.email} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Celular:</label>
                <input
                  type="email"
                  placeholder="cellPhone"
                  name="cellPhone"
                  value={cellPhone}
                  onChange={(e) => setCellPhone(e.target.value)}
                  className={`form-control ${
                    errors.cellPhone ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback">{errors.cellPhone} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Endereço:</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.address && (
                  <div className="invalid-feedback">{errors.address} </div>
                )}
              </div>

              <div className="form-group mb-2">
                {/* States of Brazil */}
                <label className="form-label">Estado:</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`form-control ${errors.state ? "is-invalid" : ""}`}
                >
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
                {errors.state && (
                  <div className="invalid-feedback">{errors.state} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveorUpdateVet}>
                {" "}
                Save{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetComponent;
