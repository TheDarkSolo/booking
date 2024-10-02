import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ModalActiveMarriage({ hasActiveTicket, setHasActiveTicket, slotData }) {
    const { t } = useTranslation()
    const handleClose = () => setHasActiveTicket(false);

    return (
        <Modal show={hasActiveTicket} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("error")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                {/* У вас уже есть активный талон. Данные были высланы в виде SMS. Проверьте свои сообщения. */}

                

                {slotData && (
                    <>
                    {slotData.payment ? (
                        <p> {t("hasPaidReservation")} </p>
                        ) : (
                        <p> {t("hasActiveReservation")} </p>
                    )}

                    <div style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }} /> {/* Horizontal line */}

                    <div>
                        <p>{t("iin")}: {slotData.iin}</p>
                        <p>{t("selectDateTitle")}: {slotData.date}</p>
                        <p>{t("time")}: {slotData.time}</p>
                        <p>{t("department")}: {slotData.department}</p>
                    </div>
                    </>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Link to="/reservation/marriage">
                    <Button variant="primary" onClick={handleClose}>
                        ОК
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
}
