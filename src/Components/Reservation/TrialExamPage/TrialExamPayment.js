import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import qr_block_logo from "../../../assets/images/qr_block_logo.svg";
import kaspiMobile_kz from "../../../assets/images/kaspiMobile_kz.png";
// import kaspiQR0 from "../../../assets/images/kaspiQR0.png";
// import payMobile from "../../../assets/images/payMobile.png";
import ModalMarriagePayment from "../../Modal/ModalMarriagePayment";

function TrialExamPayment() {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [exam_id, setExamId] = useState(null);
    const [kpp, setKpp] = useState(null);
    const [category, setCategory] = useState(null);
    const [department, setDepartment] = useState(null);
    const [address, setAddress] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [qrCodeBase64, setQrCodeBase64] = useState(""); // State for storing the base64 image

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    //SET STATUS PAYMENT
    const [statusPaymentFalse, setStatusPaymentFalse] = useState(false);

    //APPLICANT SELECTED DATE AND TIME SEND DATA
    const handleSubmitPayment = () => {
        const obj = {
            exam_id: exam_id,
            user_id: userData.id,
            // department_id: departmentId,
            // category: category,
            // kpp: kppApp,
        };

        postUserExamData(obj);
        setIsButtonDisabled(true); // Disable the button immediately
        setTimeout(() => setIsButtonDisabled(false), 5000); // Enable the button after 5 seconds
    };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        const url = "/api/trial/payment/check/";
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
                //APPLICANT PAID
                if (res.status) {
                    navigate("/trial-exam/ticket");
                }
                //NOT PAID
                else if (!res.status) {
                    setStatusPaymentFalse(true);
                }
                //ERROR
                else if (res.error) {
                    console.log("Error:", res.error);
                    setErrorText(res.error);
                }
            })
            .catch(function (res) {
                setErrorText(res);
            });
    };

    useEffect(() => {
        const exam_id = sessionStorage.getItem("exam_id");
        setExamId(JSON.parse(exam_id));
        const kpp = sessionStorage.getItem("kpp");
        setKpp(JSON.parse(kpp));
        const category = sessionStorage.getItem("category");
        setCategory(JSON.parse(category));
        const department = sessionStorage.getItem("department");
        setDepartment(JSON.parse(department));
        //GET INFO APPLICANT
        const user = sessionStorage.getItem("user");
        setUser(JSON.parse(user));
        //GET DATE EXAM APPLICANT ENROLLED
        const date = sessionStorage.getItem("date");;
        setDate(JSON.parse(date));

        const time = JSON.parse(date);
        const [hours, minutes] = time.time.split(":");
        const timeWithoutSeconds = `${hours}:${minutes}`;
        setTime(timeWithoutSeconds)
    }, []);

    // Fetch QR code from the server
    useEffect(() => {
        if (user && exam_id) {
            const qrUrl = `https://kaspi.kz/pay/TestDrivingFeeOnline?service_id=9542&14166=${user?.id}&14167=${exam_id}&14168=${user?.iin}&14169=${user?.fullname}`;
            fetchQr(qrUrl);
        }
    }, [user, exam_id]); // Fetch QR when `user` or `exam_id` changes

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
                        !isMobile ? ( //if pc
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
                        isMobile ? (user?.id && exam_id ? ( //if mobile
                            <a href={`https://kaspi.kz/pay/TestDrivingFeeOnline?service_id=9542&14166=${user?.id}&14167=${exam_id}&14168=${user?.iin}&14169=${user?.fullname}`} target="_blank" rel="noopener noreferrer">
                                <img src={kaspiMobile_kz} alt="Kaspi QR" style={{ width: '250px', height: 'auto' }} />
                            </a>)
                            : (<p> Loading... </p>)) :
                            qrCodeBase64 && <img src={`data:image/png;base64,${qrCodeBase64}`} alt="Kaspi QR" style={{ width: "250px", height: "auto" }} />
                    }

                    {/* {
                        isMobile ?
                            <a href="https://kaspi.kz/pay/TestDrivingFee?service_id=6655&10599={}&10600=MJ-A-Z-SPSC6&amount=3700" target="_blank" rel="noopener noreferrer">
                                <img src={payMobile} alt="Kaspi QR" style={{ width: '250px', height: 'auto' }} />
                            </a>
                            :
                            <img src={kaspiQR0} alt="Kaspi QR" />
                    } */}
                </div >

                <center>
                    {errorText && <p className="text-danger fs-3">Ошибка, попробуйте еще раз</p>}
                    <button type="button" className="btn btn-danger my-4" onClick={() => window.location.href = 'https://booking.gov4c.kz/'}>
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
            <ModalMarriagePayment statusPayment={statusPaymentFalse} setStatusPayment={setStatusPaymentFalse} />
        </>
    );
}

export default TrialExamPayment;