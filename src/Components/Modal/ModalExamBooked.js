import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
export default function ModalExamBooked({ examBooked, setExamBooked }) {
    const { t } = useTranslation()
    const handleClose = () => setExamBooked(false);
    return (
        <Modal show={examBooked} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("error")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                {/* Оплата не произведена */}
                Данный экзамен уже забронирован. Пожалуйста, выберите другую дату
            </Modal.Body>
            <Modal.Footer>
              
                    <Button variant="primary" onClick={handleClose}>
                        ОК
                    </Button>
                
            </Modal.Footer>
        </Modal>
    );
}
