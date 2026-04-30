# Wonders - Билеты на вершину

Работа над проектом будет разбита на 2 части. 

### Часть 1
Сначала HTML.
Потом CSS.

Преступаем к изучению блока JS.

### Часть 2
Реализуем JavaScript в проекте.

## Дедлайн

Для каждой части будет выделено 2 недели.


**Общие технические требования:**

*   Комментировать код для лучшей читаемости и понимания.
*   Использовать GitHub для хранения проекта.
*   Использивать GitHub Pages или другой сервис для деплоя проекта.
*   Проверять работу в разных браузерах Chrome, Firefox, Edge, Safari.
*   Краткое описание проекта и инструкция по запуску в файле README.md.

---------------

## 1. Homepage

Создание главной страницы сайта для разрешений 1440px, 768px, 360px, включая форму поиска, выпадающие списки, бургер-меню.

*   **Задачи:**

    *   **HTML:**
        *   Создать общую структуру страницы.
        *   Добавляем форму поиска:
        	*   Поля, куда будем вводить станции "Откуда" (Departure) и "Куда" (Arrival) (с выпадающими подсказками!).
        	*   Выбор типа поездки: "Туда и обратно" (Round Trip) или "В один конец" (One Way)(радиокнопки).
        	*   Календарь, чтобы выбирать дату поездки.
        	*   Счётчик пассажиров (сколько человек поедет).
        	*   Кнопка `Find My Alpine Ride`.

    *   **CSS:**
        *   Стилизация всех элементов страницы согласно макетам.
        *   Полная адаптивная верстка для разрешений 1440px, 768px, 360px.
        *   Реализация и стилизация бургер-меню для мобильных разрешений.
        *   Стилизация выпадающих списков станций.

    *   **JavaScript:**
        *   Логика работы бургер-меню (открытие/закрытие).
        *   Выпадающие меню "Откуда" (Departure) и "Куда" (Arrival):
            * Реализуйте автодополнение на основе массива данных `Stations` - опционально!
            * При вводе текста фильтровать список, отображая подходящие варианты.
        *	Календарь:
             * Реализуйте календарь с выбором дат.
             * Настройте ограничения для обратной даты.
        *   Валидация формы поиска:
            *   Проверка заполненности полей.
            *   Проверка корректности выбора станций (чтобы не совпадали).
            *   Проверка даты (чтобы не была в прошлом).
        *   Обработка добавления/уменьшения количества пассажиров. Добавьте логику для лимита пассажиров (не больше 12).
        *   При нажатии на кнопку `Find My Alpine Ride` должна открываться страница bus-list.html (пока мы делаем имитацию перехода).

## 2. **Организация проекта и файлов**

**Минимальная структура:**

```
jr-module-1-frontend-project/
├── index.html
├── style.css
├── assets/
│    ├── images/
│    └── icons/
└── module-1-frontend-project.md
```

*Так же вы можете добавить*: `assets/fonts/` — если добавляете свои шрифты.

В HTML подключайте только необходимые файлы (избегайте мусора и лишних подключений).

---------------

## 50 автобусных станций в Альпах

```javascript 
const Stations = [
    // Switzerland
    "Zermatt Bus Terminal",
    "Interlaken Ost Bus Station",
    "Grindelwald Bus Terminal",
    "Lauterbrunnen Bahnhof",
    "Lucerne Bahnhofquai",
    "Chamonix-Mont-Blanc Sud (France, near Swiss border)",
    "Geneva Bus Station",
    "Bern PostAuto Terminal",
    "Gstaad Bus Station",
    "St. Moritz Bahnhof PostAuto",
    "Verbier Village",
    "Davos Platz Postautohaltestelle",
    "Andermatt Gotthardpass",
    "Täsch Bahnhof (Shuttle to Zermatt)",
    "Flims Dorf Post",

    // France
    "Chamonix Sud Bus Station",
    "Annecy Gare Routière",
    "Grenoble Gare Routière",
    "Nice Airport (Bus to Alps)",
    "Bourg-Saint-Maurice Gare Routière",
    "Morzine Gare Routière",
    "Les Gets Gare Routière",
    "Val d'Isère Centre",
    "Courchevel 1850",
    "Megève Place du Village",

    // Italy
    "Aosta Autostazione",
    "Bolzano Autostazione",
    "Trento Autostazione",
    "Cortina d'Ampezzo Autostazione",
    "Bormio Bus Station",
    "Livigno Centro",
    "Merano Autostazione",
    "Sestriere Bus Stop",
    "Ortisei (St. Ulrich) Autostazione",
    "Canazei Piazza Marconi",

    // Austria
    "Innsbruck Hauptbahnhof Bus Terminal",
    "Salzburg Süd Busbahnhof",
    "Mayrhofen Bahnhof",
    "Lech am Arlberg Postamt",
    "Kitzbühel Hahnenkammbahn",
    "Ischgl Seilbahn",
    "Zell am See Postplatz",
    "Bad Gastein Bahnhof",
    "St. Anton am Arlberg Bahnhof",
    "Sölden Postamt",

    // Germany
    "Garmisch-Partenkirchen Bahnhof (Bus Station)",
    "Berchtesgaden Busbahnhof",
    "Oberstdorf Busbahnhof",
    "Füssen Bahnhof (Bus Station)",
    "Mittenwald Bahnhof (Bus Station)",

    // Slovenia
    "Bled Bus Station",
    "Bohinj Jezero",
    "Kranjska Gora Avtobusna Postaja"
];
```