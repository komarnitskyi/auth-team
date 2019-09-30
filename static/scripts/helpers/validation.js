checkPassword = event => {
  const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/;
  disabledBtn(event, reg);
};
checkRepeatPassword = event => {
  const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/;
  if (!reg.test(event.target.value) || event.target.value !== event.target.parentElement.password.value) {
    event.target.parentElement.submitRegistration.setAttribute("disabled", "disabled");
  } else {
    event.target.parentElement.submitRegistration.removeAttribute("disabled");
  }
};
checkName = event => {
  const reg = /^[a-zA-Z0-9]{1,}$/;
  disabledBtn(event, reg)
};
checkSurname = event => {
  const reg = /^[a-zA-Z0-9]{1,}$/;
  disabledBtn(event, reg)
};
checkLogin = event => {
  const reg = /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/;
  disabledBtn(event, reg)
};
checkEmail = event => {
  const reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  disabledBtn(event, reg)
};

disabledBtn = (event, reg) => {
  if (!reg.test(event.target.value)) {
    event.target.parentElement.submitRegistration.setAttribute("disabled", "disabled");
  } else {
    event.target.parentElement.submitRegistration.removeAttribute("disabled");
  }
}

validity = form => {
  form.name.addEventListener("blur", checkName);
  form.surname.addEventListener("blur", checkSurname);
  form.login.addEventListener("blur", checkLogin);
  form.password.addEventListener("blur", checkPassword);
  form.repeatPassword.addEventListener("blur", checkRepeatPassword);
  form.email.addEventListener("blur", checkEmail);
};