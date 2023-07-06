// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
// function secondHomeWork() {
//   const formEl = document.querySelector('.form');

//   const onFormElSubmit = event => {
//     event.preventDefault();

//     console.dir(event.target.elements);

//     const { delay, step, amount } = event.target.elements;

//     console.log(amount.value);

//     for (let i = 1; i <= Number(amount.value); i++) {
//       createPromise(i, Number(delay.value))
//         .then(({ position, delay }) => {
//           console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         })
//         .catch(({ position, delay }) => {
//           console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//         });
//     }

//     function createPromise(position, delay) {
//       const shouldResolve = Math.random() > 0.3;

//       const myPromise = new Promise((res, rej) => {
//         if (shouldResolve) {
//           res({ position, delay });
//         } else {
//           rej({ position, delay });
//         }
//       });
//       return myPromise;
//     }
//   };

//   formEl.addEventListener('submit', onFormElSubmit);
// }

// secondHomeWork();
