const exp = document.getElementsByClassName("colapsador");
for (i = 0; i < exp.length; i++) {
  exp[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}
