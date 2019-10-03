validity = new function () {
  validityObj = {
    name: true,
    surname: true,
    login: true,
    email: true,
    password: false,
    repeatPassword: false
  };

  checkPassword = target => {
    const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/;
    return disabledBtn(target, reg) &&
      (target.parentElement.repeatPassword.value && checkRepeatPassword(target.parentElement.repeatPassword));
  };
  checkRepeatPassword = target => {
    const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{6,})\S$/;
    if (!reg.test(target.value) || target.value !== target.parentElement.password.value) {
      validityObj[target.name] = false;
      target.classList.add("validation-error");
      return false;
    } else {
      validityObj[target.name] = true;
      target.classList.remove("validation-error");
      return true;
    }
  };
  checkNames = target => {
    const reg = /^[a-zA-Z0-9]{1,}$/;
    return disabledBtn(target, reg);
  };

  checkLogin = target => {
    const reg = /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/;
    return disabledBtn(target, reg);
  };

  checkEmail = target => {
    const reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    return disabledBtn(target, reg);
  };

  disabledBtn = (target, reg) => {
    if (!reg.test(target.value)) {
      validityObj[target.name] = false;
      target.classList.add("validation-error");
      return false;
    } else {
      validityObj[target.name] = true;
      target.classList.remove("validation-error");
      return true;
    }
  };

  isValidity = str => {
    if (str.includes("false")) {
      return false;
    } else {
      return true;
    }
  };
  return function (form) {
    checkNames(form.name);
    checkNames(form.surname);
    checkLogin(form.login);
    checkPassword(form.password);
    checkRepeatPassword(form.repeatPassword);
    checkEmail(form.email);
    if (isValidity(JSON.stringify(validityObj))) {
      return true;
    } else {
      return false;
    }
  };
}
//export default validity;