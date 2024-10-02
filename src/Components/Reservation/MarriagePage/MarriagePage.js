import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './MarriagePage.css'; // Import the CSS file

//COMPONENTS
import ModalLoading from "../ModalLoading/ModalLoading";
import MarriageForm from "./MarriageForm";
import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";
import ReactCountdownClock from "react-countdown-clock";
import ErrorVerifyPage from "../../ErrorPage/ErrorVerifyPage";
import ModalTheoryExam from "../../Modal/ModalTheoryExam";
import OTPInput from "otp-input-react";

import { getCurrentLanguage } from "../../../config/i18n";

import marriageAgreement from "/home/erbulan/booking/src/assets/images/marriageAgreement.pdf";
import rings from "../../../assets/images/rings.png";

//REDUX
import { setDataUser } from "../../../store/slices/userDataSlice";

//ICON
import { IoIosArrowBack } from "react-icons/io";



import ModalActiveMarriage from "../../Modal/ModalActiveMarriage";

const MarriagePage = () => {
  //USE TRANSLATE LANG
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [slotData, setSlotData] = useState(null);


  // Toggle OTP form visibility
  const [isVerify, setIsVerify] = useState(false);
  //SHOW LOADING ANIMATION MODAL
  const [isloading, setIsLoading] = useState(false);
  //IF APPLICANT NOT FOUND SHOW ERROR
  const [isUser, setIsUser] = useState(false);

  //SHOW MODALS
  const [congartModal, setCongartModal] = useState(false);
  const [isTheoryResModal, setIsTheoryResModal] = useState(false);

  //TOOGLE SHOW INPUT VERIFY CODE
  const [messageBlock, setMessageBlock] = useState(false);
  //SECONDS FOR TIMER
  const [seconds, setSeconds] = useState(180);
  //FOR DISABLED BUTTON IF TIMER OUT OF TIME
  const [disBtn, setDisBtn] = useState(false);


  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notPassExam, setNotPassExam] = useState(false);


  //SHOW ERROR IF APPLICANT INPUT WRONG VERIFY CODE
  const [isWrongCode, setIsWrongCode] = useState(false);
  const [isWrongIIN, setIsWrongIIN] = useState(false);
  const [OTP, setOTP] = useState("");

  //show error if user has already active ticket
  const [hasActiveTicket, setHasActiveTicket] = useState(false);

  //Expired ticket or 503 error
  const [expiredAppNumber, setExpiredAppNumber] = useState(false);
  const [responseError, setResponseError] = useState(false);

  //bmgNote hide
  const [isTextVisible, setIsTextVisible] = useState(true);

  const token = useSelector(state => state.token.token)

  const [showInfo, setShowInfo] = useState(false);

  const currentLanguage = getCurrentLanguage();

  const [isAgreed, setIsAgreed] = useState(false);

  // FAQ accordion state
  const [openQ, setOpenQ] = useState(null);
  const answerRef = useRef(null);

  const toggleQ = index => {
    setOpenQ(openQ === index ? null : index);
  };



  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    IIN: "",
    APP_NUMBER: "",
    mode: "onChange",
    message: "",
  });

  const dispatch = useDispatch();
  const { btoa } = window;
  //SEND IIN TO DATABASE TO VERIFY USER
  const verifyUser = async (iin, app_number, token) => {
    var requestOptions = {
      method: 'GET', /*headers: myHeaders, */redirect: 'follow'
    };
    fetch("/api/verify/" + iin + "/", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then(result => {
        if (result.success) {
          sessionStorage.setItem("iin", JSON.stringify(iin));
          // sessionStorage.setItem("app_number", JSON.stringify(app_number));

          //SHOW INPUT OTP TO VERIFY CODE
          setMessageBlock(true);
        }
        else if (result.error) {
          setIsWrongIIN(true);
        }
        //APLICANT NOT FOUND
        else {
          setMessageBlock(false)
          //APPLICANT NOT FOUND ERROR
          isUser(true);
        }
      })
      .catch(error => console.log('error', error));
  };



  const sendVerifyCodeApplicant = async (verify_code, token) => {
    const url = "/api/marriage/verify/";

    const storageData = JSON.parse(sessionStorage.getItem("iin"));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iin: storageData,
        code: verify_code,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const data = await response.json();

      if (data.error === false) {
        // Handle case where applicant input wrong verify code
        setMessageBlock(true);
        setIsWrongCode(true);
        setOTP("");
      } else if (data.error) {
        // Handle error cases
        if (data.error == "client already has active slot") {
          setHasActiveTicket(true);
          if (data.slot_data) {
            sessionStorage.setItem("slot_data", JSON.stringify(data.slot_data));
            setSlotData(data.slot_data);
            setHasActiveTicket(true);
          }
        } else {
          setMessageBlock(false);
          setNotPassExam(true);
          setOTP("");
        }
      } else {
        // Handle success case
        setNotPassExam(false);
        setIsVerify(true);
        dispatch(setDataUser(data));
        setMessageBlock(false);
        setOTP("");
      }
    } catch (error) {
      console.error("An error occurred during verification:", error);
      // Handle the error here, e.g., display an error message to the user
    }
  };

  // IF THE TIMER IS OUT OF TIME TOOGLE DISABLED BUTTON "Забронировать"
  const timeDone = () => {
    setDisBtn(true);
  };

  // SEND SMS CODE AGAIN
  const SendMessageAgain = () => {
    setDisBtn(false);
    //RESTART TIMER
    setSeconds((seconds) => (seconds += 10));
    const storageData = sessionStorage.getItem("iin");
    // const storageData2 = sessionStorage.getItem("app_number");
    verifyUser(JSON.parse(storageData));
  };

  //SUBMIT - SEND IIN AND GET VERIFY CODE
  const getMessage = (data) => {
    verifyUser(data.IIN, data.APP_NUMBER, token.access);
  };

  //SEND SMS CODE FROM APPLICANT TO CHECK
  const verifyOTP = () => {

    sendVerifyCodeApplicant(OTP, token.access);
    if (isVerify)
      submit();
  }
  const submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    setMessageBlock(false);
    //sendVerifyCodeApplicant(OTP, token.access);
    reset();
  };

  useEffect(() => {
    //console.log(token.access)
  }, [isVerify, seconds, notPassExam, OTP, token]);

  return (
    <div className="offset_theory_exam_page flex-column">

      {/* <div className="d-flex w-100 mt-4">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          {t("goBack")}
        </button>
      </div> */}

      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2>{t("titlePageMarriage")}</h2>
      </div>

      <div className="d-flex w-100 text-start align-items-center justify-content-center">
        {!isVerify ? (
          <form
            className={messageBlock ? "hide" : "form_input"}
            onSubmit={handleSubmit(getMessage)}
          >

            <p className="mt-5">{t("head_text_input")}</p>

            <p style={{ display: 'flex', alignItems: 'left', width: '100%' }}>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="custom-checkbox" // Add class to apply styles

              />
              {currentLanguage === 'ru' ? (
                <>
                  {t("trialAgreement").split("договором оферты")[0]}
                  &nbsp;
                  <a href={marriageAgreement} target="_blank">договором оферты</a>

                  {t("trialAgreement").split("договором оферты")[1]}
                </>
              ) : currentLanguage === 'kz' ? (
                <>
                  {t("trialAgreement").split("қолдану шарттарымен")[0]}
                  &nbsp;
                  <a href={marriageAgreement} target="_blank">қолдану шарттарымен</a>
                  &nbsp;
                  {t("trialAgreement").split("қолдану шарттарымен")[1]}
                </>
              ) : (
                t("trialAgreement")
              )}
            </p>

            {/* INPUT TICKET */}
            <input
              className="form-control input_w my-2"
              placeholder={t("iin")}
              maxLength="12"
              minLength="12"
              name="IIN"
              disabled={!isAgreed} // Disable the input if the user has not agreed
              {...register("IIN", {
                required: "Введите ИИН",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "ИИН состоит только из цифр",
                },
              })}
            />

            {/* ERRORS FOR INPUT */}
            {errors.IIN && <p className="text-danger">{errors.IIN.message}</p>}
            {errors.APP_NUMBER && <p className="text-danger">{errors.APP_NUMBER.message}</p>}

            {/* ERROR NOT FOUND TICKTET */}
            {isUser && (
              <p className="text-danger my-2">{t("notIINFound")}</p>
            )}
            {isWrongIIN && <p className="text-danger fs-3">{t("wrongIIN")}</p>}

            {/* ERROR IF USER BOOKIG FOR PRACTICE EXAM */}

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-success my-3 btn-auth"
              type="submit"
              disabled={!isDirty || !isValid}
              onClick={() => setIsTextVisible(false)}
            >
              {/* Авторизоваться */}
              {t("btn_title_reservation")}
            </button>


            {/* THE FAQ SHOULD BE HERE */}
            {/* FAQ Section */}
            <div className="faq-container">
              <div className={`faq ${openQ === 1 ? "open" : ""}`} onClick={() => toggleQ(1)}>
                <div className="question">
                  <h5>{t("whatMarriageIncludes")}</h5>
                  <svg className="dropdown" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="transparent"></rect>
                    <path d="M15 18 L20 23 L25 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className="answer" ref={answerRef}
                  style={{
                    maxHeight: openQ === 1 ? `${answerRef.current.scrollHeight}px` : "0px",
                    opacity: openQ === 1 ? 1 : 0,
                  }}>

                  <img src={rings} alt="rings" className="faq-image" />
                  <h5>{t("marriageIncludes1")}</h5>
                  <p>{t("marriageIncludes11")}</p>

                  <h5>{t("marriageIncludes2")}</h5>
                  <p>{t("marriageIncludes22")}</p>

                  <h5>{t("marriageIncludes3")}</h5>
                  <p>{t("marriageIncludes33")}</p>

                </div>
              </div>

              {/* Add more questions as needed */}
            </div>

            {/* End FAQ Section */}
          </form>
        ) : (
          // SHOW FORM TO SELECT DATE AND TIME TO RESERVATION PRACTICE EXAM
          <div className="d-flex w-100 text-start align-items-center justify-content-center">
            <MarriageForm />
          </div>
        )}

      </div>



      {/* SHOW INPUT TO VERIFY CODE */}
      {messageBlock && (
        <div
          className="d-flex flex-wrap flex-column align-items-center justify-content-center w-100 mt-3"
        // onSubmit={handleSubmit(submit)}
        >
          <p className="px-3 text-center">
            {/* Введите отправленный на ваш телефон номер код. */}
            {t("enterOTP")}
          </p>

          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType="number"
            maxTime={seconds}
            disabled={seconds === 0}
            inputStyles={{
              border: "1px solid green",
              width: "44px",
              height: "44px",
              fontSize: "18px",
              borderRadius: "8px",
            }}
            focusStyle={{
              border: "1px solid green",
            }}
          />

          {/* ERROR APPLICANT NOT PASS THEORY EXAM */}
          {/* {notPassExam && <h2 className="text-danger text-center">Заявитель не сдал теоритический экзамен</h2>} */}

          <h2 className="text-danger text-center">{notPassExam}</h2>

          {/* ERROR APPLICANT  */}
          {isWrongCode && <p className="text-danger fs-3">{t("wrongOTP")}</p>}

          {/* ERROR EXPIRED APP NUMBER */}
          {expiredAppNumber && <p className="text-danger fs-3">{t("expiredAppNumber")}</p>}
          {/* Error like 500 */}
          {responseError && <p className="text-danger fs-3">Извините, произошла внутренняя ошибка сервера. Наши специалисты уже уведомлены о проблеме и работают над её устранением. Пожалуйста, попробуйте повторить запрос позже.</p>}

          <div className="d-flex flex-column w-50 align-items-center justify-content-center w-100 mt-3">
            <button
              className="btn btn-success mb-5"
              type="button"
              onClick={verifyOTP}
              disabled={disBtn || OTP.length < 6}
            >

              {/* Забронировать */}
              {t("bron")}
            </button>
            <button
              className="btn mb-3 btn-light"
              onClick={() => SendMessageAgain()}
              disabled={!disBtn}
            >
              {t("againOTP")}
            </button>
            {/* COUNT DOWN TIMER */}
            <ReactCountdownClock
              seconds={seconds}
              color="#6c757d"
              alpha={2}
              size={48}
              onComplete={timeDone}
            />
          </div>
        </div>
      )}

      {/* MODAL LOADING ANIMATE  */}
      {isloading && <ModalLoading isLoading={isloading} />}

      {/* SHOW MODAL ERROR */}
      <ModalPracticeError
        isTheoryResModal={isTheoryResModal}
        setShow={setIsTheoryResModal}
      />

      {/* SHOW CONGRATULATION MODAL */}
      <ModalCongratPractice
        congartModal={congartModal}
        setShow={setCongartModal}
      />

      <ModalTheoryExam notPassExam={notPassExam} setNotPassExam={setNotPassExam} />

      {/* SHOW ACTIVE TICKET MODAL */}
      <ModalActiveMarriage
        hasActiveTicket={hasActiveTicket}
        setHasActiveTicket={setHasActiveTicket}
        slotData={slotData} // Pass the marriageData prop here
      />

    </div>
  );
};

export default MarriagePage;