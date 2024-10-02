import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';


export default function TicketTrialExam() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [exam_id, setExamId] = useState(null);
  const [kpp, setKpp] = useState(null);
  const [category, setCategory] = useState(null);
  const [department, setDepartment] = useState(null);
  const [address, setAddress] = useState(null);
  const { t } = useTranslation()

  useEffect(() => {
    const exam_id = sessionStorage.getItem("exam_id");
    setExamId(JSON.parse(exam_id));
    const kpp = sessionStorage.getItem("kpp");
    setKpp(JSON.parse(kpp));
    //GET INFO APPLICANT
    const user = sessionStorage.getItem("user");
    setUser(JSON.parse(user));
    //GET DATE EXAM APPLICANT ENROLLED
    const date = sessionStorage.getItem("date");;
    setDate(JSON.parse(date));
    const category = sessionStorage.getItem("category");
    setCategory(JSON.parse(category));
    const department = sessionStorage.getItem("department");
    setDepartment(JSON.parse(department));

    const address = sessionStorage.getItem("address");
    setAddress(JSON.parse(address));

    //TRANSFORM TIME CUT SECONDS
    const time = JSON.parse(date);
    const [hours, minutes] = time.time.split(":");
    const timeWithoutSeconds = `${hours}:${minutes}`;
    setTime(timeWithoutSeconds);
  }, []);

  const downloadPdf = () => {
    // Clone the entire body, as it contains all the elements (ticket, logo, etc.)
    const content = document.body.cloneNode(true);

    // Remove the download button and language selector from the cloned content
    const btn = content.querySelector('.btn-success');
    const langSelector = content.querySelector('.form-select');

    if (btn) btn.remove();
    if (langSelector) langSelector.remove();

    // Optionally, add inline styles for PDF formatting
    const pdfWrapper = document.createElement("div");
    pdfWrapper.className = "pdf-style"; // Add a unique class for PDF styles
    pdfWrapper.appendChild(content);

    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .pdf-style #ticketFinal {
        width: 80% !important; /* Adjust width for better PDF formatting */
        margin: 0 auto;
        padding: 20px;
        border: 1px solid black;
        border-radius: 8px;
      }
      .pdf-style img {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
      }
    `;
    pdfWrapper.appendChild(styleElement);

    // Use html2pdf to convert the content to a PDF
    html2pdf()
      .from(pdfWrapper)
      .set({
        margin: [10, 10, 10, 10], // Adjust margins as needed
        filename: "ticket.pdf",
        html2canvas: { scale: 3 }, // Scale for higher resolution
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // A4 format, portrait
      })
      .save();
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <div id="ticketFinal" className="d-flex flex-column border rounded border-dark p-4">
          <h3 className="text-center">
            {t("talonDigitalMarriage")}
            {/* Цифровой талон */}
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
          <label className="my-2">
            <span className="ticket_text_aside">
              {t("talonServiceType")}
              {/* Тип услуги:  */}
              <b>
                {t("serviceTrial")}
                {/* Первичное получение прав */}
              </b>
              <span className="fw-bold"></span>
            </span>
            <span className="fw-bold">{user?.service}</span>
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

            {/* <span className="fw-bold mx-2">
              {time && Array.isArray(time) && time.map((timeSlot, index) => (
                <span key={index}>
                  {timeSlot}
                  {index < time.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span> */}

            <span className="fw-bold mx-2">{time}</span>

          </div>

          <div className="my-2 w-100">
            <span className="ticket_text_aside text-wrap">
              {t("talonAddress")}
              {/* Адрес: */}
            </span>
            <span className="fw-bold mx-2">{address}</span>
          </div>

          <p className="text-center text-muted mt-4">
            <Trans
              i18nKey="dtp"
              components={{
                span: <span style={{ color: 'blue' }} />
              }}
            />
          </p>

          {/* <p className="text-center text-muted">
            <a href="https://booking.gov4c.kz/">https://booking.gov4c.kz/</a>
          </p> */}

          <p className="text-center text-danger">
            {t("talonSave")}
            {/* Сохраните этот талон */}
          </p>
        </div >
      </div >
      <br></br>
      <center>
        <button onClick={downloadPdf} type="button" className="btn btn-success">
          {t("talonPDF")}
          {/* Скачать PDF */}
        </button>
      </center>
    </>
  );
}