import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import reserv from '../../assets/images/reserv.png'

import { IoIosArrowBack } from 'react-icons/io'
import token, { setToken } from "../../store/slices/token";

import "./Reservation.css";
import { useDispatch } from "react-redux";

const Reservation = () => {

  const dispatch = useDispatch()
  const getToken = () => {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "username": "admin",
      "password": "admin"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: "no-cors"
    };

    fetch("http://booking.gov4c.kz/api/auth/token/", {
      method: 'POST',
      headers: myHeaders,
      body: raw
      // mode: "no-cors"
    })
      .then(response => response.text())
      .then(result => dispatch(setToken(JSON.parse(result))))
      .catch(error => console.log('error', error));
  }

  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="offset_reservation py-5">
      <div className="d-flex w-100">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          назад
        </button>
      </div>
      <div className="d-flex flex-column py-5  w-100 align-items-center justify-content-center ">
        <Link className="link_btn_resev_exam" to="/reservation/practice-exam">
          <img src={reserv} className="w-25" />
          <p className="w-75 mx-5">{t("btn_title_reservation_practce_exam")}</p>
        </Link>
      </div>
    </div>
  );
};

export default Reservation;
