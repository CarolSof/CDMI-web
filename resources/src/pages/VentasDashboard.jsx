import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "../styles/VentasDashboard.css";
import { useNavigate } from "react-router-dom";

const VentasDashboard = () => {

  const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    // Verificamos si el usuario tiene el rol adecuado
    if (!token || rol !== "usuario") {
        navigate("/login");  // Si no es administrador, redirigimos a login
        return null;
  }

  const [datos, setDatos] = useState([
    { mes: "Enero", ventas: 1500, crecimiento: 0, porcentaje: "0.00%" },
    { mes: "Febrero", ventas: 2000, crecimiento: 500, porcentaje: "33.33%" },
    { mes: "Marzo", ventas: 1000, crecimiento: -1000, porcentaje: "50%" },
    { mes: "Junio", ventas: 5000, crecimiento: -5000, porcentaje: "50%" },
  ]);

  const barRef = useRef(null);
  const lineRef = useRef(null);
  const barChart = useRef(null);
  const lineChart = useRef(null);

  useEffect(() => {
    initCharts();
    updateCharts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateCharts();
  }, [datos]);

  const initCharts = () => {
    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Ventas",
            data: [],
            backgroundColor: "rgb(129, 41, 41)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    lineChart.current = new Chart(lineRef.current, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Crecimiento",
            data: [],
            borderColor: "rgb(129, 41, 41)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  };

  const updateCharts = () => {
    const labels = datos.map((d) => d.mes);
    const ventas = datos.map((d) => d.ventas);
    const crecimiento = datos.map((d) => d.crecimiento);

    barChart.current.data.labels = labels;
    barChart.current.data.datasets[0].data = ventas;
    barChart.current.update();

    lineChart.current.data.labels = labels;
    lineChart.current.data.datasets[0].data = crecimiento;
    lineChart.current.update();
  };

  const handleEdit = (index, key, value) => {
    const updated = [...datos];
    const oldVentas = updated[index].ventas;
    updated[index][key] = parseFloat(value) || 0;

    if (key === "ventas") {
      const prev = index > 0 ? updated[index - 1].ventas : 0;
      const crecimiento = updated[index].ventas - prev;
      const porcentaje = prev ? ((crecimiento / prev) * 100).toFixed(2) + "%" : "0.00%";
      updated[index].crecimiento = crecimiento;
      updated[index].porcentaje = porcentaje;
    }

    setDatos(updated);
  };

  return (
    <div className="d-flex">
      <aside className="sidebar vh-100 text-center p-3">
        <img src="/img/logocdmi.png" width="70" alt="CDMI Logo" className="header-logo" />
        <h5 className="text-light">CDMI</h5>
        <p className="text-light mb-4">Administrador</p>
        <a href="/logout" className="close-session">Cerrar sesión</a>
        <hr className="bg-light" />
        <nav className="nav flex-column">
          <a className="nav-link text-white" href="/ventas">Ventas</a>
          <a className="nav-link text-white" href="/PRODUCTOSADMIN">Productos</a>
          <a className="nav-link text-white" href="/DONACIONESADMIN">Donaciones</a>
          <a className="nav-link text-white" href="/EVENTOSADMIN">Eventos</a>
        </nav>
      </aside>

      <main id="content">
        <h1>Ventas</h1>
        <table id="dataTable">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Ventas</th>
              <th>Crecimiento</th>
              <th>% de Crecimiento</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                <td>{fila.mes}</td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleEdit(index, "ventas", e.target.innerText)}
                >
                  {fila.ventas}
                </td>
                <td>{fila.crecimiento}</td>
                <td>{fila.porcentaje}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="charts">
          <div className="chart-container">
            <canvas ref={barRef}></canvas>
          </div>
          <div className="chart-container">
            <canvas ref={lineRef}></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VentasDashboard;
