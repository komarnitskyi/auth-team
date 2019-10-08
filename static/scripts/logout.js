addExitClickEvent = () => {
   const logout_btn = document.querySelector('.menu .logout');

   exitCabinet = (e) => {
      e.preventDefault();
      window.localStorage.removeItem('jwtToken');
      window.location = '/';
   }
   logout_btn.addEventListener('click', exitCabinet);

}