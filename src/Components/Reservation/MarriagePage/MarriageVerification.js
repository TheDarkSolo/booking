import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function MarriageVerification() {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [slot_id, setSlotId] = useState(null);
    const [appNumber, setAppNumber] = useState(null);
    const [kpp, setKpp] = useState(null);
    const [category, setCategory] = useState(null);
    const [department, setDepartment] = useState(null);
    const [address, setAddress] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    //GET APPLICANT INFO FROM REDUX
    const userData = useSelector((state) => state.userData.userData);
    const [departmentId, setDepartmentId] = useState(userData.department_id);
    //SELECTED KPP IF APPLICANT HAVE CATEGORY "B"
    const [kppApp, setKPP] = useState("MT");
    //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
    const [errorText, setErrorText] = useState("");
    //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
    const [notEnrolled, setNotEnrolled] = useState("");

    const [commentW, setCommentW] = useState("");
    const [service_id, setServiceId] = useState("");
    const [marriageLanguage, setMarriageLanguage] = useState(null);

    // APPLICANT SELECTED DATE AND TIME SEND DATA
    const handleSubmitMarriage = () => {
        const obj = {
            user_id: userData.id,
            slot_id: slot_id,
            marriageLanguage: marriageLanguage,
            //serviceId: service_id,
        };

        postUserExamData(obj);
    };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        const url = "/api/marriage/enroll/queue/";
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
                if (res.enrolled) {
                    console.log("Enrolled:", res.enrolled);
                    navigate("/marriage/payment");

                }
                //APPLICANT NOT ENRLLED GET ERROR FROM SERVER
                else if (res.error) {
                    setNotEnrolled(res.error);
                }
            })
            .catch(function (res) {
                setErrorText(res);
            });
    };

    useEffect(() => {
        const slot_id = sessionStorage.getItem("slot_id");
        setSlotId(JSON.parse(slot_id));
        // const appNumber = sessionStorage.getItem("appNumber");
        // setAppNumber(JSON.parse(appNumber));
        // const kpp = sessionStorage.getItem("kpp");
        // setKpp(JSON.parse(kpp));
        // const service = sessionStorage.getItem("service_id");
        // console.log('Service:', service); // Add this
        // setCategory(JSON.parse(service));
        const department = sessionStorage.getItem("department");
        console.log('Department:', department); // And this
        setDepartment(JSON.parse(department));
        //GET INFO APPLICANT
        const user = sessionStorage.getItem("user");
        setUser(JSON.parse(user));
        //GET DATE EXAM APPLICANT ENROLLED
        const date = sessionStorage.getItem("date");;
        setDate(JSON.parse(date));
        const marriageLanguage = sessionStorage.getItem("marriageLanguage");
        setMarriageLanguage(JSON.parse(marriageLanguage));

        if (date) {
            const parsedDate = JSON.parse(date);
            if (parsedDate && parsedDate.time) {
                const [hours, minutes] = parsedDate.time.split(":");
                const timeWithoutSeconds = `${hours}:${minutes}`;
                setTime(timeWithoutSeconds);
            }
        }

        // if (date) {
        //     const parsedDate = JSON.parse(date);
        //     if (parsedDate && parsedDate.time) {
        //         const timesWithoutSeconds = parsedDate.time.map(time => {
        //             const [hours, minutes] = time.split(":");
        //             return `${hours}:${minutes}`;
        //         });
        //         setTime(timesWithoutSeconds);
        //     }
        // }

        // if (date) {
        //     const parsedDate = JSON.parse(date);
        //     if (parsedDate && Array.isArray(parsedDate.time)) {
        //         const timesWithoutSeconds = parsedDate.time.map(time => {
        //             const [hours, minutes] = time.split(":");
        //             return `${hours}:${minutes}`;
        //         });
        //         setTime(timesWithoutSeconds);
        //     }
        // }



    }, []);

    return (
        <>
            <div className="verificationContainer">
                <div>
                    <div id="ticket" className="d-flex flex-column p-4 width-50 border rounded border-dark mx-auto">
                        <h3 className="text-center">
                            {t("preliminaryInfo")}
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

                        <label className="my-2">
                            <span className="ticket_text_aside">
                                {t("department")}:&nbsp;
                                {/* Отделение:  */}
                                <span className="fw-bold">
                                    <span className="fw-bold">{department}</span>
                                </span>
                            </span>
                        </label>

                        <label className="my-2">
                            <span className="ticket_text_aside">
                                {t("serviceName")}:&nbsp;
                                {/* Услуга:  */}
                                <span className="fw-bold">
                                    <span className="fw-bold">{t("btn_title_reservation_marriage")}</span>
                                </span>
                            </span>
                        </label>

                        <div className="my-2 w-100">
                            <span className="ticket_text_aside text-wrap">
                                {t("talonData")}
                                {/* Дата: */}
                            </span>
                            <span className="fw-bold mx-2">
                                {new Date(date?.date).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="my-2 w-100">
                            <span className="ticket_text_aside text-wrap">
                                {t("talonTime")}
                                {/* Время: */}
                            </span>
                            <span className="fw-bold mx-2">{time}</span>
                            {/* <span className="fw-bold mx-2">{time ? time.join(', ') : ''}</span> */}
                        </div>

                        {/* <p className="h6 text-info text-center ">
                        {t("dtp")}
                    </p> */}

                    </div >
                </div >

                <p className="h5 text-center text-danger my-4">
                    <strong>
                        {t("verificationNote")}
                    </strong>
                </p>

                <center>
                    <button type="button" className="btn btn-danger" onClick={() => window.location.href = 'https://booking.gov4c.kz/'}>
                        {t("verificationDecline")}
                        {/* Отменить */}
                    </button>

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            handleSubmitMarriage();
                        }}
                    >
                        {t("verificationApprove")}
                        {/* Подтвердить */}
                    </button>
                </center>
            </div>
        </>
    );
}

export default MarriageVerification;