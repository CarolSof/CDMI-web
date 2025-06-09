// src/components/Sidebar.js
import React from 'react';

export default function Sidebar() {
  return (
    <div className="ad-sidebar position-fixed">
      <div className="ad-content">
        <h3>CDMIO</h3>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
                Datos 1
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>¿Sabías que la población indígena cubre el 6.2% de la población a nivel mundial?</strong>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Datos 2
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>De los 7.000 idiomas que existen, la mayoría son lenguas indígenas.</strong>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Datos 3
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>Es vital reducir la pobreza, estigmatización y exclusión social, resaltando la importancia de su cultura, su cosmovisión y saberes ancestrales.</strong>
              </div>
            </div>
          </div>
        </div>
        <img src="/img/indigena 6.jpg" alt="Anuncio" />
      </div>
    </div>
  );
}
