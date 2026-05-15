// main.js — интерактивная форма поиска билетов
document.addEventListener("DOMContentLoaded", function () {
  // === 1. Получаем все нужные элементы (в начале блока) ===

  const travelersInput = document.getElementById("hero-travelers-input");
  const decreaseBtn = document.getElementById("hero-decrease-btn");
  const increaseBtn = document.getElementById("hero-increase-btn");

  const roundTripBtn = document.getElementById("hero-round-trip-btn");
  const oneWayBtn = document.getElementById("hero-one-way-btn");
  const returnDateInput = document.getElementById("return-date-input");
  const dateInputsWrapper = document.querySelector(
    ".hero-signup-form__date-inputs-wrapper"
  );

  const departureInput = document.getElementById("departure-station-input");
  const arrivalInput = document.getElementById("arrival-station-input");
  const departureDateInput = document.getElementById("departure-date-input");
  const searchBtn = document.getElementById("signup-btn");

  const searchForm = document.getElementById("search-form");


  // === 2. Счётчик пассажиров (1–99) ===

  function getTravelersCount() {
    return parseInt(localStorage.getItem("heroTravelersCount") || "1");
  }

  function updateTravelersDisplay() {
    if (!travelersInput) return;
    const count = getTravelersCount();
    travelersInput.textContent = count;
    if (decreaseBtn) decreaseBtn.disabled = count <= 1;
  }

  if (increaseBtn && decreaseBtn) {
    increaseBtn.addEventListener("click", () => {
      let count = getTravelersCount();
      localStorage.setItem("heroTravelersCount", String(count + 1));
      updateTravelersDisplay();
    });

    decreaseBtn.addEventListener("click", () => {
      let count = getTravelersCount();
      if (count <= 1) return;
      localStorage.setItem("heroTravelersCount", String(count - 1));
      updateTravelersDisplay();
    });
  }

  // при загрузке страницы подтягиваем из localStorage
  updateTravelersDisplay();


  // === 3. Переключение типа поездки: Round trip / One Way ===

  function getTripType() {
    return localStorage.getItem("heroTripType") || "Round trip";
  }

  function setTripTypeInDOM(type, activeRadio) {
    localStorage.setItem("heroTripType", type);

    // активная радиокнопка
    if (roundTripBtn && roundTripBtn.parentNode) {
      roundTripBtn.parentNode.classList.toggle(
        "hero-trip-options__item--round-trip",
        type === "Round trip"
      );
      roundTripBtn.classList.toggle(
        "hero-trip-options__bullet--active",
        type === "Round trip"
      );
    }

    if (oneWayBtn && oneWayBtn.parentNode) {
      oneWayBtn.parentNode.classList.toggle(
        "hero-trip-options__item--one-way",
        type === "One Way"
      );
      oneWayBtn.classList.toggle(
        "hero-trip-options__bullet--active",
        type === "One Way"
      );
    }

    // показываем/скрываем дату возврата
    if (returnDateInput) {
      returnDateInput.style.display = type === "Round trip" ? "block" : "none";
      if (!returnDateInput.hasAttribute("hidden") && type === "One Way") {
        returnDateInput.setAttribute("hidden", true);
      } else if (returnDateInput.hasAttribute("hidden") && type === "Round trip") {
        returnDateInput.removeAttribute("hidden");
      }
    }

    // визуально можем менять ориентацию wrapper'а дат
    if (dateInputsWrapper) {
      dateInputsWrapper.style.flexDirection =
        type === "Round trip" ? "row" : "column";
    }

    validateAndEnableSearchButton();
  }

  function initTripType() {
    const saved = getTripType();
    if (saved === "One Way") {
      setTripTypeInDOM("One Way", oneWayBtn);
    } else {
      setTripTypeInDOM("Round trip", roundTripBtn);
    }
  }

  if (roundTripBtn) {
    roundTripBtn.addEventListener("click", () => {
      setTripTypeInDOM("Round trip", roundTripBtn);
    });
  }

  if (oneWayBtn) {
    oneWayBtn.addEventListener("click", () => {
      setTripTypeInDOM("One Way", oneWayBtn);
    });
  }

  initTripType(); // при загрузке страницы


  // === 4. Сохранение полей в localStorage и их загрузка ===

  function saveFormDataToLS() {
    if (departureInput) {
      localStorage.setItem(
        "heroDeparture",
        departureInput.value.trim()
      );
    }
    if (arrivalInput) {
      localStorage.setItem(
        "heroArrival",
        arrivalInput.value.trim()
      );
    }
    if (departureDateInput) {
      localStorage.setItem(
        "heroDepartureDate",
        departureDateInput.value
      );
    }
    if (returnDateInput) {
      localStorage.setItem(
        "heroReturnDate",
        returnDateInput.value
      );
    }
    validateAndEnableSearchButton();
  }

  function loadFormDataFromLS() {
    if (departureInput) {
      departureInput.value =
        localStorage.getItem("heroDeparture") || departureInput.value;
    }
    if (arrivalInput) {
      arrivalInput.value =
        localStorage.getItem("heroArrival") || arrivalInput.value;
    }
    if (departureDateInput) {
      departureDateInput.value =
        localStorage.getItem("heroDepartureDate") || departureDateInput.value;
    }
    if (returnDateInput) {
      returnDateInput.value =
        localStorage.getItem("heroReturnDate") || returnDateInput.value;
    }
    validateAndEnableSearchButton();
  }

  if (departureInput) {
    departureInput.addEventListener("input", saveFormDataToLS);
  }
  if (arrivalInput) {
    arrivalInput.addEventListener("input", saveFormDataToLS);
  }
  if (departureDateInput) {
    departureDateInput.addEventListener("change", saveFormDataToLS);
  }
  if (returnDateInput) {
    returnDateInput.addEventListener("change", saveFormDataToLS);
  }

  loadFormDataFromLS(); // при загрузке страницы


  // === 5. Валидация и активация кнопки поиска ===

  function validateAndEnableSearchButton() {
    if (!departureInput || !arrivalInput || !departureDateInput || !searchBtn) {
      if (searchBtn) {
        searchBtn.classList.add("button--disabled");
        searchBtn.disabled = true;
      }
      return false;
    }

    const isRoundTrip = getTripType() === "Round trip";
    const dep = departureInput.value.trim();
    const arr = arrivalInput.value.trim();
    const depDate = departureDateInput.value.trim();
    const retDate = (returnDateInput?.value.trim() || "").trim();

    if (!dep || !arr || !depDate) {
      searchBtn.classList.add("button--disabled");
      searchBtn.disabled = true;
      return false;
    }

    if (isRoundTrip && !retDate) {
      searchBtn.classList.add("button--disabled");
      searchBtn.disabled = true;
      return false;
    }

    searchBtn.classList.remove("button--disabled");
    searchBtn.disabled = false;
    return true;
  }

  // при старте страницы проверяем состояние
  validateAndEnableSearchButton();


  // === 6. Обработка отправки формы ===

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateAndEnableSearchButton()) {
        alert("Please fill all required fields.");
        return;
      }

      const data = {
        tripType: getTripType(),
        travelersCount: getTravelersCount(),
        departure: departureInput?.value.trim() || "",
        arrival: arrivalInput?.value.trim() || "",
        departureDate: departureDateInput?.value || "",
        returnDate: returnDateInput?.value || null,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("heroLastSearch", JSON.stringify(data));

      // симуляция отправки
      console.log("Симулируем отправку формы:", data);
      alert("Search request sent! (mock)");

      // здесь можно, например, редирект:
      // window.location.href = "/search-results.html";
    });
  }


  // === 7. Опциональная утилита для очистки локальных данных (для отладки) ===

  window.clearHeroSearch = function () {
    localStorage.removeItem("heroTravelersCount");
    localStorage.removeItem("heroTripType");
    localStorage.removeItem("heroDeparture");
    localStorage.removeItem("heroArrival");
    localStorage.removeItem("heroDepartureDate");
    localStorage.removeItem("heroReturnDate");
    localStorage.removeItem("heroLastSearch");
    window.location.reload();
  };

  // в консоли можно вызвать: clearHeroSearch()
});

// main2.js — интерактивный аккордеон FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-list .faq-item");

  if (!faqItems.length) return;

  // === 1. Обработка клика по заголовку вопроса ===
  faqItems.forEach((item) => {
    const head = item.querySelector(".faq-item__head");
    const content = item.querySelector(".faq-item__content");

    if (!head || !content) return;

    // при клике на заголовок открываем/закрываем вопрос
    head.addEventListener("click", function () {
      const isOpen = item.classList.contains("faq-item--open");

      // закрываем все остальные вопросы
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("faq-item--open");
      });

      // если это уже открытый, просто закрываем
      if (isOpen) {
        item.classList.remove("faq-item--open");
      } else {
        // если не открыт, открываем этот
        item.classList.add("faq-item--open");
      }
    });
  });

  // === 2. Опционально: открыть первый вопрос по умолчанию ===
  const firstItem = document.querySelector(".faq-list .faq-item");
  if (firstItem) {
    firstItem.classList.add("faq-item--open");
  }
});

// Бургер-меню
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('header-burger');
  const modalMenu = document.getElementById('modal-menu');
  const closeBtn = document.getElementById('modal-close');

  if (!burger || !modalMenu || !closeBtn) return;

  burger.addEventListener('click', () => {
    modalMenu.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    modalMenu.classList.remove('active');
  });

  modalMenu.addEventListener('click', (e) => {
    if (e.target === modalMenu) {
      modalMenu.classList.remove('active');
    }
  });
});
