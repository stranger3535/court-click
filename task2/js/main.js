// main.js
document.addEventListener("DOMContentLoaded", () => {
  // MINI CALENDAR (My Cases date strip)
  const dateStripEl = document.getElementById("dateStrip");
  const monthLabelEl = document.getElementById("monthLabel");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  if (dateStripEl && monthLabelEl && prevMonthBtn && nextMonthBtn) {
    let current = new Date();
    current.setDate(1);

    function formatMonthYear(date) {
      const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }

    function renderStrip() {
      dateStripEl.innerHTML = "";

      const year = current.getFullYear();
      const month = current.getMonth();
      const today = new Date();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      monthLabelEl.textContent = formatMonthYear(current);

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const btn = document.createElement("button");
        btn.className = "day-cell";

        if (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          btn.classList.add("is-today");
        }

        if (day === 1) {
          btn.classList.add("is-selected");
        }

        const num = document.createElement("span");
        num.className = "day-num";
        num.textContent = String(day).padStart(2, "0");

        const name = document.createElement("span");
        name.className = "day-name";
        name.textContent = date.toLocaleDateString("en-US", {
          weekday: "short"
        });

        btn.appendChild(num);
        btn.appendChild(name);

        btn.addEventListener("click", () => {
          dateStripEl
            .querySelectorAll(".day-cell")
            .forEach(d => d.classList.remove("is-selected"));
          btn.classList.add("is-selected");
        });

        dateStripEl.appendChild(btn);
      }
    }

    prevMonthBtn.addEventListener("click", () => {
      current.setMonth(current.getMonth() - 1);
      renderStrip();
    });

    nextMonthBtn.addEventListener("click", () => {
      current.setMonth(current.getMonth() + 1);
      renderStrip();
    });

    renderStrip();
  }

  // FULL CALENDAR (More Options page)
  const leftDaysEl = document.getElementById("leftMonthDays");
  const rightDaysEl = document.getElementById("rightMonthDays");
  const leftLabelEl = document.getElementById("monthLeftLabel");
  const rightLabelEl = document.getElementById("monthRightLabel");

  if (leftDaysEl && rightDaysEl && leftLabelEl && rightLabelEl) {
    let baseMonth = new Date();
    baseMonth.setDate(1);

    function monthLabel(date) {
      const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    function renderMonth(container, year, month) {
      container.innerHTML = "";

      const firstDay = new Date(year, month, 1);
      let startIndex = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();

      for (let i = 0; i < startIndex; i++) {
        const empty = document.createElement("span");
        container.appendChild(empty);
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const btn = document.createElement("button");
        btn.className = "cal-day";
        btn.textContent = String(d).padStart(2, "0");

        const dateObj = new Date(year, month, d);

        if (
          dateObj.getDate() === today.getDate() &&
          dateObj.getMonth() === today.getMonth() &&
          dateObj.getFullYear() === today.getFullYear()
        ) {
          btn.classList.add("cal-day--today");
        }

        btn.addEventListener("click", () => {
          container
            .querySelectorAll(".cal-day--selected")
            .forEach(c => c.classList.remove("cal-day--selected"));
          btn.classList.add("cal-day--selected");
        });

        container.appendChild(btn);
      }
    }

    function renderCalendar() {
      const leftMonth = new Date(baseMonth);
      const rightMonth = new Date(baseMonth);
      rightMonth.setMonth(rightMonth.getMonth() + 1);

      leftLabelEl.textContent = monthLabel(leftMonth);
      rightLabelEl.textContent = monthLabel(rightMonth);

      renderMonth(leftDaysEl, leftMonth.getFullYear(), leftMonth.getMonth());
      renderMonth(rightDaysEl, rightMonth.getFullYear(), rightMonth.getMonth());
    }

    renderCalendar();
  }

  // CASE DETAILS DROPDOWN (More Options page)
  const toggleBtn = document.getElementById("caseDetailsToggle");
  const dropdown = document.getElementById("caseDetailsMenu");

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener("click", () => {
      dropdown.classList.toggle("is-open");
    });

    dropdown.addEventListener("click", (e) => {
      const btn = e.target.closest(".details-item");
      if (!btn) return;

      const panelId = btn.dataset.panel;
      if (!panelId) return;

      dropdown
        .querySelectorAll(".details-item")
        .forEach((item) => item.classList.remove("is-active"));
      btn.classList.add("is-active");

      document
        .querySelectorAll(".details-panel")
        .forEach((p) => p.classList.remove("is-active"));
      const target = document.getElementById(panelId);
      if (target) target.classList.add("is-active");
    });
  }

  // 1. Sidebar active
  const currentPage = location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".sidebar-nav .nav-link[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const file = href.split("/").pop();
    if (file === currentPage) {
      const li = link.closest(".nav-item");
      if (li) li.classList.add("nav-item--active");
    }
  });

  // 2. Sidebar toggle
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
    });
  }

  // 3. Calendar day select (static markup)
  const calendarCard = document.querySelector(".calendar-card");
  if (calendarCard) {
    const dayButtons = calendarCard.querySelectorAll(".cal-day");
    dayButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        dayButtons.forEach(b => b.classList.remove("cal-day--selected"));
        btn.classList.add("cal-day--selected");
      });
    });
  }

  // 4. Day case select
  const dayCaseCards = document.querySelectorAll(".day-case-card");
  const preview = document.querySelector(".calendar-preview");
  if (dayCaseCards.length && preview) {
    dayCaseCards.forEach(card => {
      card.addEventListener("click", () => {
        dayCaseCards.forEach(c => c.classList.remove("is-active"));
        card.classList.add("is-active");
        preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }

  // 5. Range pills
  const rangePills = document.querySelectorAll(".range-pill");
  rangePills.forEach(pill => {
    pill.addEventListener("click", () => {
      const group = pill.closest(".range-row") || document;
      group
        .querySelectorAll(".range-pill")
        .forEach(p => p.classList.remove("range-pill--active"));
      pill.classList.add("range-pill--active");
    });
  });

  // 6. Alert chips (small purple chips, not modal)
  document.querySelectorAll(".alert-chip").forEach(alertBtn => {
    alertBtn.addEventListener("click", () => {
      alertBtn.classList.toggle("is-on");
      alertBtn.textContent = alertBtn.classList.contains("is-on")
        ? "Alert On"
        : "Alert";
    });
  });

  // 7. Live board rows
  const liveBoard = document.querySelector(".live-board-card");
  if (liveBoard) {
    const rows = liveBoard.querySelectorAll(".live-row");
    rows.forEach(row => {
      row.querySelectorAll(".live-cell").forEach(cell => {
        cell.addEventListener("click", () => {
          rows.forEach(r =>
            r.querySelectorAll(".live-cell").forEach(c =>
              c.classList.remove("live-cell--active-row")
            )
          );
          row
            .querySelectorAll(".live-cell")
            .forEach(c => c.classList.add("live-cell--active-row"));
        });
      });
    });
  }

  // 8. ALERT MODAL (only one implementation)
  const alertModal = document.getElementById("alertModal");
  const caseAlertButtons = document.querySelectorAll(".case-alert-btn");
  const closeAlertBtn = document.querySelector(".modal-close");
  const cancelAlertBtn = document.getElementById("cancelAlert");
  const saveAlertBtn = document.getElementById("saveAlert");
  const decBtn = document.getElementById("decAlert");
  const incBtn = document.getElementById("incAlert");
  const alertCountEl = document.getElementById("alertCount");

  function openAlertModal() {
    if (alertModal) alertModal.classList.add("is-open");
  }
  function closeAlertModal() {
    if (alertModal) alertModal.classList.remove("is-open");
  }

  if (caseAlertButtons.length && alertModal) {
    caseAlertButtons.forEach(btn =>
      btn.addEventListener("click", openAlertModal)
    );
  }
  if (closeAlertBtn) closeAlertBtn.addEventListener("click", closeAlertModal);
  if (cancelAlertBtn) cancelAlertBtn.addEventListener("click", closeAlertModal);
  if (saveAlertBtn) saveAlertBtn.addEventListener("click", closeAlertModal);

  if (alertModal) {
    alertModal.addEventListener("click", e => {
      if (e.target === alertModal) closeAlertModal();
    });
  }

  function updateAlertCount(delta) {
    if (!alertCountEl) return;
    let value = parseInt(alertCountEl.textContent || "3", 10);
    value = Math.min(99, Math.max(0, value + delta));
    alertCountEl.textContent = value;
  }
  if (decBtn) decBtn.addEventListener("click", () => updateAlertCount(-1));
  if (incBtn) incBtn.addEventListener("click", () => updateAlertCount(1));

  // 9. Prevent dummy # links
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });
});
