import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ModalTheoryExam from "../../Modal/ModalTheoryExam";
import ModalExamBooked from "../../Modal/ModalExamBooked";
import ModalErrorMessage from "../../Modal/ModalErrorMessage";

function PracticeExamVerification() {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [examId, setExamId] = useState(null);
    const [appNumber, setAppNumber] = useState(null);
    const [kpp, setKpp] = useState(null);
    const [category, setCategory] = useState(null);
    const [department, setDepartment] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [modalErrorMessage, setModalErrorMessage] = useState("");
    const [showModalError, setShowModalError] = useState(false);


    //GET APPLICANT INFO FROM REDUX
    const userData = useSelector((state) => state.userData.userData);
    const [departmentId, setDepartmentId] = useState(userData.department_id);
    //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
    const [errorText, setErrorText] = useState("");


    //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
    const [notPassExam, setNotPassExam] = useState(false);
    const [examBooked, setExamBooked] = useState(false);

    //APPLICANT SELECTED DATE AND TIME SEND DATA
    const handleSubmitPracticeExam = () => {
        const obj = {
            user_id: userData.id,
            exam_id: examId,
            department_id: departmentId,
            category: category,
            kpp: kpp,
        };

        postUserExamData(obj);
    };

    //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
    const postUserExamData = (user_exam_data) => {
        const url = "/api/practice/enroll/queue/";
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
                    sessionStorage.setItem("appNumber", JSON.stringify(res.app_number));
                    navigate("/practice-exam/ticket");

                }
                //APPLICANT NOT ENRLLED GET ERROR FROM SERVER
                else if (res.error) {
                    setModalErrorMessage(res.error);
                    setShowModalError(true);
                }
            })
            .catch(function (res) {
                setErrorText(res);
            });
    };

    useEffect(() => {
        const examId = sessionStorage.getItem("examId");
        setExamId(JSON.parse(examId));
        const appNumber = sessionStorage.getItem("appNumber");
        setAppNumber(JSON.parse(appNumber));
        const kpp = sessionStorage.getItem("kpp");
        setKpp(JSON.parse(kpp));
        const category = sessionStorage.getItem("category");
        console.log('Category:', category); // Add this
        setCategory(JSON.parse(category));
        const department = sessionStorage.getItem("department");
        console.log('Department:', department); // And this
        setDepartment(JSON.parse(department));
        //GET INFO APPLICANT
        const user = sessionStorage.getItem("user");
        setUser(JSON.parse(user));
        //GET DATE EXAM APPLICANT ENROLLED
        const date = sessionStorage.getItem("date");;
        setDate(JSON.parse(date));

        if (date) {
            const parsedDate = JSON.parse(date);
            if (parsedDate && parsedDate.time) {
                const [hours, minutes] = parsedDate.time.split(":");
                const timeWithoutSeconds = `${hours}:${minutes}`;
                setTime(timeWithoutSeconds);
            }
        }

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
                                    <span className="fw-bold">{user?.department}</span>
                                </span>
                            </span>
                        </label>

                        <label className="my-2">
                            <span className="ticket_text_aside">
                                {t("category")}:&nbsp;
                                {/* Категория:  */}
                                <span className="fw-bold">
                                    <span className="fw-bold">{category}</span>
                                </span>
                            </span>
                        </label>
                        <label className="my-2">
                            <span className="ticket_text_aside">
                                КПП: <span className="fw-bold">
                                    <span className="fw-bold">{kpp == "MT" ? "МКПП" : "АКПП"}</span>
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
                        </div>

                        <p className="h6 text-info text-center ">
                            {t("dtp")}
                        </p>


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
                            handleSubmitPracticeExam();
                        }}
                    >
                        {t("verificationApprove")}
                        {/* Подтвердить */}
                    </button>
                </center>

                <ModalTheoryExam notPassExam={notPassExam} setNotPassExam={setNotPassExam} />
                <ModalExamBooked examBooked={examBooked} setExamBooked={setExamBooked} />

                {showModalError && (
                    <ModalErrorMessage
                        isOpen={showModalError}
                        onClose={() => setShowModalError(false)}
                        message={modalErrorMessage}
                    />
                )}

            </div>
        </>
    );
}

export default PracticeExamVerification;