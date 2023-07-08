function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;

startBtn.addEventListener('click', event => {
  console.log(event);
  switchStatusButton(false);
  intervalId = setInterval(setRandomColor, 1000);
});
function switchStatusButton(status) {
  stopBtn.disabled = status;
  startBtn.disabled = !status;
}

stopBtn.addEventListener('click', event => {
  console.log(event);
  switchStatusButton(true);

  clearInterval(intervalId);
});

function setRandomColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

console.log('firsfsfdsfdt');
