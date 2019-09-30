checkPassword = event => {
  const reg = "^((?=S*?[A-Z])(?=S*?[a-z])(?=S*?[0-9])(?!S*?[!@#$^&%*()+=-[]/{}|:<>?,. а-яА-Я]).{6,})S$";
  console.log(event.target.value.match(reg));

  if (!event.target.value.match(reg)) {
    event.target.parentElement.submitRegistration.setAttribute("disabled", "disabled");
    console.log("disable");
  } else {
    event.target.parentElement.submitRegistration.setAttribute("disabled", "");
  }
};

validity = form => {
  // form.name.addEventListener("blur", checkName);
  // form.surname.addEventListener("blur", checkSurname);
  // form.login.addEventListener("blur", checkLogin);
  form.password.addEventListener("blur", checkPassword);
  // form.email.addEventListener("blur", checkEmail);
  // form.repeatPassword.addEventListener("blur", checkRepeatPassword);
};
