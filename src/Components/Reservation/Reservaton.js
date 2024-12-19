import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import reservePractice from '../../assets/images/reservePractice2.png'
import reserveTheory from '../../assets/images/reserveTheory2.png'
import reserveTrial from '../../assets/images/reserveTrial.png'
import reserveMarriage from '../../assets/images/wedding_icon.png'
import reserveTrialTheory from '../../assets/images/reserveTrialTheory.svg'
import { IoIosArrowBack } from 'react-icons/io'
import token, { setToken } from "../../store/slices/token";

import "./Reservation.css";
import { useDispatch } from "react-redux";

const Reservation = () => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="offset_reservation py-5">
      <div className="d-flex w-100">
        <button className="btn_back" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
          {t("goBack")}
        </button>
      </div>
      <center>
        <div className="reservationPanels">
          <div>
            <Link className="reservationPanel" to="/theory-exam">
              <img src={reserveTheory} className="menu_choice_img" />
              <p className="reservationText">
                {/* Theory button */}
                {t("btn_title_reservation_theory_exam")}</p>
            </Link>
          </div>

          <div>
            <Link className="reservationPanel" to="/practice-exam">
              <img src={reservePractice} className="menu_choice_img" />
              <p className="reservationText">
                {/* Practice button */}
                {t("btn_title_reservation_practice_exam")}</p>
            </Link>
          </div>

          <div>
            <Link className="reservationPanel" to="/trial-exam">
              <img src={reserveTrial} className="menu_choice_img" />
              <p className="reservationText">
                {/* Trial button */}
                {t("btn_title_reservation_trial_exam")}</p>
            </Link>
          </div>

          <div>
            <Link className="reservationPanel" to="/trial-theory">
              <img src={reserveTrialTheory} className="menu_choice_img" />
              <p className="reservationText">
                {/* Trial button */}
                {t("btn_title_reservation_trialTheory_exam")}</p>
            </Link>
          </div>

          <div>
            <Link className="reservationPanel" to="/marriage">
              <img src={reserveMarriage} className="menu_choice_img" />
              <p className="reservationText">
                {/* Marriage button */}
                {t("btn_title_reservation_marriage")}</p>
            </Link>
          </div>

        </div>
      </center>
    </div>
  );
};

export default Reservation;
