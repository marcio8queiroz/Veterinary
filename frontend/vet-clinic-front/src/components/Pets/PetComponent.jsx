import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPet, getPetById, updatePet } from "../../services/PetService";
import { getAllClients } from "../../services/ClientService";

const PetComponent = () => {
  const [name, setName] = useState("");
  const [specie, setSpecie] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [observations, setObservations] = useState("");

  // for clients

  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClients()
      .then((response) => {
        console.log(response.data);

        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPetById(id)
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setSpecie(response.data.specie);
          setBreed(response.data.breed);
          setColor(response.data.color);
          setHeight(response.data.height);
          setWeight(response.data.weight);
          setGender(response.data.gender);

          setBirthDate(response.data.birthDate.split("T")[0]);

          setFather(response.data.father);
          setMother(response.data.mother);
          setObservations(response.data.observations);

          setClient(response.data.client._id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    client: "",
    name: "",
    specie: "",
    breed: "",
    color: "",
    height: "",
    weight: "",
    gender: "",
    birthDate: "",
    father: "",
    mother: "",
    observations: "",
  });

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Atualizar Pet</h2>;
    } else {
      return <h2 className="text-center">Adicionar Pet</h2>;
    }
  }

  function saveOrUpdatePet(e) {
    e.preventDefault();

    if (validateForm()) {
      const pet = {
        client,
        name,
        specie,
        breed,
        color,
        height,
        weight,
        gender,
        birthDate,
        father,
        mother,
        observations,
      };

      // console.log(pet);

      if (id) {
        updatePet(id, pet)
          .then((response) => {
            console.log(response.data);
            navigator("/pets");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createPet(pet)
          .then((response) => {
            console.log(response.data);
            navigator("/pets");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } //validate form
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (client) {
      errorsCopy.client = "";
    } else {
      errorsCopy.client = "Selecione o Cliente";
      valid = false;
    }

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Nome é obrigatório";
      valid = false;
    }

    if (specie.trim()) {
      errorsCopy.specie = "";
    } else {
      errorsCopy.specie = "Espécie é obrigatório";
      valid = false;
    }

    if (breed.trim()) {
      errorsCopy.breed = "";
    } else {
      errorsCopy.breed = "Raça é obrigatório";
      valid = false;
    }

    if (color.trim()) {
      errorsCopy.color = "";
    } else {
      errorsCopy.color = "Cor é obrigatório";
      valid = false;
    }

    if (height && !isNaN(height) && height > 0) {
      errorsCopy.height = "";
    } else {
      errorsCopy.height = "A altura é obrigatória e deve ser um número positivo.";
      valid = false;
    }

    if (weight && !isNaN(weight) && weight > 0) {
      errorsCopy.weight = "";
    } else {
      errorsCopy.weight = "O peso é obrigatório e deve ser um número positivo.";
      valid = false;
    }

    if (gender.trim()) {
      errorsCopy.gender = "";
    } else {
      errorsCopy.gender = "Gênero é obrigatório";
      valid = false;
    }

    if (birthDate.trim()) {
      errorsCopy.birthDate = "";
    } else {
      errorsCopy.birthDate = "Data de nascimento é obrigatório";
      valid = false;
    }

    if (father.trim()) {
      errorsCopy.father = "";
    } else {
      errorsCopy.father = "Pai é necessário";
      valid = false;
    }

    if (mother.trim()) {
      errorsCopy.mother = "";
    } else {
      errorsCopy.mother = "Mãe é necessário";
      valid = false;
    }

    if (observations.trim()) {
      errorsCopy.observations = "";
    } else {
      errorsCopy.observations = "Observações é necessário";
      valid = false;
    }

    setErrors(errorsCopy);

    console.log(errorsCopy);

    return valid;
  } //validateForm

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-10 offset-md-1 offset-md-1">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Selecionar Cliente:</label>
                <select
                  className={`form-control ${
                    errors.client ? "is-invalid" : ""
                  }`}
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                >
                  <option value="Select Client">Selecionar Cliente</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>

                {errors.client && (
                  <div className="invalid-feedback">{errors.client}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Nome:</label>
                <input
                  type="text"
                  placeholder="nome"
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
                <label className="form-label">Espécie:</label>
                <input
                  type="text"
                  placeholder="espécie"
                  name="text"
                  value={specie}
                  onChange={(e) => setSpecie(e.target.value)}
                  className={`form-control ${
                    errors.specie ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.specie && (
                  <div className="invalid-feedback">{errors.specie} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Raça:</label>
                <input
                  type="text"
                  placeholder="raça"
                  name="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className={`form-control ${errors.breed ? "is-invalid" : ""}`}
                ></input>
                {errors.breed && (
                  <div className="invalid-feedback">{errors.breed} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Cor:</label>
                <input
                  type="text"
                  placeholder="cor"
                  name="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={`form-control ${errors.color ? "is-invalid" : ""}`}
                ></input>
                {errors.color && (
                  <div className="invalid-feedback">{errors.color} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Altura:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`form-control ${
                    errors.height ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.height && (
                  <div className="invalid-feedback">{errors.height} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Peso:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`form-control ${
                    errors.weight ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.weight && (
                  <div className="invalid-feedback">{errors.weight} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Gênero:</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Selecione o Gênero</option>
                  <option value="Macho">Macho</option>
                  <option value="Femea">Fêmea</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Data de Nascimento:</label>
                <input
                  type="date"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`form-control ${
                    errors.birthDate ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.birthDate && (
                  <div className="invalid-feedback">{errors.birthDate} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Pai:</label>
                <input
                  type="text"
                  placeholder="father"
                  name="father"
                  value={father}
                  onChange={(e) => setFather(e.target.value)}
                  className={`form-control ${
                    errors.father ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.father && (
                  <div className="invalid-feedback">{errors.father} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Mãe:</label>
                <input
                  type="text"
                  placeholder="mother"
                  name="mother"
                  value={mother}
                  onChange={(e) => setMother(e.target.value)}
                  className={`form-control ${
                    errors.mother ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.mother && (
                  <div className="invalid-feedback">{errors.mother} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Observações:</label>
                <textarea
                  placeholder="observações"
                  name="observations"
                  rows="5"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className={`form-control ${
                    errors.observations ? "is-invalid" : ""
                  }`}
                ></textarea>
                {errors.name && (
                  <div className="invalid-feedback">{errors.observations} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdatePet}>
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetComponent;
