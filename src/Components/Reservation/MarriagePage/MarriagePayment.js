import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import payMobile from "../../../assets/images/payMobile.png";
import ModalMariagePayment from "../../Modal/ModalMarriagePayment";
import qr_block_logo from "../../../assets/images/qr_block_logo.svg";
import kaspiMobile_ru from "../../../assets/images/kaspiMobile_ru.png";
import kaspiMobile_kz from "../../../assets/images/kaspiMobile_kz.png";
import './MarriagePayment.css'; // Import the CSS file

function MarriagePayment() {
    const [user, setUser] = useState(null);
    const [slotId, setSlotId] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [marriageLanguage, setMarriageLanguage] = useState(null);
    const [appNumber, setAppNumber] = useState(null);
    const [kpp, setKpp] = useState(null);
    const [category, setCategory] = useState(null);
    const [department, setDepartment] = useState(null);
    const [address, setAddress] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [numberOfTimeSlots, setNumberOfTimeSlots] = useState(0);
    const [qrCodeBase64, setQrCodeBase64] = useState(""); // State for storing the base64 image

    const [city, setCity] = useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [statusPaymentFalse, setStatusPaymentFalse] = useState(false);


    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 10000);

        return () => clearTimeout(timer); // This will clear the timer when the component unmounts


    }, []);

    //GET APPLICANT INFO FROM REDUX
    const userData = useSelector((state) => state.userData.userData);
    const [departmentId, setDepartmentId] = useState(userData.department_id);
    //SELECTED KPP IF APPLICANT HAVE CATEGORY "B"
    const [kppApp, setKPP] = useState("MT");
    //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
    const [errorText, setErrorText] = useState("");
    //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
    const [notTheoryExam, setNotTheoryExam] = useState("");

    //APPLICANT SELECTED DATE AND TIME SEND DATA
    const handleSubmitPayment = () => {
        const obj = {
            slot_id: slotId,
            user_id: userData.id,
            // user_id: userData.id,
            // marriageLanguage: marriageLanguage,
        };
        postUserExamData(obj);
        setIsButtonDisabled(true); // Disable the button immediately
        setTimeout(() => setIsButtonDisabled(false), 5000); // Enable the button after 5 seconds
    };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        const url = "/api/marriage/payment/check/";
        const token = userData.token;
        fetch(url, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(user_exam_data),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    setErrorText(response.status);
                    throw new Error(`Request failed with status code ${response.status}`);
                }
            })
            .then((res) => {
                //IF APPLICANT ENROLLED TO PRACTICE EXAM
                if (!res.status) {
                    setStatusPaymentFalse(true);
                }
                //APPLICANT NOT ENRLLED GET ERROR FROM SERVER
                else if (res.status) {
                    sessionStorage.setItem("appNumber", JSON.stringify(res.app_number));
                    navigate("/reservation/marriage/ticket");
                }
            })
            .catch(function (res) {
                setErrorText(res);
            });
    };

    useEffect(() => {
        const slotId = sessionStorage.getItem("slot_id");
        setSlotId(slotId);
        //GET INFO APPLICANT
        const user = sessionStorage.getItem("user");
        setUser(JSON.parse(user));
        const marriageLanguage = sessionStorage.getItem("marriageLanguage");
        setMarriageLanguage(JSON.parse(marriageLanguage));
        const department = sessionStorage.getItem("department");
        setDepartment(JSON.parse(department));

        //GET DATE EXAM APPLICANT ENROLLED
        const date = sessionStorage.getItem("date");;
        setDate(JSON.parse(date));

        const city = sessionStorage.getItem("city");
        setCity(JSON.parse(city));

        const time = JSON.parse(date);
        const [hours, minutes] = time.time.split(":");
        const timeWithoutSeconds = `${hours}:${minutes}`;
        setTime(timeWithoutSeconds)
    }, []);

    // Fetch QR code from the server
    useEffect(() => {
        if (user && slotId) {
            const qrUrl = `https://kaspi.kz/pay/RAGSOnline?service_id=8291&12835=${user?.id}&12836=${slotId}&13299=${user?.iin}&13300=${user?.fullname}`;
            fetchQr(qrUrl);
        }
    }, [user, slotId]); // Fetch QR when `user` or `slotId` changes

    // Function to fetch the QR code from the server
    const fetchQr = (qrUrl) => {
        fetch("/api/qr/", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ url: qrUrl }),
        })
            .then((response) => {

                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Request failed with status code ${response.status}`);
                }
            })
            .then((data) => {
                setQrCodeBase64(data.image);
            })
            .catch((error) => {
                console.error("Error fetching QR code:", error);
                setErrorText(error.message);
            });
    };

    return (
        <>
            <div className="d-flex flex-column align-items-center mt-5">
                <div id="ticket" className="d-flex flex-column p-4 width-50 border rounded border-dark mx-auto">
                    <h3 className="text-center">
                        {t("payment")}
                        {/* Предварительная информация*/}
                    </h3>

                    <label className="my-2">
                        <span className="ticket_text_aside">
                            {t("iin")}:&nbsp;
                            {/* ИИН:  */}
                            <span className="fw-bold">{user?.iin}</span>
                        </span>
                        <span>{ }</span>
                    </label>
                    {
                        !isMobile ? (
                            <div className="kaspi-qr-container">
                                <div className="kaspi-qr-logo-text">
                                    <img src={qr_block_logo} alt="QR block logo" />
                                    <p className="kaspi-qr-title">Kaspi QR</p>
                                </div>
                                <p className="kaspi-qr-subtitle">Сканируйте и платите</p>
                            </div>
                        ) : null
                    }

                    {
                        isMobile ? (user?.id && slotId ? (
                            <a href={`https://kaspi.kz/pay/RAGSOnline?service_id=8291&12835=${user?.id}&12836=${slotId}&13299=${user?.iin}&13300=${user?.fullname}`} target="_blank" rel="noopener noreferrer">
                                <img src={kaspiMobile_kz} alt="Kaspi QR" style={{ width: '250px', height: 'auto' }} />
                            </a>)
                            : (<p> Loading... </p>)) :
                            qrCodeBase64 && <img src={`data:image/png;base64,${qrCodeBase64}`} alt="Kaspi QR" style={{ width: "250px", height: "auto" }} />
                    }

                </div >

                {/* <p className="h5 text-center text-danger my-4">
                <strong>
                    {t("verificationNote")}
                </strong>
                </p> */}

                <center>
                    <button type="button" className="btn btn-danger my-4" onClick={() => window.location.href = 'https://booking.gov4c.kz/reservation/marriage'}>
                        {t("verificationDecline")}
                        {/* Отменить */}
                    </button>

                    <button
                        type="button"
                        className="btn btn-success"
                        disabled={isButtonDisabled}
                        onClick={() => {
                            handleSubmitPayment();
                        }}
                    >
                        {t("paid")}
                        {/* Подтвердить */}
                    </button>
                </center>
            </div >
            <ModalMariagePayment statusPayment={statusPaymentFalse} setStatusPayment={setStatusPaymentFalse} />
        </>
    );
}

export default MarriagePayment;