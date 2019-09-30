window.onload = () => {
  const auth_btn = document.querySelector("#auth");

  // auth_btn.addEventListener('submit', (event) => {
  //    event.preventDefault();

  //    fetch(`/registration`, {
  //          method: "POST",
  //          headers: {
  //             'Content-Type': 'application/json;charset=utf-8'
  //          },
  //          body: JSON.stringify({
  //             name: event.target.name.value,
  //             surname: event.target.surname.value,
  //             login: event.target.login.value,
  //             password: event.target.password.value
  //          })
  //       })
  //       .then((res) => {
  //          if (res.status !== 200) {
  //             throw new Error(res.status);
  //          }
  //          return res;
  //       })
  //       .then((res) => {
  //          span.innerHTML = "Success!";
  //       })
  //       .catch((error) => console.error("Error:", error));
  // })
};
