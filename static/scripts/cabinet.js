window.onload = () => {
  const dataConteiner = document.querySelector("#data");
  const auth_header = document.location.search.slice(document.location.search.indexOf('%22') + 3, -3);



  fetch(`/cabinet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        'auth-token': `${auth_header}`
      }
    })
    .then(res => {
      if (res.status !== 200) throw new Error("False user!");
      return res.json();
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
      // JSON.stringify(user);
    })
    .catch(err => {
      console.log(err);
    });
};