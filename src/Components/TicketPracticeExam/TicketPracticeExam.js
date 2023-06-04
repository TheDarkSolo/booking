import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

export default function TicketPracticeExam() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [examId, setExamId] = useState(null);
  const [kpp, setKpp] = useState(null);


  useEffect(() => {
    const examId = sessionStorage.getItem("examId");
    setExamId(JSON.parse(examId));
    const kpp = sessionStorage.getItem("kpp");
    setKpp(JSON.parse(kpp));
    //GET INFO APPLICANT
    const user = sessionStorage.getItem("user");
    setUser(JSON.parse(user));
    //GET DATE EXAM APPLICANT ENROLLED
    const date = sessionStorage.getItem("date");;
    setDate(JSON.parse(date));
    //TRANSFORM TIME CUT SECONDS
    const time = JSON.parse(date);
    const [hours, minutes] = time.time.split(":");
    const timeWithoutSeconds = `${hours}:${minutes}`;
    setTime(timeWithoutSeconds)
  }, []);
  const downloadPdf = () => {
    html2pdf(document.getElementById('ticket'))
  }
  return (
    <>
      <div className="offset_ticket_theory_exam">
        <div id="ticket" className="d-flex flex-column h-50 w-75 border rounded border-dark p-4">
          <h3 className="text-center">Цифровой талон № {examId}</h3>
          <label className="my-2">
            <span className="ticket_text_aside">
              ИИН: <span className="fw-bold">{user?.iin}</span>
            </span>
            <span>{ }</span>
          </label>
          <label className="my-2">
            <span className="ticket_text_aside">
              Отделение: <span className="fw-bold">
                <span className="fw-bold">{user?.department}</span>
              </span>
            </span>
          </label>
          <label className="my-2">
            <span className="ticket_text_aside">
              Категория: <span className="fw-bold">
                <span className="fw-bold">{user?.category}</span>
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
          <label className="my-2">
            <span className="ticket_text_aside">
              Тип услуги: <b>Первичное получение прав</b>
              <span className="fw-bold"></span>
            </span>
            <span className="fw-bold">{user?.service}</span>
          </label>
          <div className="my-2 w-100">
            <span className="ticket_text_aside text-wrap">
              Дата:
            </span>
            <span className="fw-bold mx-2">
              {new Date(date?.date).toLocaleDateString()}
            </span>
          </div>
          <div className="my-2 w-100">
            <span className="ticket_text_aside text-wrap">
              Время:
            </span>
            <span className="fw-bold mx-2">{time}</span>
          </div>
          <p className="text-center text-danger">Сохраните этот талон</p>
        </div>
      </div>
      <button onClick={downloadPdf} type="button" className="btn btn-success">Скачать PDF</button>
    </>
  );
}
