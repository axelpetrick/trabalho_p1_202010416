const inputPergunta = document.getElementById("inputPergunta");
const resultadoIA = document.getElementById("resultadoIA");

const OPENAI_API_KEY = "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";

function EnviarPergunta() {
	var valorPergunta = inputPergunta.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", 
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: valorPergunta,
      max_tokens: 2048, // tamanho da resposta
      temperature: 0.7, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resultadoIA.value) resultadoIA.value += "\n";

      if(json.error?.message){
        resultadoIA.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        resultadoIA.value += "Chat GPT: " + text;
      }

      resultadoIA.scrollTop = resultadoIA.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputPergunta.value = "";
      inputPergunta.disabled = false;
      inputPergunta.focus();
    });

	if (resultadoIA.value) resultadoIA.value += "\n\n\n";

	resultadoIA.value += `Eu: ${valorPergunta}`;
	inputPergunta.value = "Carregando...";
	inputPergunta.disabled = true;

  resultadoIA.scrollTop = resultadoIA.scrollHeight;
}

document.getElementById("EnviarPergunta").addEventListener("click", EnviarPergunta)

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}