let validityObj = {
  name: true,
  surname: true,
  login: true,
  email: true,
  password: false,
  repeatPassword: false
};

checkPassword = event => {
  const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/;
  disabledBtn(event.target, reg);
  event.target.parentElement.repeatPassword.value && checkRepeatPassword(event.target.parentElement.repeatPassword);
};
checkRepeatPassword = target => {
  const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/;
  if (!reg.test(target.value) || target.value !== target.parentElement.password.value) {
    target.parentElement.submitRegistration.setAttribute("disabled", "disabled");
    target.classList.add("validation-error");
    validityObj[target.name] = false;
  } else {
    validityObj[target.name] = true;
    target.classList.remove("validation-error");
    isValidity(JSON.stringify(validityObj));
  }
};
checkNames = event => {
  const reg = /^[a-zA-Z0-9]{1,}$/;
  disabledBtn(event.target, reg);
};

checkLogin = event => {
  const reg = /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/;
  disabledBtn(event.target, reg);
};

checkEmail = event => {
  const reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  disabledBtn(event.target, reg);
};

disabledBtn = (target, reg) => {
  if (!reg.test(target.value)) {
    target.parentElement.submitRegistration.setAttribute("disabled", "disabled");
    target.classList.add("validation-error");
    validityObj[target.name] = false;
  } else {
    validityObj[target.name] = true;
    target.classList.remove("validation-error");
    isValidity(JSON.stringify(validityObj));
  }
};
isValidity = str => {
  if (!str.includes("false")) {
    event.target.parentElement.submitRegistration.removeAttribute("disabled");
  }
};

validity = form => {
  form.name.addEventListener("blur", checkNames);
  form.surname.addEventListener("blur", checkNames);
  form.login.addEventListener("blur", checkLogin);
  form.password.addEventListener("blur", checkPassword);
  form.repeatPassword.addEventListener("blur", event => checkRepeatPassword(event.target));
  form.email.addEventListener("blur", checkEmail);
};

//export default validity;
