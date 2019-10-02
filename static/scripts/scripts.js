window.onload = () => {
  const headerHref = document.querySelectorAll(".menu a");
  if (document.location.hash) {
    headerHref[0].href += "#in";
    headerHref[2].style.display = "none";
    headerHref[3].style.display = "none";
  } else {
    headerHref[1].style.display = "none";
    headerHref[4].style.display = "none";
  }
};
