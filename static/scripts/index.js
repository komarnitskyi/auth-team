window.onload = () => {

   const span = document.querySelector('#res');
   const reg_btn = document.querySelector('#reg-btn');
   console.log(span);
   console.log(reg_btn);

   reg_btn.addEventListener('submit', (event) => {
      event.preventDefault();

      console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);

      fetch(`/registration`, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
               name: event.target.name.value,
               surname: event.target.surname.value,
               login: event.target.login.value,
               password: event.target.password.value
            })
         })
         .then((res) => {
            if (res.status !== 200) {
               throw new Error(res.status);
            }
            return res;
         })
         .then((res) => {
            span.innerHTML = "Success!";
            console.log(res);

         })
         .catch((error) => console.error("Error:", error));
   })
}