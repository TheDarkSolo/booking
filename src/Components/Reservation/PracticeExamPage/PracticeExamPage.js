import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

//COMPONENTS
import ModalLoading from "../ModalLoading/ModalLoading";
import PracticeExamForm from "./PracticeExamForm/PracticeExamForm";
import ModalPracticeError from "../../Modal/ModalPracticeError";
import ModalCongratPractice from "../../Modal/ModalCongratPractice";
import ReactCountdownClock from "react-countdown-clock";
import ErrorVerifyPage from "../../ErrorPage/ErrorVerifyPage";
import ModalTheoryExam from "../../Modal/ModalTheoryExam";
import OTPInput, { ResendOTP } from "otp-input-react";

import ModalActiveTicket from "../../Modal/ModalActiveTicket";


//REDUX
import { setDataUser } from "../../../store/slices/userDataSlice";

//ICON
import { IoIosArrowBack } from "react-icons/io";

//API REQUEST FUNCTION
import {
  verifyUserByIIN,
  verifySMSCode,
} from "../../../helpers/ApiRequestList";

const PracticeExamPage = () => {
  //USE TRANSLATE LANG
  const { t } = useTranslation();
  const navigate = useNavigate();

  //SHOW FORM SELECT DATE AND TIME FOR EXAM AFTER VERIFY APPLICANT
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
  const [OTP, setOTP] = useState("");

  //show error if user has already active ticket
  const [hasActiveTicket, setHasActiveTicket] = useState(false);

  const token = useSelector(state => state.token.token)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    IIN: "",
    mode: "onChange",
    message: "",
  });

  const dispatch = useDispatch();
  const { btoa } = window;
  //SEND IIN TO DATABASE TO VERIFY USER
  const verifyUser = async (iin, token) => {
    // try {
    //   const response = await verifyUserByIIN(iin,token);

    //   //APPLICANT FIND IN DATABASE
    //   if (response.success) {
    //     sessionStorage.setItem("iin", JSON.stringify(iin));
    //     //SHOW INPUT OTP TO VERIFY CODE
    //     setMessageBlock(true);
    //   }
    //   //APLICANT NOT FOUND
    //   else {
    //     setMessageBlock(false)
    //     //APPLICANT NOT FOUND ERROR
    //     isUser(true);
    //   }
    // } catch (e) {
    //   // navigate("/error-verify-page");
    // }

    // var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET', /*headers: myHeaders, */redirect: 'follow'
    };
    fetch("https://bback.gov4c.kz/api/verify/" + iin, requestOptions)
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
          //SHOW INPUT OTP TO VERIFY CODE
          setMessageBlock(true);
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



  //SEND SMS CODE FROM USER
  const sendVerifyCodeApplicant = async (verify_code, token) => {
    const url = "https://bback.gov4c.kz/api/verify/"

    const storageData = sessionStorage.getItem("iin");
    const obj = {
      "iin": JSON.parse(storageData),
      "code": verify_code,
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      iin: JSON.parse(storageData),
      code: verify_code
    });


    fetch(url, {
      headers: myHeaders,
      method: "POST",
      body: raw
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(`INITIAL Request failed with status code ${response.status}`);
      }
    })
      .then((data) => {
        if (data.error) {
          //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
          // setIsVerify(true)
          if (data.error == "У заявителя есть активные экзамены.") { // assuming the server returns this data
            setHasActiveTicket(true);
          } else {
            setMessageBlock(false)
            setNotPassExam(true);
            setOTP("");
            console.log(data.error);
            // console.log(data)
          }
        }
        //APLICANT INPUT WRONG VERIFY CODE
        else if (data.success === false) {
          //SHOW ERROR APPLICANT INPUT WRONG VERIFY CODE
          setMessageBlock(true)
          setIsWrongCode(true);
          setOTP("")
          // console.log(2)
        }
        //OK
        else {
          //console.log(data);
          setNotPassExam(false);
          setIsVerify(true);
          dispatch(setDataUser(data));
          setMessageBlock(false)
          setOTP("")
          // console.log(3)
        }

        // } 
      })
    /*.catch(function (res) {
      console.log(res,'\texcept');
      return res
    });*/
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
    verifyUser(JSON.parse(storageData));
  };

  //SUBMIT - SEND IIN AND GET VERIFY CODE
  const getMessage = (data) => {
    verifyUser(data.IIN, token.access);
  };

  //SEND SMS CODE FROM APPLICANT TO CHECK
  const submit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    setMessageBlock(false);
    sendVerifyCodeApplicant(OTP, token.access);
    reset();
  };

  useEffect(() => {
    //console.log(token.access)
  }, [isVerify, seconds, notPassExam, OTP, token]);

  return (
    <div className="offset_theory_exam_page flex-column">
      <div className="d-flex w-100 text-center flex-column mt-4">
        <h2>{t("titlePagePracticeExam")}</h2>
      </div>
      <div className="d-flex w-100">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          назад
        </button>
      </div>
      <div className="d-flex w-100 text-start align-items-center justify-content-center">
        {!isVerify ? (
          <form
            className={messageBlock ? "hide" : "form_input"}
            onSubmit={handleSubmit(getMessage)}
          >
            <p className="text-center">{t("head_text_input")}</p>
            {/* INPUT TICKET */}
            <input
              className="form-control input_w my-2"
              placeholder={t("iin_input_placeholder")}
              maxLength="12"
              minLength="12"
              name="IIN"
              {...register("IIN", {
                required: "Введите ИИН",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "КОД состоит только из цифр",
                },
              })}
            />

            {/* ERRORS FOR INPUT */}
            {errors.IIN && <p className="text-danger">{errors.message}</p>}

            {/* ERROR NOT FOUND TICKTET */}
            {isUser && (
              <p className="text-danger my-2">Заявитель с таким ИИН не найден.</p>
            )}


            {/* ERROR IF USER BOOKIG FOR PRACTICE EXAM */}

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-success btn_width my-2"
              type="submit"
              disabled={!isDirty || !isValid}
            >
              {t("btn_title_reservation")}
            </button>
          </form>

        ) : (
          // SHOW FORM TO SELECT DATE AND TIME TO RESERVATION PRACTICE EXAM
          <div className="d-flex w-100 text-start align-items-center justify-content-center">
            <PracticeExamForm />
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
            Введите отправленный на ваш телефон номер код.
          </p>
          {/* <input
            className="form-control w-50 mb-2"
            maxLength="6"
            minLength="6"
            name="IIN"
            {...register("message", {
              required: "Введите или номер завки",
              pattern: {
                value: /^[0-9]+$/,
                message: "ИИН состоит только из цифр",
              },
            })}
          /> */}
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
          {isWrongCode && <p className="text-danger fs-3">Вы ввели некорректный код.</p>}
          <div className="d-flex flex-column w-50 align-items-center justify-content-center w-100 mt-3">
            <button
              className="btn btn-success mb-5"
              type="submit"
              onClick={submit}
              disabled={disBtn || OTP.length < 6}
            >

              Забронировать
            </button>
            <button
              className="btn mb-3 btn-light"
              onClick={() => SendMessageAgain()}
              disabled={!disBtn}
            >
              Отправить код повторно
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



      <ModalActiveTicket
        hasActiveTicket={hasActiveTicket}
        setHasActiveTicket={setHasActiveTicket}
      />

    </div>
  );
};

export default PracticeExamPage;