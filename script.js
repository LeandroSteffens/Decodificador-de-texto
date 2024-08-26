document.addEventListener("DOMContentLoaded", function () {
  const encryptButton = document.querySelector(".encrypt");
  const decryptButton = document.querySelector(".decrypt");
  const textarea = document.querySelector(".left-panel textarea");
  const resultText = document.querySelector(".right-panel h2");
  const image = document.querySelector(".right-panel img");
  const copyButton = document.querySelector(".copy");

  const substituicoes = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  const reverseSubstituicoes = Object.fromEntries(
    Object.entries(substituicoes).map(([chave, valor]) => [valor, chave])
  );

  encryptButton.addEventListener("click", function () {
    const texto = textarea.value.toLowerCase();
    const textoCriptografado = criptografarTexto(texto);
    resultText.textContent =
      textoCriptografado || "Nenhuma mensagem encontrada";
    tmudarVisibilidadeDaImagem(textoCriptografado);
  });

  decryptButton.addEventListener("click", function () {
    const texto = textarea.value;
    const textoDescriptografado = descriptografarTexto(texto);
    resultText.textContent =
      textoDescriptografado || "Nenhuma mensagem encontrada";
    tmudarVisibilidadeDaImagem(textoDescriptografado);
  });

  copyButton.addEventListener("click", function () {
    const texto = resultText.textContent;
    if (texto.trim() === "Nenhuma mensagem encontrada") {
      alert("Não há texto para copiar!");
      return;
    }
    navigator.clipboard
      .writeText(texto)
      .then(() => {})
      .catch((err) => {
        console.error("Erro ao copiar texto: ", err);
      });
  });

  function criptografarTexto(texto) {
    return texto
      .split("")
      .map((caractere) => substituicoes[caractere] || caractere)
      .join("");
  }

  function descriptografarTexto(texto) {
    const substituicoesOrdenadas = Object.keys(reverseSubstituicoes).sort(
      (a, b) => b.length - a.length
    );

    return substituicoesOrdenadas.reduce(
      (textoDescriptografado, substituicao) => {
        const caractereOriginal = reverseSubstituicoes[substituicao];
        const regex = new RegExp(substituicao, "g");
        return textoDescriptografado.replace(regex, caractereOriginal);
      },
      texto
    );
  }

  function tmudarVisibilidadeDaImagem(texto) {
    if (texto.trim() === "" || texto === "Nenhuma mensagem encontrada") {
      image.style.display = "block"; // Mostrar imagem
    } else {
      image.style.display = "none"; // Ocultar imagem
    }
  }
});
