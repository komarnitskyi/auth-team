window.onload = () => {

   const span = document.querySelector('#res');
   const reg_btn = document.querySelector('#reg-btn');
   console.log(span);
   console.log(reg_btn);

   reg_btn.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);

      fetch(`/registration`)
         .then((res) => {
            if (res.status !== 200) {
               throw new Error(res.status);
            }
            return res;
         })
         .then((res) => {
            span.innerHTML = res;
            console.log(res);

         })
         .catch((error) => console.error("Error:", error));
   })
}