import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ModalActiveTicket({ hasActiveTicket, setHasActiveTicket }) {

    const handleClose = () => setHasActiveTicket(false);
    return (
        <Modal show={hasActiveTicket} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ошибка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                У вас уже есть активный талон. Данные были высланы в виде SMS. Проверьте свои сообщения.
            </Modal.Body>
            <Modal.Footer>
                <Link to="/reservation">
                    <Button variant="primary" onClick={handleClose}>
                        ОК
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}
