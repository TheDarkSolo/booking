import i18n from "i18next";
import { initReactI18next, i } from "react-i18next";

import booking from "../assets/images/booking.jpeg";
import res_exam from "../assets/images/res_exam.jpeg";
import pdd from "../assets/images/pdd.jpeg";

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru: {
      translation: {
        title: "Получение водительского удостоверения",
        menu: [
          {
            id: 1,
            menu_name: "Электронное бронирование",
            menu_img: booking,
            menu_bg_color: "#FEFEFE",
            link: "reservation",
          },


          //  {
          //     id: 2,
          //     menu_name: "Результаты экзаменов",
          //     menu_img: res_exam,
          //     menu_bg_color: "#6cb883",
          //     color_text: "#FFFFFF",
          //     link: "result-exam",
          //   },


          {
            id: 3,
            menu_name: "Инструкция ПДД",
            menu_img: pdd,
            menu_bg_color: "#deebec",
            link: "traffic-rules",
          },
        ],
        btn_title_reservation_theory_exam:
          "Онлайн бронирование для сдачи теоретического экзамена",
        btn_title_reservation_practce_exam:
          "Онлайн бронирование для сдачи практического экзамена",
        titlePageTheoryExam:
          "БРОНИРОВАТЬ ОЧЕРЕДЬ ДЛЯ СДАЧИ ТЕОРЕТИЧЕСКОГО ЭКЗАМЕНА",
        titlePagePracticeExam:
          "БРОНИРОВАТЬ ОЧЕРЕДЬ ДЛЯ СДАЧИ ПРАКТИЧЕСКОГО ЭКЗАМЕНА",
        btn_title_reservation: "Авторизоваться",
        head_text_input: "Введите ИИН. На ваш номер будет отправлен СМС-код.",
        iin_input_placeholder: "Введите ИИН",
        iin: "ИИН",
        city: "Город",
        department: "Отделение",
        category: "Категория",
        selectDate: "Выберите дату",
        time: "Время",
        goBack: "Назад",
        enterOTP: "Введите отправленный на ваш телефон номер код.",
        bron: "Забронировать",
        againOTP: "Отправить код повторно",
        error: "Ошибка",
        notPassedTheory: "Вы не сдали теоритический экзамен!",
        typeKPP: "Вид КПП",
        selectKPP: "Выберите КПП",
        hasActiveTicket: "У вас уже есть активный талон. Данные были высланы в виде SMS. Проверьте свои сообщения.",
        warningKPP: "Пожалуйста, выберите указанный при регистрации вид КПП.",
        selectDate: "Выберите дату и время.",
        notFoundRecord: "К сожалению на текущий день записи нет.",
        selectTime: "Выберите время",
        approve: "Подтвердить",
        cancel: "Отмена",
        notIINFound: "Заявитель с таким ИИН не найден.",
        wrongOTP: "Вы ввели некорректный код.",
        wrongIIN: "Неверный ИИН",
      },
    },
    kz: {
      translation: {
        title: "Жүргізуші куәлігін алу",
        menu: [
          {
            id: 1,
            menu_name: "Электрондық брондау",
            menu_img: booking,
            menu_bg_color: "#FEFEFE",
            link: "reservation",
          },
          /*
                    {
                      id: 2,
                      menu_name: "Eмтихан нәтижелері",
                      menu_img: res_exam,
                      menu_bg_color: "#6cb883",
                      color_text: "#FFFFFF",
                      link: "result-exam",
                    },
          */
          {
            id: 3,
            menu_name: "ЖҚЕ нұсқауы",
            menu_img: pdd,
            menu_bg_color: "#deebec",
            link: "traffic-rules",
          },
        ],
        btn_title_reservation_theory_exam: "Теориялық емтиханға онлайн тіркелу",
        btn_title_reservation_practce_exam:
          "Практикалық емтиханға онлайн тіркелу",
        titlePageTheoryExam: "ТЕОРИЯЛЫҚ ЕМТИХАН ӨТУ ҮШІН КЕЗЕГІН БРОНДАУ",
        titlePagePracticeExam: "ПРАКТИКАЛЫҚ ЕМТИХАН ӨТУ ҮШІН КЕЗЕГІН БРОНДАУ",
        btn_title_reservation: "Авторизация",
        head_text_input:
          "ЖСН-ді енгізіңіз. Сіздің телефон нөмеріңізге СМС-код жіберіледі.",
        iin_input_placeholder: "ЖСН-ді енгізіңіз",
        iin: "ЖСН",
        city: "Қала",
        department: "Бөлім",
        category: "Категория",
        selectDate: "Күнді таңдаңыз",
        time: "Уақыт",
        goBack: "Артқа",
        enterOTP: "Сіздің телефон нөміріңізге жіберілген кодты енгізіңіз.",
        bron: "Брондау",
        againOTP: "Кодты қайта жіберу",
        error: "Қате",
        notPassedTheory: "Сіз теориялық емтиханды тапсырмадыңыз!",
        typeKPP: "Берілістер қорабының(КПП) түрі",
        selectKPP: "БҚ(КПП) таңдаңыз",
        hasActiveTicket: "Сізде белсенді талон бар. Деректер SMS түрінде жіберілді. Хабарламаларыңызды тексеріңіз.",
        warningKPP: "Тіркелу кезінде көрсетілген берілістер қорабының түрін таңдаңыз.",
        selectDate: "Дата мен уақытты таңдаңыз.",
        notFoundRecord: "Өкінішке орай таңдалған күнге жазба жоқ.",
        selectTime: "Уақытты таңдаңыз",
        approve: "Растау",
        cancel: "Болдырмау",
        notIINFound: "Бұндай ЖСН бар өтініш беруші табылмады.",
        wrongOTP: "Сіз қате кодты енгізіңіз.",
        wrongIIN: "ЖСН қате",
      },
    },
  },
});

export default i18n;
