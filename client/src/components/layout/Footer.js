import React from 'react';

export default () => {
  return (
    <footer className="container-fluid bg-dark text-white mt-5 p-4 text-center ">
      <div className="row">
        <div className="col">
          <div className="container">
      Copyright &copy; {new Date().getFullYear()} L'Affar
      </div>
      </div>
      </div>
      </footer>
  );
};
