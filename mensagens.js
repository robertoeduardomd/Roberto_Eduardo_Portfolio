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
  const cert = document.querySelector(".cert");
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
    cert.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");

    iconlk.style.opacity = "0";
    iconwwp.style.opacity = "0";
    iconegithub.style.opacity = "0";
  } else if (window.scrollY > 600 && window.scrollY < 1600) {
     proa.classList.add("scrolled");

    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    cert.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
    
    iconlk.style.opacity = "1";
    iconwwp.style.opacity = "1";
    iconegithub.style.opacity = "1";
  } else if (window.scrollY > 1600 && window.scrollY < 2600) {
       expa.classList.add("scrolled");
    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    cert.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
    

   
  } else if (window.scrollY > 2600 && window.scrollY < 4200) {
    cert.classList.add("scrolled");

    fora.classList.remove("scrolled");
    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");

    ctta.classList.remove("scrolled");
 
  } else if (window.scrollY > 4200 && window.scrollY < 4800) {
    teca.classList.add("scrolled");
    inia.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    cert.classList.remove("scrolled");
    fora.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
    // hoba.classList.remove("scrolled");
  } else if (window.scrollY > 4800 && window.scrollY < 5400) {
    fora.classList.add("scrolled");

    cert.classList.remove("scrolled");
    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
  } else if (window.scrollY > 5400 && window.scrollY < 6000) {
    fora.classList.add("scrolled");

    inia.classList.remove("scrolled");
    teca.classList.remove("scrolled");
    expa.classList.remove("scrolled");
    proa.classList.remove("scrolled");
    ctta.classList.remove("scrolled");
    cert.classList.remove("scrolled");
    // hoba.classList.remove("scrolled");
  } else if (window.scrollY > 6000 && window.scrollY < 6800) {
    fora.classList.remove("scrolled");
    // hoba.classList.add("scrolled");
    ctta.classList.remove("scrolled");
    iconlk.style.opacity = "1";
    iconwwp.style.opacity = "1";
    iconegithub.style.opacity = "1";
  } else if (window.scrollY >= 6800) {
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
