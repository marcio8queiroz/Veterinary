import React, { useEffect, useState } from "react";
import { getAllPets } from "../../services/PetService";

const PetsReport = () => {
  const [pets, setPets] = useState([]);

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

  return (
    <div className="container">
      <br />
      <h2 className="text-center">Lista de Pets</h2>

      <table className="table  ">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Cliente</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Cor</th>
            <th>Gênero</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>{pet._id}</td>
              <td>{pet.name}</td>
              <td>{pet.client.name}</td>
              <td>{pet.specie}</td>
              <td>{pet.breed}</td>
              <td>{pet.color}</td>
              <td>{pet.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetsReport;
