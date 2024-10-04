// set initial count
let count = 0;

// select value and buttons
const value = document.getElementById("value");
const btns = document.querySelectorAll(".btn");

// add click event listener for all buttons
btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const targetEl = e.currentTarget.classList;

        if (targetEl.contains("decrease")) {
            count--;
        } else if (targetEl.contains("increase")) {
            count++;
        } else {
            count = 0;
        }

        if (count > 0) {
            value.style.color = "deeppink";
        }
        if (count < 0) {
            value.style.color = "grey";
        }
        if (count === 0) {
            value.style.color = "#222";
        }

        // update value
        value.textContent = count;
    });
});
