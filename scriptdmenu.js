let navigation = document.querySelector(".navigation");
let close = document.querySelector(".close");
navigation.onclick = function () {
navigation.classList.add("actived");
};
close.onclick = function () {
navigation.classList.remove("actived");
};