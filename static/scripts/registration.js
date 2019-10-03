window.onload = () => {
  const reg_btn = document.querySelector("#reg-btn");


  reg_btn.addEventListener("submit", event => {
    event.preventDefault();
    const spansEl = document.querySelectorAll(`.spanMsg`);
    for (let index = 0; index < spansEl.length; index++) {
      spansEl[index].style.display = "none";
    }
    if (!validity(reg_btn)) return 0;
    const formBody = {
      name: event.target.name.value,
      surname: event.target.surname.value,
      login: event.target.login.value,
      password: event.target.password.value,
      repeatPassword: event.target.repeatPassword.value,
      email: event.target.email.value
    };
    fetch(`/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(formBody)
      })
      .then(res => {
        if (res.status == 200) {
          window.location = "/success";
          // return [{
          //   path: "success",
          //   message: "Success!"
          // }];
        } else {
          return res.json();
        }
      })
      .then(obj => displayError(obj))
      .catch(error => console.error(error));
  });
};