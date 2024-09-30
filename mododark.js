const headerr = document.querySelector("header");
const conteudoinicio = document.querySelector(".conteudoinicio");

const spanElement = document.querySelector(".txtdigitado span");

const tecno = document.querySelector(".tecno");
const tecnomb = document.querySelector(".tecnomb");

const form = document.getElementById("form");

const switc = document.querySelector(".switch");
const toggle = document.querySelector(".toggle-logo");
const background = document.querySelector(".imgfundositeimg");
const imggit = document.querySelector(".iconegithub");
const experiencias = document.querySelector(".experiencias ");
const contcolapsador = document.querySelectorAll(".conteudocolapsador ");
const label = document.querySelectorAll(".label ");
const txtcolap = document.querySelectorAll(".txtcolapsador");
const clconhecer = document.querySelectorAll(".clconhecer");
const girade = document.querySelector(".contem_coisa_gira_de");
const giradd = document.querySelector(".contem_coisa_gira_dd");

toggle.addEventListener("change", () => {
  switc.style.cursor = "grabbing";
  if (toggle.checked) {
    headerr.style.background =
      "linear-gradient(45deg, black, rgb(0, 0, 0), rgb(109, 109, 109), rgb(0, 0, 0), black)";
    conteudoinicio.style.background = "black";

    background.style.filter = "invert(100%)";
    imggit.style.filter = "invert(100%)";
    experiencias.style.background = "black";
    clconhecer.forEach((cconhecer) => {
      cconhecer.style.color = "white";
    });

    girade.style.background =
      "linear-gradient(150deg, transparent, transparent, transparent, transparent, transparent, transparent, rgb(1, 221, 118), rgb(1, 221, 118), rgb(1, 221, 118), rgb(1, 221, 118))";
    giradd.style.background =
      "linear-gradient(210deg, transparent, transparent, transparent, transparent, transparent, transparent, rgb(1, 221, 118), rgb(1, 221, 118), rgb(1, 221, 118), rgb(1, 221, 118))";

    contcolapsador.forEach((ctcolap) => {
      ctcolap.style.background = "black";
    });

    txtcolap.forEach((txtcol) => {
      txtcol.style.color = "white";
    });

    // Alterando o ::after do span
    spanElement.style.setProperty("--after-content", "'Novo Conteúdo Dark'");
    spanElement.style.setProperty("--after-color", "black");

    tecno.style.background = "black";
    tecnomb.style.background = "black";
    form.style.background = "black";
  } else {
    headerr.style.background =
      "linear-gradient(45deg, rgb(0, 33, 105), rgb(0, 33, 105), rgb(109, 109, 109), rgb(0, 33, 105), rgb(0, 33, 105))";
    conteudoinicio.style.background = "rgb(0, 33, 105)";
    background.style.filter = "invert(0%)";
    imggit.style.filter = "invert(0%)";
    experiencias.style.background = "rgb(233, 233, 233)";
    clconhecer.forEach((cconhecer) => {
      cconhecer.style.color = "blue";
    });
    girade.style.background =
      "linear-gradient(150deg, transparent, transparent, transparent, transparent, transparent, transparent, black, black, black, black)";
    giradd.style.background =
      "linear-gradient(210deg, transparent, transparent, transparent, transparent, transparent, transparent, black, black, black, black)";

    contcolapsador.forEach((ctcolap) => {
      ctcolap.style.background = "white";
    });

    txtcolap.forEach((txtcol) => {
      txtcol.style.color = "black";
    });

    // Reverter o ::after do span
    spanElement.style.setProperty("--after-content", "'Texto Original'");
    spanElement.style.setProperty("--after-color", "rgb(0, 33, 105)");

    tecno.style.background = "linear-gradient(45deg, black, rgb(0, 33, 105) )";
    tecnomb.style.background =
      "linear-gradient(45deg, black, rgb(0, 33, 105) )";
    form.style.background = "linear-gradient(45deg, black, rgb(0, 33, 105) )";
  }
});
