document.addEventListener("DOMContentLoaded", function () {
  // Exibir o preloader quando o DOM estiver pronto
  document.querySelector(".preloader").style.display = "flex"; // Selecionando pela classe 'preloader'
  document.querySelector(".portal-container").style.display = "flex"; // Selecionando pela classe 'preloader'
});

window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  const portal = document.querySelector(".portal-container");
  setTimeout(() => {
    preloader.style.display = "none";
    portal.style.display = "none";
  }, 5000); // 2000 milissegundos = 2 segundos
});
