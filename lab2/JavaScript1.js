var cardsArray = [
    { 'name': 'CSS', 'img': 'https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/css-3-1.png', },
    { 'name': 'HTML', 'img': 'https://media.geeksforgeeks.org/wp-content/uploads/20230927165806/html-5-1.png', },
    { 'name': 'java', 'img': 'https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/java.png', },
    { 'name': 'JS', 'img': 'https://media.geeksforgeeks.org/wp-content/uploads/20230927165804/js-3.png', },
    { 'name': 'Node', 'img': 'https://media.geeksforgeeks.org/wp-content/uploads/20230927165805/nodejs-1.png', },
    { 'name': 'React', 'img': 'https://media.geeksforgeeks.org/wp-content/uploads/20230927165802/atom-4.png', },
];


var gameGrid = cardsArray.concat(cardsArray);

gameGrid.sort(function () {
    return 0.5 - Math.random();
})

var game = document.getElementById("game-board");

var grid = document.createElement('section');

grid.setAttribute('class', 'grid');

game.appendChild(grid);


for (var i = 0; i < gameGrid.length; i++) {


    var card = document.createElement('div');

    card.setAttribute('class', 'card');

    card.setAttribute('data-name', gameGrid[i].name);


    var front = document.createElement('div');
    front.classList.add('front');


    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;


    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';



var count = 0;
var previousTarget = null;
var delay = 1200;




var match = function () {
    var selected = document.querySelectorAll('.selected');

    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
};


var resetGuesses = function () {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');

    }
};



grid.addEventListener('click', function (event) {

    var clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }


    if (count < 2) {
        count++;

        if (count === 1) {

            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {

            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess !== '' && secondGuess !== '') {

            if (firstGuess === secondGuess) {

                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }

});