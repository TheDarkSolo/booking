import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setData } from "../../../store/slices/ReservationTheoryData";

import UserDataView3 from "../UserDataView/UserDataView3";
import ModalLoading from "../ModalLoading/ModalLoading";
import { setDataUser } from "../../../store/slices/userDataSlice";
import { useTranslation } from "react-i18next";


const MarriageForm = () => {
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
  // const [exam_id, setExamId] = useState(null);
  const [slot_id, setSlotId] = useState([]);


  // const [comment, setComment] = useState("");
  const [marriageLanguage, setMarriageLanguage] = useState("");

  //SET ERROR WHEN SEND DATA AND TIME FOR RESERVATION
  const [errorText, setErrorText] = useState("");
  //SHOW ERROR IF APPLICANT NOT PASS THEORY EXAM
  const [notTheoryExam, setNotTheoryExam] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //GET APPLICANT INFO FROM REDUX
  const userData = useSelector((state) => state.userData.userData);
  //NEW MENUS
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [departmentId, setDepartmentId] = useState(userData.department_id);
  const [city, setCity] = useState(userData.city);
  const [dateBlock, setDateBlock] = useState(false);
  const [address, setAddress] = useState(userData.address);
  const [hasDriverLicense, setHasDriverLicense] = useState(false);


  const getExcludedSundays = () => {
    const todayDate = new Date();
    const excludedDates = [];

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(todayDate);
      currentDate.setDate(currentDate.getDate() + i);

      if (currentDate.getDay() === 0) { // Sunday
        excludedDates.push(currentDate.toISOString().split('T')[0]);
      }
    }

    return excludedDates;
  };

  const uniqueDatesWithTime = Array.isArray(dateList) ? dateList.filter(
    (item, index, self) =>
      self.findIndex((date) => date.date === item.date) === index
  ) : [];

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

  //SELECT CITY
  const onChangeCity = (value) => {
    setCity(value);
    const filteredDepartments = departments.filter((department) => department.city == value);
    if (filteredDepartments.length > 0) {
      setDepartmentId(filteredDepartments[0].id);
    }
    sessionStorage.setItem("city", value);
  }
  //SELECT DEPARTMENT
  const onChangeSelectDepartment = (value) => {
    setDepartmentId(value);
  }

  //SHOW SELECTORS OF DATE AND TIME
  const dateButtonClick = () => {
    if (hasDriverLicense) {
      setDateBlock(false);
      getFreeExamTrial();
      // document.getElementById('service-select').disabled = true;
      document.getElementById('city-select').disabled = true;
      document.getElementById('department-select').disabled = true;
      document.getElementById('language-select').disabled = true;
      document.getElementById('chooseDateBtn').style.display = 'none';

    } else {
      setDateBlock(true);
      getFreeExamTrial();
      // document.getElementById('service-select').disabled = true;
      document.getElementById('city-select').disabled = true;
      document.getElementById('language-select').disabled = true;
      document.getElementById('department-select').disabled = true;
      document.getElementById('chooseDateBtn').style.display = 'none';

    }
  }

  //SELECT DATE
  const onChangeSelectDate = (value) => {
    setDate(value);

    const sortedTime = dateList.filter((item) => item.date.includes(value));

    dispatch(setData(sortedTime));
    setTime(sortedTime);
  };


  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleTimeChange = (event) => {
    if (event.target.checked) {
      const newTime = event.target.value;
      const timeObj = {
        date: date,
        time: newTime
      };
      sessionStorage.setItem("date", JSON.stringify(timeObj));

      const obj = time.find((item) => item.time.includes(newTime));

      if (obj && obj.id) {
        // Replace the slot_id array with a new array containing only the new id
        setSlotId([obj.id.toString()]);
      }

      // Replace the selectedTimes array with a new array containing only the new time
      setSelectedTimes([newTime]);
    }
  };

  const onChangeSelectTime = (value) => {
    const obj = time.find((item) => item.time.includes(value));

    if (obj) {
      const timeObj = {
        date: obj.date,
        time: obj.time,
      };

      sessionStorage.setItem("date", JSON.stringify(timeObj));
      setSlotId(obj.id);
    }
  };

  //APPLICANT SELECTED DATE AND TIME SEND DATA
  const handleSubmitMarriage = () => {
    console.log("Submitting with slot_id:", slot_id);

    const obj = {
      user_id: userData.id,
      slot_id: slot_id, //array was examId
      department_id: departmentId,
      marriageLanguage: marriageLanguage,
      // comment: comment,

    };

    console.log("obj", obj);

    postUserExamData(obj);
    setLoading(true);
    sessionStorage.setItem("slot_id", JSON.stringify(slot_id));
    console.log("slot_id", slot_id);

    sessionStorage.setItem("marriageLanguage", JSON.stringify((marriageLanguage === "Русский" ? "ru" : marriageLanguage === "Қазақша" ? "kz" : "kz")));
    console.log("marriageLanguage", marriageLanguage);

    const department = departments.find((department) => department.id == departmentId);
    sessionStorage.setItem("department", JSON.stringify(department.name));
    sessionStorage.setItem("address", JSON.stringify(department.address));



    //LOADING ANIMATE
    setTimeout(() => {
      setLoading(false);
    }, 500);
    reset();
  };

  //fetches
  // ===========NEW DROPDOWN MENU FUNCTIONS========================
  //GET CITIES
  const fetchCities = async () => {
    const url = "/api/marriage/cities/";
    const token = userData.token;
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCities(data);
  };

  // //GET DEPARTMENTS
  const fetchDepartments = async () => {
    const url = "/api/marriage/departments/";
    const token = userData.token;
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setDepartments(data);
  };

  //GET FREE PRACTICE EXAM
  const getFreeExamTrial = async () => {
    // "/api/practice/free/exams/";
    const url = "/api/marriage/free/slots/";
    const iin = sessionStorage.getItem("iin").replace(/[^0-9]/g, "");
    const token = userData.token;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "iin": iin,
        "department_id": departmentId,
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
        if (data.error == "Ошибка: Данная услуга предназначена только для лиц без водительских удостоверений") {
          console.log("Ошибка: Данная услуга предназначена только для лиц без водительских удостоверений");
          setHasDriverLicense(true);
        } else {
          if (data.length === 0) {
            setDateError(true);
            setDateList(data);
          } else {
            setDateError(false);
            setDateList(data);
          }
        }
      }

      )
      .catch(function (res) { });
  };

  const postUserExamData = (user_exam_data) => {
    navigate("/reservation/marriage/verification");
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    setToday(todayDate);
    // Fetching data for dropdowns // NEW MENU FUNCTIONS
    fetchCities();
    fetchDepartments();
  }, []);

  //HTML

  return (
    <div className="form_input_date_item">
      {/* SHOW APPLICANT INFO */}
      <div className="d-flex align-items-start justify-content-center form-control my-4 ">
        <UserDataView3 />
      </div>
      <h2>{errorText}</h2>
      {/* APPLICANT NOT PASS THEORY EXAM */}
      {notTheoryExam.length !== 0 ? <h2>{notTheoryExam}</h2> : null}

      <form className="fs-5"
        onSubmit={handleSubmit(handleSubmitMarriage)}
      >
        {/* ================SELECT CITY================ */}
        <div class="form-group mb-3">
          <label for="city-select">
            {/*Выберите город*/}
            {t("selectCity")}
          </label>
          <select class="form-select" id="city-select" onChange={(e) => onChangeCity(e.target.value)}>
            <option selected disabled value="">
              {t("selectCity")}
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id} selected={city.name == userData.city}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* ================SELECT DEPARTMENT================ */}
        <div class="form-group mb-3">
          <label for="department-select">
            {/*Выберите департамент*/}
            {t("selectRags")}

          </label>
          <select class="form-select" id="department-select" onChange={(e) => onChangeSelectDepartment(e.target.value)}>
            <option selected disabled value="">
              {t("selectRags")}
            </option>

            {Array.isArray(departments) && departments
              .filter((department) => department.city == document.getElementById('city-select').value)
              .map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                /*selected={department.id == userData.department_id}*/
                >
                  {department.name}
                </option>
              ))}

          </select>
        </div>

        {/* ================SELECT LANGUAGE================ */}
        <div class="form-group mb-3">
          <label for="language-select">
            {/*Выберите язык проведения торжества*/}
            {t("selectLanguage")}
          </label>
          <select class="form-select" id="language-select" onChange={(e) => setMarriageLanguage(e.target.value)}>
            <option selected disabled value="">
              {t("selectLanguage")}
            </option>
            <option>Қазақша</option>
            <option>Русский</option>
          </select>
        </div>

        {/*Кнопка Выбрать дату*/}
        <center>
          <button
            className="btn btn-success my-2"
            id="chooseDateBtn"
            type="button"
            onClick={dateButtonClick}
          >
            {/*Выбрать дату и время*/}
            {t("selectDateButton")}
          </button>
        </center>


        {/* ===========ВЫБЕРИТЕ ДАТУ============== */}
        {dateBlock && (
          <div className="date">
            <div class="form-group mb-3">
              {/* SELECT DATE */}
              <label for="date-picker">{t("selectDateTitle")}</label>
              <select
                id="date-picker"
                className="form-control form-group-lg form-select"
                {...register("selectDate", { required: true })}
                onChange={(e) => onChangeSelectDate(e.target.value)}
              >
                <option selected disabled value="">
                  {t("selectDate")}
                </option>

                {setHasDriverLicense && (
                  uniqueDatesWithTime.map((item) => (
                    <option
                      key={item.id}
                      value={item.date}
                    >
                      {item.date}
                    </option>
                  ))
                )}


              </select>

              {dateError ? (
                <small class="text-danger">
                  {/* К сожалению на текущий день записи нет. */}
                  {t("notFoundRecord")}
                </small>
                // <p className="fs-5 my-2 text-danger">К сожалению в текущий день нету записей</p>
              ) : null}
            </div>

            {/* ================ВЫБЕРИТЕ ВРЕМЯ============== */}

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
                <option value="">
                  {/* * Выберите время */}
                  {t("selectTime")}
                </option>
                {time?.map((time) => (
                  <option key={time.id}>{time.time}</option>
                ))}
              </select>

            </div>

            {hasDriverLicense && <p className="text-danger fs-3">{t("hasDriverLicense")}</p>}

            <div class="form-group text-center">

              <p className="text-center mt-5 text-danger">
                {t("marriageSMS")}
              </p>

              <button className="btn btn-danger" onClick={() => navigate(-2)}>{/* Отмена */}{t("cancel")}</button>


              <button
                className="btn btn-success"

                type="submit"
                // disabled={selectedTimes.length === 0}
                disabled={slot_id === null}


              >{/* Подтвердить */} {t("approve")}</button>
            </div>

          </div>)
        }



      </form >
      {loading && <ModalLoading isLoading={loading} />}
    </div >
  );
};

export default MarriageForm;