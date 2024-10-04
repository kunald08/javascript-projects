// get colour array
const colours = [
    'beige',
    '#58a',
    'rgb(255, 241, 101)',
    'turquoise',
    'hsla(120,100%,25%,0.3)',
    'yellowgreen',
    'crimson',
    '#bbeeaa'
];

// define global vars
const btn = document.getElementById('btn');
const colour = document.querySelector('.color');

// add button click handler
btn.addEventListener('click', function(){
    const randomNumber = getRandomColour();

    document.body.style.backgroundColor = colours[randomNumber];
    colour.textContent = colours[randomNumber];
});

// get random colour index
function getRandomColour(){
    return Math.floor(Math.random() * colours.length);
}