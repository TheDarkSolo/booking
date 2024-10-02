import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ModalVideoCon({ videoCon, setVideoCon }) {
    const { t } = useTranslation()
    const handleClose = () => setVideoCon(false);
    return (
        <Modal show={videoCon} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t("error")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {" "}
                {/* Вы не сдали теоритический экзамен. */}
                {t("videoCon")}
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