import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalErrorMessage = ({ isOpen, onClose, message }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          ОК
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalErrorMessage;