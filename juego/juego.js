
const letrascont = document.getElementById("letras");
const opcioness = document.getElementById("opciones-contenido");
const fpalabra = document.getElementById("palabra");
const spopup = document.getElementById("popup");
const njboton = document.getElementById("nuevo_juego");
const reiniciar = document.getElementById("desistir");
const canvas = document.getElementById("canvas");
const resultados = document.getElementById("resultado");

let options = {
"Nuevo juego": [
"aceleracion",
"eclipse",
"entropia",
"antena",
"antimateria",
"luz",
"apogeo",
"Apolo",
"asteroide",
"astro",
"curso",
"programacion",
"github",
"atomo",
"atraccion",
"alura",
"java",
"carbono",
"celeste",
  ]
};


let winCount = 0;
let count = 0;

let chosenWord = "";

const displayOptions = () => {
    opcioness.innerHTML += `<h3>Selecione una opción</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  opcioness.appendChild(buttonCon);
};

const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  spopup.classList.remove("hide");
};

const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");

  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letrascont.classList.remove("hide");
  fpalabra.innerText = "";

  let optionArray = options[optionValue];

  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  
  fpalabra.innerHTML = displayItem;
};

/*funcion desistir*/
const initializer = () => {
  winCount = 0;
  count = 0;

  fpalabra.innerHTML = "";
  opcioness.innerHTML = "";
  letrascont.classList.add("hide");
  spopup.classList.add("hide");
  letrascont.innerHTML = "";

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
        
          if (char === button.innerText) {
            
            dashes[index].innerText = char;
            
            winCount += 1;
            /*Ganaste alert*/
            if (winCount == charArray.length) {
              resultados.innerHTML = `<h2 class='win-msg'>Ganaste Felicidades</h2>`;
              blocker();
            }
          }
        });
      } else {
        /*contador al canvas*/
        count += 1;
        drawMan(count);
        /*contador maximo es 6*/
        if (count == 6) {
          resultados.innerHTML = `<h2 class='lose-msg'>Perdiste, intenta de nuevo</h2><p>La palabra era: <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      
      button.disabled = true;
    });
    letrascont.append(button);
  }

  /*popup de victorio/derrota*/
  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

/*Canvas*/
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  /*dibujado*/
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  const initialDrawing = () => {
    /*limpiar canvas*/
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    drawLine(10, 130, 130, 130);
    
    drawLine(10, 10, 10, 131);
    
    drawLine(10, 10, 70, 10);
    
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

/*pasos de dibujo*/
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
njboton.addEventListener("click", initializer);
window.onload = initializer;

reiniciar.addEventListener("click", initializer);
window.onload = initializer;