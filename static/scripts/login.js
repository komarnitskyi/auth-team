window.onload = () => {
  const auth_btn = document.querySelector('#auth');
  const auth_error = document.querySelector('#res_auth');

  auth_btn.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch(`/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          login: event.target.login.value,
          password: event.target.password.value
        })
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        return res.text();
      })
      .then((res) => {
        auth_error.innerHTML = res;
      })
      .catch((error) => console.error("Error:", error));
  })
};