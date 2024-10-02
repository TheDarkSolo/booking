import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
export default function ModalMariagePayment({ statusPayment, setStatusPayment }) {
    const { t } = useTranslation()
    const handleClose = () => setStatusPayment(false);
    return (
        <Modal show={statusPayment} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("error")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                {/* Оплата не произведена */}
                {t("statusPaymentFalse")}
            </Modal.Body>
            <Modal.Footer>
              
                    <Button variant="primary" onClick={handleClose}>
                        ОК
                    </Button>
                
            </Modal.Footer>
        </Modal>
    );
}
