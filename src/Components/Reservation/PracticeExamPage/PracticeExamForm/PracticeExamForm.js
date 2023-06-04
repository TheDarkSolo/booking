import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setData } from "../../../../store/slices/ReservationTheoryData";

import UserDataView from "../../UserDataView/UserDataView";
import ModalLoading from "../../ModalLoading/ModalLoading";
import { setDataUser } from "../../../../store/slices/userDataSlice";
import { useTranslation } from "react-i18next";


const PracticeExamForm = () => {
  const { t } = useTranslation()
  //LOADING ANIMATION
  const [loading, setLoading] = useState(false);
  //SET TODAY DATE FOR DATEPICKER
  const [today, setToday] = useState(null);

  //IF DATE IN THIS DAY NOT EXAMS
  const [dateError, setDateError] = useState(false);
  // DATE FREE EXAM LIST FOR PRACTICE
  const [dateList, setDateList] = useState([]);
  // APPLICANT SELECTED DATE
  const [date, setDate] = useState("");
  //APPLICANT SELECTED TIME
  const [time, setTime] = useState(null);
  //SET EXAMID
  const [examId, setExamId] = useState(null);
  //SELECTED KPP IF APPLICANT HAVE CATEGORY "B"
  const [kppApp, setKPP] = useState("");
  //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
  const [errorText, setErrorText] = useState("");
  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notTheoryExam, setNotTheoryExam] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //GET APPLICANT INFO FROM REDUX
  const userData = useSelector((state) => state.userData.userData);
  const token = useSelector(state => state.token.token)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    selectCity: "",
    selectAddress: "",
    selectDate: "",
    IIN: "",
    mode: "onChange",
  });

  //SELECT DATE
  const onChangeSelectDate = (value) => {
    setDate(value);

    const sortedTime = dateList.filter((item) => item.date.includes(value));

    dispatch(setData(sortedTime));
    setTime(sortedTime);
  };

  //SELECT TIME
  const onChangeSelectTime = (value) => {
    const obj = time.filter((item) => item.time.includes(value));

    const timeObj = {
      date: obj[0]?.date,
      time: obj[0]?.time,
    };

    const obj1 = sessionStorage.getItem("date");
    if (obj1 === null) {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    } else {
      sessionStorage.setItem("date", JSON.stringify(timeObj));
    }
    setExamId(obj[0]?.id);
  };

  //GET FREE PRACTICE EXAM
  const getFreeExamPractice = async (id_depart, kpp) => {
    const url = "https://bback.gov4c.kz/api/practice/free/exams/";

    const id = userData.department_id;
    const categoryName = userData.category;
    //const kpp = kppApp !== "" ? kppApp : 'MT';
    const iin = sessionStorage.getItem("iin").replace(/[^0-9]/g, "");
    const token = userData.token;
    //console.log(token);
    //console.log(iin);
    //  console.log("iin:" + iin + ", id:"+id+", categoryName:"+categoryName+", kpp:"+kpp + ", );
    //  console.log("iin" + iin);
    //  console.log("id" + id);
    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        /*"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",*/
      },
      method: "POST",
      body: JSON.stringify({
        "iin": iin,
        "department_id": id,
        "category": categoryName,
        "kpp": kpp,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((data) => {
        if (data.length === 0) {
          setDateError(true);
          setDateList(data);
        } else {
          setDateError(false);
          setDateList(data);
        }
      })
      .catch(function (res) { });
  };


  //SELECT KPP
  const onChangeSelectKPP = (value) => {
    setKPP(value);

    // Вызов функции getFreeExamPractice при выборе опции селектора "AT" или "MT"
    if (value === "AT" || value === "MT") {
      getFreeExamPractice(userData.department_code, value);
    }

  };



  //POST DATA TO SERVER AFTER CHOISE APPLICANT DATE AND TIME
  const postUserExamData = (user_exam_data) => {
    const url = "https://bback.gov4c.kz/api/practice/enroll/queue/";
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
          navigate("/reservation/practice-exam/ticket");
        }
        //APPLICANT NOT ENRLLED GET ERROR FROM SERVER
        else if (res.error) {
          setNotTheoryExam(res.error);
        }
      })
      .catch(function (res) {
        setErrorText(res);
      });
  };

  //APPLICANT SELECTED DATE AND TIME SEND DATA
  const handleSubmitPracticeExam = () => {
    const obj = {
      user_id: userData.id,
      exam_id: examId,
      kpp: kppApp
    };

    postUserExamData(obj);
    setLoading(true);
    sessionStorage.setItem("examId", JSON.stringify(examId));
    sessionStorage.setItem("kpp", JSON.stringify(kppApp));
    //LOADING ANIMATE
    setTimeout(() => {
      setLoading(false);
    }, 500);
    reset();
  };

  // const userData = JSON.parse(sessionStorage.getItem("user"))
  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    //getFreeExamPractice(userData.department_code, token.access);
  }, []);
  return (
    <div className="form_input_date_item">
      {/* SHOW APPLICANT INFO */}
      <div className="d-flex align-items-start justify-content-center form-control my-4 ">
        <UserDataView />
      </div>
      <h2>{errorText}</h2>
      {/* APPLICANT NOT PASS THEORY EXAM */}
      {notTheoryExam.length !== 0 ? <h2>{notTheoryExam}</h2> : null}
      <form className="fs-5" onSubmit={handleSubmit(handleSubmitPracticeExam)}>
        {userData.category === "B" && (<div class="form-group mb-3">
          <label for="kpp-select" className="fs-5">Вид КПП</label>
          <select class="form-select" id="kpp-select" onChange={(e) => onChangeSelectKPP(e.target.value)}>
            {<option selected disabled value="MT">Выберите КПП</option>}
            <option value="MT">Механика</option>
            <option value="AT">Автомат</option>
          </select>
          <small class="text-danger fs-5">Пожалуйста, выберите указанный при регистрации вид КПП.</small>
        </div>)}
        <div class="form-group mb-3">
          {/* SELECT DATE */}
          <label for="date-picker">{t("selectDate")}</label>
          <input
            id="date-picker"
            className="form-control form-group-lg"
            {...register("selectDate", { required: true })}
            type="date"
            min={today || dateList[0]?.date}
            max={dateList[dateList.length - 1]?.date}
            disabled={dateList.length === 0}
            onChange={(e) => onChangeSelectDate(e.target.value)}
          />
          {/* ERROR*/}
          {errors?.selectDate && (
            <small class="text-danger">Выберите дату и время.</small>
            // <p className="error_text text-danger my-2">Выберите дату и время</p>
          )}
          {/* ERROR */}
          {dateError ? (
            <small class="text-danger">К сожалению на текущий день записи нет.</small>
            // <p className="fs-5 my-2 text-danger">К сожалению в текущий день нету записей</p>
          ) : null}
        </div>
        <div class="form-group mb-5">
          {/* SELECT TIME */}
          <label for="time-select">{t("time")}</label>
          <select
            id="time-select"
            className="form-select"
            {...register("selectTime", { required: true })}
            disabled={date === "" || time?.length === 0}
            onChange={(e) => onChangeSelectTime(e.target.value)}
          >
            <option value="">Выберите время</option>
            {time?.map((time) => (
              <option key={time.id}>{time.time}</option>
            ))}
          </select>
        </div>
        <div class="form-group text-center">
          <button className="btn btn-danger mx-5" onClick={() => reset()}>Отмена</button>
          <button
            className="btn btn-success mx-5"
            type="submit"
            disabled={examId === null}
          >Подтвердить</button>
        </div>
      </form>
      {loading && <ModalLoading isLoading={loading} />}
    </div>
  );
};

export default PracticeExamForm;
