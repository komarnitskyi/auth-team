window.onload = () => {
  const dataConteiner = document.querySelector("#data");
  addExitClickEvent();
  fetch(`/cabinet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('jwtToken')
      })
    })
    .then(res => {
      switch (res.status) {
        case 200: {
          return res.json();
          break;
        }
        case 419: {
          window.localStorage.removeItem('jwtToken');
          window.location = '/';
          break;
        }
        default: {
          window.localStorage.removeItem('jwtToken');
          throw new Error("False user!");
        }
      }
      // if (res.status !== 200) throw new Error("False user!");
    })
    .then(user => {
      dataConteiner.innerHTML = `
      <h1>Welcome to the personal cabinet</h1>
      <div>
      <ul>
        <li>First name: ${user.name}</li>
        <li>Last name: ${user.surname}</li>
        <li>Login: ${user.login}</li>
        <li>Email: ${user.email}</li>
      </ul>
      </>
      `;
    })
    .catch(err => {
      console.log(err);
    });
};