import Notiflix from 'notiflix';

function secondHomeWork() {
  const formEl = document.querySelector('.form');
  const subButton = document.querySelector('button');

  const onFormElSubmit = event => {
    event.preventDefault();
    subButton.disabled = true;
    console.dir(event.target.elements);

    const { delay, step, amount } = event.target.elements;
    console.log(amount.value);

    for (let i = 1; i <= Number(amount.value); i++) {
      const currentDelay = Number(delay.value) + Number(step.value) * (i - 1);
      setTimeout(() => {
        createPromise(i, currentDelay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(
              `✅ Fulfilled promise ${position} in ${delay}ms`,
              {
                position: 'center-left',
                timeout: 5000,
              }
            );
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(
              `❌ Rejected promise ${position} in ${delay}ms`,
              {
                position: 'center-left',
                timeout: 5000,
              }
            );
          });
      }, currentDelay);
    }

    function createPromise(position, delay) {
      const shouldResolve = Math.random() > 0.3;
      const myPromise = new Promise((res, rej) => {
        if (shouldResolve) {
          res({ position, delay });
        } else {
          rej({ position, delay });
        }
      });
      return myPromise;
    }
  };

  formEl.addEventListener('submit', onFormElSubmit);
}

secondHomeWork();
