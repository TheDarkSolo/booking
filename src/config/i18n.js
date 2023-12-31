import i18n from "i18next";
import { initReactI18next, i } from "react-i18next";

import booking from "../assets/images/booking.jpeg";
import res_exam from "../assets/images/res_exam.jpeg";
import pdd from "../assets/images/pdd.png";

// ============================
export const getCurrentLanguage = () => {
  return i18n.language;
}
// ============================

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru: {
      translation: {
        title: "Предварительное бронирование электронной очереди на сдачу экзаменов для получения водительского удостоверения",
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
            menu_name: "Трансляция",
            menu_img: pdd,
            menu_bg_color: "#deebec",
            link: "stream",
          },
        ],
        btn_title_reservation_theory_exam:
          "Онлайн бронирование для сдачи теоретического экзамена",
        btn_title_reservation_practice_exam:
          "Онлайн бронирование для сдачи практического экзамена",
        titlePageTheoryExam:
          "Предварительная запись на сдачу теоретического экзамена",
        titlePagePracticeExam:
          "Предварительная запись на сдачу практического экзамена",
        btn_title_reservation: "Авторизоваться",
        head_text_input: "После ввода данных, проверочный код будет направлен на Ваш абонентский номер телефона. Убедитесь, что он зарегистрирован в базе мобильных граждан по указанному ИИН",
        iin_input_placeholder: "Введите ИИН",
        iin: "ИИН",
        city: "Город",
        department: "Отделение",
        category: "Категория",
        selectDateTitle: "Дата",
        time: "Время",
        goBack: "Назад",
        enterOTP: "Введите код отправленный на ваш номер телефона",
        bron: "Забронировать",
        againOTP: "Отправить код повторно",
        error: "Ошибка",
        notPassedTheory: "Вы не сдали теоретический экзамен!",
        typeKPP: "Вид КПП",
        selectKPP: "Выберите КПП",
        hasActiveTicket: "У вас уже есть активный талон. Данные были высланы ранее в виде SMS. Ниже информация по вашему талону:",
        warningKPP: "Пожалуйста, выберите указанный при регистрации вид КПП.",
        selectDate: "Выберите дату",
        notFoundRecord: "К сожалению на текущий день записи нет.",
        selectTime: "Выберите время",
        approve: "Подтвердить",
        cancel: "Отмена",
        notIINFound: "Заявитель с таким ИИН не найден.",
        wrongOTP: "Вы ввели некорректный код",
        noAppNumber: "У вас ошибочный номер заявки.",
        wrongIIN: "Неверный ИИН",
        instructionPDD: "Инструкция ПДД",
        downloadKAZ: "Скачать на КАЗ",
        downloadRUS: "Скачать на РУС",
        selectCity: "Выберите регион",
        selectDepartment: "Выберите Специализированный ЦОН",
        selectCategory: "Выберите категорию",
        selectDateButton: "Выбрать дату и время",
        stateCorp: "НАО «Государственная корпорация»",
        gov4c: "«Правительство для граждан»",
        callCenter: "Единый контакт-центр",
        callFree: "(Звонок бесплатный)",

        talonServiceType: "Тип услуги: ",
        talonService: "Первичное получение прав",
        talonData: "Дата:",
        talonTime: "Время:",
        talonAddress: "Адрес:",
        talonSave: "Сохраните этот талон",
        talonPDF: "Скачать PDF",
        talonDigital: "Цифровой талон №",
        talonNote: "Примечание: При <span>повторной пересдаче</span> практического экзамена обратитесь в Специализированный ЦОН или используйте сервис 'ВидеоЦОН' в мобильном приложении 'ЦОН' для получения новой заявки.",

        talonNoteTheory: "Примечание: При <span>повторной пересдаче</span> теоритического экзамена обратитесь в Специализированный ЦОН или используйте сервис 'ВидеоЦОН' в мобильном приложении 'ЦОН' для получения новой заявки.",


        bmgNote: "Уважаемый услугополучатель, убедитесь что ваш абонентский номер телефона зарегистрирован в базе мобильных граждан по указанному ИИН",
        smsNote: "После того как Вы выбрали дату и время,  сформируется цифровой талон и придет СМС уведомление от 1414",

        preliminaryInfo: "Предварительная информация",
        verificationNote: "Удостоверьтесь в правильности введенных данных. После нажатия кнопки «Подтвердить» бронирование не подлежит отмене.",
        verificationDecline: "Отменить",
        verificationApprove: "Подтвердить",

        applicationNumber: "Номер заявки",

        fullName: "ФИО",

        talonServiceTheory: "Регистрация на теоритический экзамен",

        textTheory1: "Первичное получение водительских удостоверений на право управления ТС",
        textTheory2: "Получение водительских удостоверений дополнительной категории на право управления транспортными средствами",
        textTheory3: "Замена водительских удостоверений по причине окончания срока действия",
        textTheory4: "Возвращение ранее выданного Водительского удостоверения после лишения",


        examDate: "Дата экзамена",
        examTime: "Время экзамена",
        examDepartment: "ЦОН",

        expiredAppNumber: "Срок действия заявки истек",

        hasDriverLicense: "Данная услуга предназначена только для лиц без водительских удостоверений",

        stream: "Смотреть онлайн трансляцию теоретического экзамена",

        streamLink: "Cсылка на трансляцию",

        streamSectorName: "Наименование СЦОН/Секторов СЦОН",

        streamWatch: "Посмотреть",

        addInfo: "Для получения номера заявки обратитесь спецЦОН или позвоните видеооператору",

      },
    },
    kz: {
      translation: {
        title: "Жүргізуші куәлігін алу үшін емтиханға электронды кезекті алдын ала брондау",
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
            menu_name: "Трансляция",
            menu_img: pdd,
            menu_bg_color: "#deebec",
            link: "stream",
          },
        ],
        btn_title_reservation_theory_exam: "Теориялық емтиханға онлайн тіркелу",
        btn_title_reservation_practice_exam:
          "Практикалық емтиханға онлайн тіркелу",
        titlePageTheoryExam: "Теориялық емтиханға алдын ала жазылу",
        titlePagePracticeExam: "Тәжірибелік емтиханға алдын ала жазылу",
        btn_title_reservation: "Авторизация",
        head_text_input:
          "Деректерді енгізгеннен кейін, сіздің абоненттік телефон нөміріңізге тексеру коды жіберіледі. Ол ұялы байланыстағы азаматтар базасында тіркелгеніне көз жеткізіңіз.",
        iin_input_placeholder: "ЖСН-ды енгізіңіз",
        iin: "ЖСН",
        city: "Қала",
        department: "Бөлім",
        category: "Категория",
        selectDateTitle: "Күні",
        time: "Уақыт",
        goBack: "Артқа",
        enterOTP: "Сіздің телефон нөміріңізге жіберілген кодты енгізіңіз.",
        bron: "Брондау",
        againOTP: "Кодты қайта жіберу",
        error: "Қате",
        notPassedTheory: "Сіз теориялық емтиханды тапсырмадыңыз!",
        typeKPP: "Берілістер қорабының(КПП) түрі",
        selectKPP: "БҚ(КПП) таңдаңыз",
        hasActiveTicket: "Сізде белсенді талон бар. Деректер алдында SMS түрінде жіберілді. Талоныңыз туралы ақпарат төменде көрсетілген:",
        warningKPP: "Тіркелу кезінде көрсетілген берілістер қорабының түрін таңдаңыз.",
        selectDate: "Күнді таңдаңыз",
        notFoundRecord: "Өкінішке орай таңдалған күнге жазба жоқ.",
        selectTime: "Уақытты таңдаңыз",
        approve: "Растау",
        cancel: "Болдырмау",
        notIINFound: "Бұндай ЖСН бар өтініш беруші табылмады.",
        wrongOTP: "Сіз қате кодты енгіздіңіз.",
        noAppNumber: "Сіздің өтініш нөміріңіз қате.",
        wrongIIN: "ЖСН қате",
        instructionPDD: "ЖҚЕ нұсқауы",
        downloadKAZ: "Қазақ тіліндегі нұсқауды жүктеу",
        downloadRUS: "Орыс тіліндегі нұсқауды жүктеу",
        selectCity: "Регионды таңдаңыз",
        selectDepartment: "Мамандандырылған ХҚКО таңдаңыз",
        selectCategory: "Категорияны таңдау",
        selectDateButton: "Күн мен уақытты таңдау",
        stateCorp: "«Азаматтарға арналған үкімет»",
        gov4c: "Мемлекеттік корпорациясы» КЕ АҚ",
        callCenter: "Бірыңғай байланыс орталығы",
        callFree: "(Қоңырау шалу тегін)",

        talonServiceType: "Қызмет түрі: ",
        talonService: "Жүргізуші куәлігін алу",
        talonData: "Күні:",
        talonTime: "Уақыты:",
        talonAddress: "Мекен-жайы:",
        talonSave: "Талонды сақтап қойыңыз",
        talonPDF: "PDF файлды жүктеу",
        talonDigital: "Цифрлық талон №",
        talonNote: "Ескерту: Егер сіз практикалық емтиханды <span>қайта тапсырып</span> жатсаңыз, онда алдымен Cізге Мамандандырылған ХҚКО жүгініп немесе 'ХҚКО' мобильдік қосымшасындағы 'Бейнеқызмет' сервисі арқылы жаңа өтінім алу қажет.",

        talonNoteTheory: "Ескерту: Егер сіз теориялық емтиханды <span>қайта тапсырып</span> жатсаңыз, онда алдымен Cізге Мамандандырылған ХҚКО жүгініп немесе 'ХҚКО' мобильдік қосымшасындағы 'Бейнеқызмет' сервисі арқылы жаңа өтінім алу қажет.",

        bmgNote: "Құрметті қызмет алушы, абоненттік телефон нөміріңіз көрсетілген ЖСН бойынша ұялы байланыстағы азаматтар базасында тіркелгеніне көз жеткізіңіз",
        smsNote: "Күн мен уақытты таңдағаннан кейін цифрлық билет жасалады және 1414 нөмірінен SMS хабарлама жіберіледі",

        preliminaryInfo: "Алдын ала ақпарат",
        verificationNote: "Енгізілген деректердің дұрыстығына көз жеткізіңіз. «Растау» түймесін басқаннан кейін брондаудан бас тарту мүмкін емес.",
        verificationDecline: "Бас тарту",
        verificationApprove: "Растау",

        applicationNumber: "Өтініш нөмірі",

        fullName: "Аты-жөні",

        talonServiceTheory: "Теориялық емтиханға тіркелу",

        textTheory1: "Көлік құралын басқару құқығына бірінші рет жүргізуші куәлігін алу",
        textTheory2: "Көлік құралдарын басқару құқығына қосымша санаттағы жүргізуші куәлігін алу",
        textTheory3: "Жүргізуші куәлігін мерзімінің аяқталуына байланысты ауыстыру",
        textTheory4: "Айырылғаннан кейін бұрын берілген жүргізуші куәлігін қайтару",

        examDate: "Емтихан күні",
        examTime: "Емтихан уақыты",
        examDepartment: "ХҚКО",

        expiredAppNumber: "Өтініш нөмірінің мерзімі аяқталды",

        hasDriverLicense: "Бұл қызмет тек жүргізуші куәлігі бар адамдар үшін арналған",

        stream: "Теориялық емтихан тапсыру процесінің онлайн трансляциясы",

        streamLink: "Трансляцияға сілтеме",
        streamSectorName: "Мамандандырылған ХҚКО/Мамандандырылған секторлар атауы",
        streamWatch: "Көру",

        addInfo: "Өтінім нөмірін алу үшін Мамандандырылған ХҚКО-ға жүгініңіз немесе бейнеоператорға қоңырау шалыңыз",
      },
    },
  },
});

export default i18n;
