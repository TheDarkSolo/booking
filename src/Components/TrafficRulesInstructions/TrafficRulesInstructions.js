import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './TrafficRulesInstructions.css';

const TrafficRulesInstructions = () => {
  const { t } = useTranslation();


  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://bback.gov4c.kz/api/stream/departments/')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className="offset_traffic_rules_inst">

      <center><h1>Трансляция</h1></center>
      <br />
      <table >
        <tr>
          <td><strong>№</strong></td>
          <td><strong>Наименование СЦОН/сектора</strong></td>
          <td><strong>Cсылка для просмотра</strong></td>
        </tr>
        <tr>
          <td>1</td>
          <td>Специализированный отдел №1 г.Астана</td>
          <td><a href="https://youtube.com/live/8gmUSPI-eiY?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Специализированный отдел №1 г.Алматы</td>
          <td><a href="https://youtube.com/live/MiJh4gHcJfA?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Специализированный отдел №6 г.Алматы</td>
          <td><a href="https://youtube.com/live/6wANrRT-1_A?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Специализированный отдел №1 г.Шымкент</td>
          <td><a href="https://youtube.com/live/Q_mPhc_aFxU?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Специализированный отдел №2 г.Шымкент</td>
          <td>проводятся технические работы</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Специализированный отдел г.Семей</td>
          <td><a href="https://youtube.com/live/aWgOGgpYtqo?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>7</td>
          <td>Специализированный отдел г.Кокшетау</td>
          <td><a href="	https://youtube.com/live/BI_Gi3Mm090?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>8</td>
          <td>Специализированный отдел г.Актобе</td>
          <td><a href="https://youtube.com/live/KHwL-TLoolA?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>9</td>
          <td>Специализированный отдел г.Атырау</td>
          <td><a href="https://youtube.com/live/t-0zQHeMXfA?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>10</td>
          <td>Специализированный отдел г.Усть-Каменогорск</td>
          <td><a href="https://youtube.com/live/VvF2XGXmaFw?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>11</td>
          <td>Специализированный отдел г.Тараз</td>
          <td><a href="https://youtube.com/live/r0LQvLdAMWY?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>12</td>
          <td>Отдел Панфиловского района, г.Жаркент</td>
          <td><a href="https://youtube.com/live/jG1EUfuUh1o?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>13</td>
          <td>Специализированный отдел г. Талдыкорган</td>
          <td><a href="https://youtube.com/live/-886RTwfHKQ?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>14</td>
          <td>Специализированный отдел г.Уральск</td>
          <td><a href="https://youtube.com/live/BWj03ozaxMo?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>15</td>
          <td>Специализированный отдел г. Караганда</td>
          <td><a href="https://youtube.com/live/TpVoF7mG60A?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>16</td>
          <td>Отдел г. Аркалык</td>
          <td>проводятся технические работы</td>
        </tr>
        <tr>
          <td>17</td>
          <td>Специализированный отдел г. Костанай</td>
          <td><a href="https://youtube.com/live/8L1cy8Y22w0?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>18</td>
          <td>Специализированный отдел г.Кызылорда</td>
          <td><a href="https://youtube.com/live/Rc_sAlELw4s?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>19</td>
          <td>Специализированный сектор отдела г.Жанаозен</td>
          <td>проводятся технические работы</td>
        </tr>
        <tr>
          <td>20</td>
          <td>Специализированный отдел г. Актау</td>
          <td><a href="https://youtube.com/live/ceD7cKTMGFQ?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>21</td>
          <td>Отдел г. Экибастуз</td>
          <td>проводятся технические работы</td>
        </tr>
        <tr>
          <td>22</td>
          <td>Специализированный отдел г. Павлодар</td>
          <td><a href="https://youtube.com/live/vulccSXtre4?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>23</td>
          <td>Специализированный отдел г.Петропавловск</td>
          <td><a href="https://youtube.com/live/matQmctxyPk?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>24</td>
          <td>Специализированный отдел г. Туркестан</td>
          <td><a href="https://youtube.com/live/uh4lLgaoAPM?feature=share" target="_blank">Посмотреть</a></td>
        </tr>
        <tr>
          <td>25</td>
          <td>Специализированный отдел г.Сарыагаш</td>
          <td>проводятся технические работы</td>
        </tr>

      </table>
    </div>
  );
};

export default TrafficRulesInstructions;




// {
/* <h1 className='header_text mt-3 size_title_page text-center mb-3'>
{/* Инструкция ПДД */
// {t("instructionPDD")}
// </h1>
// <div className='d-flex align-items-center justify-content-center w-100 mt-2'>
// <button className='btn btn-info text-white mx-1'>
//   {/* Скачать на КАЗ */}
//   {t("downloadKAZ")}
// </button>
// <button className='btn btn-info text-white mx-1'>
//   {/* Скачать на РУС */}
//   {t("downloadRUS")}
// </button>
// </div> */}