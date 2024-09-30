// Seleciona todas as tags <section> na página
var secoes = document.querySelectorAll("section");

// Adiciona um ouvinte de eventos de cópia a cada seção
secoes.forEach(function (seco) {
  secao.addEventListener("copy", function (e) {
    e.preventDefault();
    var navegador = getNavegador();
    var sistemaOperacional = getSistemaOperacional();
    var enderecoIP = window.location.hostname;
    var online = navigator.onLine;
    var larguraBanda = navigator.connection
      ? navigator.connection.downlink + " Mbps"
      : "Desconhecida";

    var mensagem =
      "Tentativa de cópia detectada!\nEsta sessão da pagina não pode ser copiada\n\nNome do Navegador: " +
      navegador +
      "\nSistema Operacional: " +
      sistemaOperacional +
      "\nEndereço IP: " +
      enderecoIP +
      "\nOnline: " +
      (online ? "Sim" : "Não") +
      "\nLargura de Banda: " +
      larguraBanda;
    alert(mensagem);
  });
});

function getNavegador() {
  var userAgent = navigator.userAgent;
  var navegador;
  if (userAgent.indexOf("Firefox") > -1) {
    navegador = "Firefox";
  } else if (userAgent.indexOf("Chrome") > -1) {
    navegador = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    navegador = "Safari";
  } else if (userAgent.indexOf("Opera") > -1) {
    navegador = "Opera";
  } else if (userAgent.indexOf("Edge") > -1) {
    navegador = "Edge";
  } else {
    navegador = "Desconhecido";
  }
  return navegador;
}

function getSistemaOperacional() {
  var plataforma = navigator.platform;
  var sistemaOperacional;
  if (plataforma.indexOf("Win") > -1) {
    sistemaOperacional = "Windows";
  } else if (plataforma.indexOf("Mac") > -1) {
    sistemaOperacional = "Mac OS";
  } else if (plataforma.indexOf("Linux") > -1) {
    sistemaOperacional = "Linux";
  } else {
    sistemaOperacional = "Desconhecido";
  }
  return sistemaOperacional;
}
