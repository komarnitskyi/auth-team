displayError = (arr = null) => {
  if (arr === null) return 0;
  const spansEl = document.querySelectorAll(`.spanMsg`);
  for (let index = 0; index < spansEl.length; index++) {
    spansEl[index].style.display = "none";
  }
  arr.map(obj => {
    const el = document.querySelector(`span[name="${obj.path}"]`);
    el.innerText = obj.message;
    el.style.display = "block";
  });
};
//export default displayError;
