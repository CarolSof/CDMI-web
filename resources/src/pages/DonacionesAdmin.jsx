import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Table, Pagination } from 'react-bootstrap';

const DonacionesAdmin = () => {
    // Estado para manejar los datos de las donaciones
    const [donaciones, setDonaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ id: '', monto: '', fecha: '', nombre: '' });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Obtener las donaciones desde la API
    useEffect(() => {
        const fetchDonaciones = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/donaciones?page=${page}`);
                setDonaciones(response.data.data);
                setTotalPages(response.data.meta.last_page);
            } catch (error) {
                console.error("Error al obtener las donaciones", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonaciones();
    }, [page]);

    // Manejo del modal para agregar o editar donaciones
    const handleShowModal = (donacion = {}) => {
        setModalData(donacion);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalData({ id: '', monto: '', fecha: '', nombre: '' });
    };

    // Función para guardar o editar una donación
    const handleSaveDonacion = async (e) => {
        e.preventDefault();
        const { id, monto, fecha, nombre } = modalData;
        try {
            if (id) {
                // Editar donación
                await axios.put(`/api/donaciones/${id}`, { monto, fecha, nombre });
            } else {
                // Crear nueva donación
                await axios.post('/api/donaciones', { monto, fecha, nombre });
            }
            handleCloseModal();  // Cerrar modal después de guardar
            setPage(1);  // Recargar la primera página de donaciones
        } catch (error) {
            console.error("Error al guardar la donación", error);
        }
    };

    // Eliminar una donación
    const handleDeleteDonacion = async (id) => {
        try {
            await axios.delete(`/api/donaciones/${id}`);
            setPage(1);  // Recargar la primera página de donaciones
        } catch (error) {
            console.error("Error al eliminar la donación", error);
        }
    };

    return (
        <div>
            <h2>Administración de Donaciones</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>
                Agregar Donación
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Cargando...</td>
                        </tr>
                    ) : (
                        donaciones.map(donacion => (
                            <tr key={donacion.id}>
                                <td>{donacion.nombre}</td>
                                <td>{donacion.monto}</td>
                                <td>{donacion.fecha}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleShowModal(donacion)}>
                                        Editar
                                    </Button>
                                    {' '}
                                    <Button variant="danger" onClick={() => handleDeleteDonacion(donacion.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} />
            </Pagination>

            {/* Modal para agregar o editar una donación */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalData.id ? 'Editar' : 'Agregar'} Donación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveDonacion}>
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre del Donante</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre"
                                value={modalData.nombre}
                                onChange={(e) => setModalData({ ...modalData, nombre: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="monto">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el monto"
                                value={modalData.monto}
                                onChange={(e) => setModalData({ ...modalData, monto: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="fecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={modalData.fecha}
                                onChange={(e) => setModalData({ ...modalData, fecha: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DonacionesAdmin;
