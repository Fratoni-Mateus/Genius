let order = [];
let clickedOrder = [];
let score = 0;

//0 = green
//1 = red
//2 = yellow
//3 = blue

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//Creates a random color order
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4)
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//Lights the next color
let lightColor = (element, number) => {
    number = number * 650;
    setTimeout(() => {
        element.classList.add("selected");
    }, number);

    setTimeout(() => {
        element.classList.remove("selected");
    },number + 350);
}

//Checks if the pressed buttons are equal to the game generated sequence
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        setTimeout(nextLevel(),600);
    }
}

//User click function
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },150);


}

//Returns the color based on its numerical value
let createColorElement = (color) => {
    if (color == 0 ) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//Calls the next level
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Game over and restart
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Starts the game
let playGame = () => {
    score = 0;
    nextLevel();
}

//event for color clicks
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Welcome message only on page load
let welcomeMessage = () => {
    alert("Bem vindo ao Genius! Iniciando novo jogo!");
}

//Welcomes player
welcomeMessage();

//Auto-start the game on page load.
playGame();
