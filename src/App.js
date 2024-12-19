import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MenuHoverProvider } from "./Context/Context";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import Reservation from "./Components/Reservation/Reservaton";
import ResultExam from "./Components/ResultExam/ResultExam";
import TrafficRulesInstructions from "./Components/TrafficRulesInstructions/TrafficRulesInstructions";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import SearchResultExam from "./Components/SearchResultExam/SearchResultExam";
import ErrorEnrollPage from "./Components/ErrorPage/ErrorEnrollPage";
import ErrorVerifyPage from "./Components/ErrorPage/ErrorVerifyPage";


//Theory routes
import TheoryExamPage from "./Components/Reservation/TheoryExamPage/TheoryExamPage";
import TheoryExamVerification from "./Components/Reservation/TheoryExamPage/TheoryExamVerification.js";
import TicketTheoryExam from "./Components/TicketTheoryExam/TicketTheoryExam";

//Practice routes
import PracticeExamPage from "./Components/Reservation/PracticeExamPage/PracticeExamPage";
import PracticeExamVerification from "./Components/Reservation/PracticeExamPage/PracticeExamVerification";
import TicketPracticeExam from "./Components/TicketPracticeExam/TicketPracticeExam";

//Trial routes
import TrialExamPage from "./Components/Reservation/TrialExamPage/TrialExamPage";
import TrialExamVerification from "./Components/Reservation/TrialExamPage/TrialExamVerification";
import TrialExamPayment from "./Components/Reservation/TrialExamPage/TrialExamPayment";
import TicketTrialExam from "./Components/TicketTrialExam/TicketTrialExam";
import trialAgreement from "/home/erbulan/booking/src/assets/images/trialAgreement.pdf";

//Marriage Routes
import MarriagePage from "./Components/Reservation/MarriagePage/MarriagePage";
import MarriageForm from "./Components/Reservation/MarriagePage/MarriageForm.js";
import MarriageVerification from "./Components/Reservation/MarriagePage/MarriageVerification";
import MarriagePayment from "./Components/Reservation/MarriagePage/MarriagePayment";
import TicketMarriage from "./Components/TicketMarriage/TicketMarriage";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MenuHoverProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/reservation" element={<Reservation />} />

            {/* PRACICE EXAM ROUTES */}
            <Route path="/practice-exam" element={<PracticeExamPage />} />
            <Route path="/practice-exam/verification" element={<PracticeExamVerification />} />
            <Route path="/practice-exam/ticket" element={<TicketPracticeExam />} />

            {/* THEORY EXAM ROUTES */}
            <Route path="/theory-exam" element={<TheoryExamPage />} />
            <Route path="/theory-exam/verification" element={<TheoryExamVerification />} />
            <Route path="/theory-exam/ticket" element={<TicketTheoryExam />} />

            {/* TRIAL EXAM ROUTES */}
            <Route path="/trial-exam" element={<TrialExamPage />} />
            <Route path="/trial-exam/agreement" element={<iframe src={trialAgreement} width="100%" height="100%" title="Iframe Example"></iframe>} />
            <Route path="/trial-exam/verification" element={<TrialExamVerification />} />
            <Route path="/trial-exam/payment" element={<TrialExamPayment />} />
            <Route path="/trial-exam/ticket" element={<TicketTrialExam />} />

            <Route path="/result-exam" element={<ResultExam />} />
            <Route path="/stream" element={<TrafficRulesInstructions />} />
            <Route path="/search-result-exam" element={<SearchResultExam />} />
            <Route path="/error-enroll-page" element={<ErrorEnrollPage />} />
            <Route path="/error-verify-page" element={<ErrorVerifyPage />} />
            <Route path="*" element={<ErrorPage />} />

            {/* MARRIAGE ROUTES */}
            <Route path="/marriage" element={<MarriagePage />} />
            <Route path="/marriage/form" element={<MarriageForm />} />
            <Route path="/marriage/verification" element={<MarriageVerification />} />
            <Route path="/marriage/payment" element={<MarriagePayment />} />
            <Route path="/marriage/ticket" element={<TicketMarriage />} />
            {/* Redirect from old marriage URL to new URL */}
            <Route path="/reservation/marriage" element={<Navigate to="/marriage" />} />

          </Routes>
        </MenuHoverProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
