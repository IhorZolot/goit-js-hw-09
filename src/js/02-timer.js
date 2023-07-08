import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

let countdownInterval;
let targetDate;

startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', true);

  targetDate = flatpickr.parseDate(datetimePicker.value);

  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    const convertDateDiff = convertMs(timeDifference);
    for (const element in convertDateDiff) {
      const value = convertDateDiff[element];
      document.querySelector(`[data-${element}]`).textContent =
        addLeadingZero(value);
    }
  }, 1000);
});

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
