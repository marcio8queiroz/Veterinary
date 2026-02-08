import React, { useEffect, useState } from "react";
import { deletePet, getAllPets } from "../../services/PetService";
import { useNavigate } from "react-router-dom";

const ListPetComponent = () => {
  const [pets, setPets] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listOfPets();
  }, []);

  function listOfPets() {
    getAllPets()
      .then((response) => {
        // console.log(response.data);
        setPets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewPet() {
    navigator("/add-pet");
  }

  function updatePet(id) {
    navigator(`/edit-pet/${id}`);
  }

  function removePet(id) {
    deletePet(id)
      .then((response) => {
        console.log(response.data);
        listOfPets();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Lista de Pets</h2>
      <button className="btn btn-success" onClick={addNewPet}>
        Adicionar Pet
      </button>

      <table className="table table-striped ">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Cliente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>{pet._id}</td>
              <td>{pet.name}</td>
              <td>{pet.client.name}</td>
              <td>
                <button
                  onClick={() => updatePet(pet._id)}
                  className="btn btn-info"
                >
                  Update
                </button>

                <button
                  onClick={() => removePet(pet._id)}
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

export default ListPetComponent;
