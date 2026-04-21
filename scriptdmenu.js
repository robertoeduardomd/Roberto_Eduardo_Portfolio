let navigation = document.querySelector(".navigation");
let close = document.querySelector(".close");
let links = document.querySelectorAll(".navigation a");

// Adicionar evento de clique no navigation para abrir o menu
navigation.addEventListener("click", function (e) {
  if (!navigation.classList.contains("actived")) {
    e.preventDefault();
    navigation.classList.add("actived");
  }
});

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    if (!navigation.classList.contains("actived")) {
      e.preventDefault();
      navigation.classList.add("actived");
    }
  });
});

close.onclick = function () {
  navigation.classList.remove("actived");
};
