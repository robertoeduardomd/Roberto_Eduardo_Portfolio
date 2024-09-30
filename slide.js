var radio = document.querySelector(".manual-btn");
var cont = 1;
document.getElementById("radio1").checked = true;

function proximaimg() {
  cont++;
  if (cont > 3) {
    cont = 1;
  }
  document.getElementById("radio" + cont).checked = true;
}

setInterval(() => {
  proximaimg();
}, 6000);
