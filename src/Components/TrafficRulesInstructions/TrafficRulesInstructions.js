import React from 'react'
import { useTranslation } from "react-i18next";

import './TrafficRulesInstructions.css'

const TrafficRulesInstructions = () => {
  const { t } = useTranslation()
  return (
    <div className="offset_traffic_rules_inst">
      <h1 className='header_text mt-3 size_title_page text-center mb-3'>
        {/* Инструкция ПДД */}
        {t("instructionPDD")}
      </h1>
      <div className='d-flex align-items-center justify-content-center w-100 mt-2'>
        <button className='btn btn-info text-white mx-1'>
          {/* Скачать на КАЗ */}
          {t("downloadKAZ")}
        </button>
        <button className='btn btn-info text-white mx-1'>
          {/* Скачать на РУС */}
          {t("downloadRUS")}
        </button>
      </div>
    </div>
  )
}
export default TrafficRulesInstructions;
