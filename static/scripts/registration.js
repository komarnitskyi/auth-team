window.onload = () => {
  const span = document.querySelector("#res");
  const reg_btn = document.querySelector("#reg-btn");

  reg_btn.addEventListener("submit", event => {
    event.preventDefault();
    const formBody = {
      name: event.target.name.value,
      surname: event.target.surname.value,
      login: event.target.login.value,
      password: event.target.password.value
    };
    const validAns = checkValidation(formBody);
    if (validAns) return (span.innerHTML = validAns);
    fetch(`/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(formBody)
      })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        return res;
      })
      .then(res => {
        span.innerHTML = "Success!";
      })
      .catch(error => console.error("Error:", error));
  });
};