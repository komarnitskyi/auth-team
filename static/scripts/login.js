window.onload = () => {
  const auth_btn = document.querySelector("#auth");
  const auth_error = document.querySelector("#res_auth");

  auth_btn.addEventListener("submit", event => {
    event.preventDefault();
    let status;
    fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          login: event.target.login.value,
          password: event.target.password.value
        })
      })
      .then(res => {
        status = res.status;
        return res.text();
      }).then(res => {
        if (status === 200) {
          // window.location = `/cabinet/?token=${res}`;
          window.localStorage.setItem('jwtToken', res);
          window.location = `/cabinet`;
        } else {
          auth_error.innerText = res;
        }
      })
      .catch(error => console.error("Error:", error));
  });
};