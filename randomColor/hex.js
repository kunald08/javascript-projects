// define hex
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, "A", "B", "C", "D", "E", "F"];

// define global vars
const btn = document.getElementById('btn');
const colour = document.querySelector('.color');

btn.addEventListener('click', function(){
    let hexColor = '#';

    // hexCode length = 00112233 = 6
    for(let i = 0; i < 6; i++){
        hexColor += hex[getRandomNumber()];
    }

    document.body.style.backgroundColor = hexColor;
    colour.textContent = hexColor;
});

// get random number from hex constant
function getRandomNumber(){
    return Math.floor(Math.random() * hex.length);
}