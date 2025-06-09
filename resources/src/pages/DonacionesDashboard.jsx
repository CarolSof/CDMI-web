import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import '../styles/DonacionesDashboard.css';
import { useNavigate } from "react-router-dom";

const data = [
    { fecha: '01/01/2023', cuenta: 'Ingreso anual', debe: 0, haber: 1994.64, saldo: 1994.64, porcentaje: 2.63 },
    { fecha: '01/02/2023', cuenta: 'Donación', debe: 1912.00, haber: 0, saldo: 3907.43, porcentaje: 5.15 },
    { fecha: '01/03/2023', cuenta: 'Venta', debe: 0, haber: 2500.00, saldo: 6407.43, porcentaje: 8.45 },
    { fecha: '01/04/2023', cuenta: 'Gasto', debe: 1000.00, haber: 0, saldo: 5407.43, porcentaje: 7.13 },
];

const DonacionesDashboard = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    // Verificamos si el usuario tiene el rol adecuado
    if (!token || rol !== "administrador") {
        navigate("/login");  // Si no es administrador, redirigimos a login
        return null;
    }

    useEffect(() => {
        const ctx = document.getElementById('barChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.cuenta),
                datasets: [{
                    label: 'Saldo',
                    data: data.map(row => row.saldo),
                    backgroundColor: 'rgb(129, 41, 41)',
                    borderColor: 'rgb(129, 41, 41)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#000' },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#000' },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#000'
                        }
                    }
                }
            }
        });
    }, []);

    return (
        <div className="d-flex">
            <div className="sidebar text-center p-3">
                <img src="/img/logocdmi.png" width="70" alt="CDMI Logo" className="header-logo" />
                <h5 className="text-light">CDMI</h5>
                <p className="text-light mb-4">Administrador</p>
                <span className="close-session" onClick={() => alert('Sesión cerrada')}>Cerrar sesión</span>
                <hr className="bg-light" />
                <nav className="nav flex-column">
                    <a className="nav-link text-white" href="#">Ventas</a>
                    <a className="nav-link text-white" href="#">Productos</a>
                    <a className="nav-link text-white" href="#">Donaciones</a>
                    <a className="nav-link text-white" href="#">Eventos</a>
                </nav>
            </div>

            <div className="content">
                <h1>Donaciones</h1>
                <table id="dataTable">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cuenta</th>
                            <th>Debe</th>
                            <th>Haber</th>
                            <th>Saldo</th>
                            <th>Porcentaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                <td>{row.fecha}</td>
                                <td>{row.cuenta}</td>
                                <td>{row.debe.toFixed(2)}</td>
                                <td>{row.haber.toFixed(2)}</td>
                                <td>{row.saldo.toFixed(2)}</td>
                                <td>{row.porcentaje.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="chart">
                    <canvas id="barChart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default DonacionesDashboard;
