function aviso() {
  alert(
    "ops ainda não publiquei essa aplicação aguarde as proximas atualizações"
  );
}

window.addEventListener("scroll", function () {
  const inia = document.querySelector(".inia");
  const teca = document.querySelector(".teca");
  const expa = document.querySelector(".expa");
  const proa = document.querySelector(".proa");
  const fora = document.querySelector(".fora");
  //const hoba = document.querySelector(".hoba");
  const ctta = document.querySelector(".ctta");

  const iconlk = document.querySelector(".iconelkdin");
  const iconwwp = document.querySelector(".iconewwp ");
  const iconegithub = document.querySelector(".iconegithub ");

  if (window.scrollY > 0 && window.scrollY < 300) {
    inia.classList.add("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");

    iconlk.style.opacity = "0";
    iconwwp.style.opacity = "0";
    iconegithub.style.opacity = "0";
  } else if (window.scrollY > 600 && window.scrollY < 1200) {
    teca.classList.add("scrolled");
    inia.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");

    iconlk.style.opacity = "1";
    iconwwp.style.opacity = "1";
    iconegithub.style.opacity = "1";
  } else if (window.scrollY > 1200 && window.scrollY < 1800) {
    expa.classList.add("scrolled");
    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
  } else if (window.scrollY > 1800 && window.scrollY < 2400) {
    proa.classList.add("scrolled");

    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
  } else if (window.scrollY > 2400 && window.scrollY < 3000) {
    fora.classList.add("scrolled");

    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
    // hoba.classList.remove("scrolled");
  } else if (window.scrollY > 3000 && window.scrollY < 3200) {
    fora.classList.remove("scrolled");
    // hoba.classList.add("scrolled");
    ctta.classList.remove("scrolled");
    iconlk.style.opacity = "1";
    iconwwp.style.opacity = "1";
    iconegithub.style.opacity = "1";
  } else if (window.scrollY >= 2400) {
    // hoba.classList.remove("scrolled");
    ctta.classList.add("scrolled");

    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    iconlk.style.opacity = "0";
    iconwwp.style.opacity = "0";
    iconegithub.style.opacity = "0";
  }
});
