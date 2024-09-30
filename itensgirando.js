const thing = document.querySelector(".rotating-thing");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
let delta = 10;
let isMouseDown = false;
let startX;
let startDelta;

function updateRotation() {
  thing.style.setProperty("--delta", delta);
}

function onLeftButtonClick() {
  delta -= 0.6; // Ajuste o valor para alterar a velocidade da rotação
  updateRotation();
}

function onRightButtonClick() {
  delta += 0.8; // Ajuste o valor para alterar a velocidade da rotação
  updateRotation();
}

function onMouseDown(event) {
  isMouseDown = true;
  startX = event.clientX;
  startDelta = delta;
}

function onMouseMove(event) {
  if (!isMouseDown) return;
  const dx = event.clientX - startX;
  delta = startDelta + dx * 0.01; // Ajuste o valor para alterar a sensibilidade do arraste
  updateRotation();
}

function onMouseUp() {
  isMouseDown = false;
}

leftButton.addEventListener("click", onLeftButtonClick);
rightButton.addEventListener("click", onRightButtonClick);
document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

// Inicializa a rotação contínua com uma velocidade mais lenta
function animate() {
  delta -= 0.005;
  updateRotation();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function msgfuncionamento() {
  alert("este site não esta disponivel no momento veja outros projetos");
}
document
  .getElementById("linkhamburgeria")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    alert("Este site não está disponível no momento. Veja outros projetos.");
  });
document
  .getElementById("linkpizzaria")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    alert("Este site não está disponível no momento. Veja outros projetos.");
  });
