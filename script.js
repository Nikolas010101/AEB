const state = {
    WIDTH: 800,
    HEIGHT: 800,
    duration: 1000,
};

const canvas = document.getElementById("canvas");
canvas.width = state.WIDTH;
canvas.height = state.HEIGHT;

const ctx = canvas.getContext("2d");
const image = new Image();
let matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
];

image.onload = function () {
    drawImage();
};

image.src = "gato_foto.jpg";

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.transform(matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], -matrix[1][2]);

    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    ctx.restore();
}

function animateTransformation() {
    const targetMatrix = [
        [
            parseFloat(document.getElementById("m11").value) || 1,
            parseFloat(document.getElementById("m12").value) || 0,
            parseFloat(document.getElementById("m13").value) || 0,
        ],
        [
            parseFloat(document.getElementById("m21").value) || 0,
            parseFloat(document.getElementById("m22").value) || 1,
            parseFloat(document.getElementById("m23").value) || 0,
        ],
        [
            parseFloat(document.getElementById("m31").value) || 0,
            parseFloat(document.getElementById("m32").value) || 0,
            parseFloat(document.getElementById("m33").value) || 1,
        ],
    ];

    let startTime;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / state.duration, 1);
        matrix = interpolateMatrix(matrix, targetMatrix, progress);
        drawImage();
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function interpolateMatrix(matrix, targetMatrix, progress) {
    const interpolatedMatrix = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(matrix[i][j] + (targetMatrix[i][j] - matrix[i][j]) * progress);
        }
        interpolatedMatrix.push(row);
    }
    return interpolatedMatrix;
}

const transformationButton = document.querySelector("#transformation-button");
transformationButton.addEventListener("click", (button) => {
    animateTransformation();
});
