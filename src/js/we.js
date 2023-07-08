const timer = {
  timerDedline: new Date(2023, 6, 3, 13, 45),
  intervalId: null,
  rootSelector: document.querySelector('.js-timer-items'),
  start() {
    this.intervalId = setInterval(() => {
      const diff = this.timerDedline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }
      this.makeMarkup(this.getTimeComponents(diff));
      this.pritifyMarkup(this.getTimeComponents(diff));
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  pritifyMarkup(obj) {
    const { days, hours, minutes, seconds } = obj;
    this.rootSelector.querySelector('.js-timer__days').dataset.title =
      this.declensionNum(days, ['день', 'дні', 'днів']);
    this.rootSelector.querySelector('.js-timer__hours').dataset.title =
      this.declensionNum(hours, ['година', 'години', 'годин']);
    this.rootSelector.querySelector('.js-timer__minutes').dataset.title =
      this.declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
    this.rootSelector.querySelector('.js-timer__seconds').dataset.title =
      this.declensionNum(seconds, ['секунда', 'секунди', 'секунд']);
  },

  makeMarkup(obj) {
    const { days, hours, minutes, seconds } = obj;
    this.rootSelector.querySelector('.js-timer__days').textContent =
      this.pad(days);
    this.rootSelector.querySelector('.js-timer__hours').textContent =
      this.pad(hours);
    this.rootSelector.querySelector('.js-timer__minutes').textContent =
      this.pad(minutes);
    this.rootSelector.querySelector('.js-timer__seconds').textContent =
      this.pad(seconds);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },

  declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  },
};

timer.start();

setTimeout(() => {
  timer.stop();
}, 5000);

console.log('first');
const refs = {
  formEl: document.querySelector('.js-form1'),
  boxElem: document.querySelector('.js-form-container'),
};

// refs.formEl.addEventListener("click", onFormClick);

// function onFormClick(event) {
//   event.preventDefault();

//   if (event.currentTarget === event.target) return;
//   if (event.target.nodeName !== "BUTTON") return;

//   console.log(event.target.textContent);
// }

refs.boxElem.addEventListener('click', onBoxElemClick);
function onBoxElemClick(event) {
  event.preventDefault();
  if (event.currentTarget === event.target) return;
  if (event.target.nodeName !== 'BUTTON') return;
  console.log(event.target.textContent);
  console.log(event.target.closest('form.form').dataset.index);
}
// =========================================================
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatValue(value) {
  return value.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', () => {
  const datetimePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate <= currentDate) {
        window.alert('Please choose a date in the future');
        document.querySelector('button[data-start]').disabled = true;
      } else {
        document.querySelector('button[data-start]').disabled = false;
      }
    },
  });

  document.querySelector('button[data-start]').addEventListener('click', () => {
    const selectedDate = datetimePicker.selectedDates[0];
    const currentTime = new Date();

    if (selectedDate <= currentTime) {
      return;
    }

    const timerInterval = setInterval(() => {
      const timeDifference = selectedDate - new Date();

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        updateTimerUI(convertMs(0));
        return;
      }

      updateTimerUI(convertMs(timeDifference));
    }, 1000);
  });

  function updateTimerUI({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = formatValue(days);
    document.querySelector('[data-hours]').textContent = formatValue(hours);
    document.querySelector('[data-minutes]').textContent = formatValue(minutes);
    document.querySelector('[data-seconds]').textContent = formatValue(seconds);
  }
});

// ------------------------------------------

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

let countdownIntervalId;

startBtn.addEventListener('click', event => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i');
  const countdownDuration = selectedDate - new Date();
  startCountdown(countdownDuration);
});

function startCountdown(duration) {
  clearInterval(countdownIntervalId);

  countdownIntervalId = setInterval(() => {
    if (duration <= 0) {
      clearInterval(countdownIntervalId);
      updateCountdownValues(0, 0, 0, 0);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(duration);
    updateCountdownValues(days, hours, minutes, seconds);
    duration -= 1000;
  }, 1000);
}

function updateCountdownValues(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
