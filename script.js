let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#reset");
let congratesdiv = document.querySelector(".congrates-div");
let congratesHeading = document.querySelector(".congrates-heading");
let startAgain = document.querySelector(".again-game");
let drawPara = document.querySelector(".draw");
let turn0 = true;

const winnerPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const restartBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            box.classList.add("zero");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-mark");
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
        checkDraw();
    });
});

const checkWinner = () => {
    for (let pattern of winnerPattern) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val2 === val3) {
                winnerShow(val3);
                restartBoxes();
                return; // Stop further checks if a winner is found
            }
        }
    }
};

const checkDraw = () => {
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        drawPara.classList.remove("hide-draw");
        // restartBoxes();
    }
};

const winnerShow = (winner) => {
    congratesHeading.innerHTML = `Congratulation Player ${winner} is won `;
    congratesdiv.classList.remove("hide");
    drawPara.classList.add("hide-draw"); // Hide draw message if it was shown
};

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const newGameStart = () => {
    turn0 = true;
    enable();
    congratesdiv.classList.add("hide");
    drawPara.classList.add("hide-draw"); // Hide draw message on new game
};

startAgain.addEventListener("click", newGameStart);
restartBtn.addEventListener("click", newGameStart);
