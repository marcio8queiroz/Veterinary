import React from "react";

const IndexComponent = () => {
  return (
    <>
      <div className="alert alert-warning text-center" role="alert">
        <h2>Clinica Veterinária</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img
              className="mx-auto d-block"
              src="/main-image.jpg"
              alt="Vet Clinic"
              style={{ maxWidth: "95%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexComponent;
