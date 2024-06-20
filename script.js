const form = document.getElementById("complex-form");
const algebraicForm = document.getElementById("algebraic-form");
const trigonometricForm = document.getElementById("trigonometric-form");
const showFormButton = document.getElementById("show-form");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const resultsDiv = document.getElementById("results");

let selectedForm = document.querySelector(
    'input[name="form"]:checked'
).value;

if (selectedForm === "algebraic") {
    algebraicForm.classList.remove("hidden");
    trigonometricForm.classList.add("hidden");
} else {
    algebraicForm.classList.add("hidden");
    trigonometricForm.classList.remove("hidden");
}

showFormButton.addEventListener("click", () => {
    selectedForm = document.querySelector(
        'input[name="form"]:checked'
    ).value;
    if (selectedForm === "algebraic") {
        algebraicForm.classList.remove("hidden");
        trigonometricForm.classList.add("hidden");
    } else {
        algebraicForm.classList.add("hidden");
        trigonometricForm.classList.remove("hidden");
    }
});

calculateButton.addEventListener("click", () => {
    resultsDiv.innerHTML = "";

    const selectedForm = document.querySelector(
        'input[name="form"]:checked'
    ).value;

    const operations = Array.from(
        document.querySelectorAll('input[name="operation"]:checked')
    ).map((op) => op.value);

    let real = 0,
        imaginary = 0,
        modulus = 0,
        argument = 0;

    if (selectedForm === "algebraic") {
        const realPartInput = document.getElementById("real-part");
        const imaginaryPartInput = document.getElementById("imaginary-part");

        real = parseFloat(realPartInput.value);
        imaginary = parseFloat(imaginaryPartInput.value);

        if (isNaN(real) || isNaN(imaginary)) {
            alert(
                "Пожалуйста, введите верные числа для действительной и мнимой части."
            );
            return;
        }

        modulus = Math.sqrt(real * real + imaginary * imaginary);
        argument = Math.atan2(imaginary, real);
    } else {
        const modulusInput = document.getElementById("modulus");
        const argumentInput = document.getElementById("argument");

        modulus = parseFloat(modulusInput.value);
        argument = parseFloat(argumentInput.value);

        if (isNaN(modulus) || isNaN(argument)) {
            alert("Пожалуйста, введите верные числа для модуля и аргумента.");
            return;
        }

        real = modulus * Math.cos(argument);
        imaginary = modulus * Math.sin(argument);
    }

    const results = {};
    if (operations.includes("real")) results.real = real;
    if (operations.includes("imaginary")) results.imaginary = imaginary;
    if (operations.includes("modulus")) results.modulus = modulus;
    if (operations.includes("argument")) results.argument = argument;

    resultsDiv.innerHTML = formatResults(results);
});

clearButton.addEventListener("click", () => {
    form.reset();
    resultsDiv.innerHTML = "";
});

function formatResults(results) {
    let resultText = '';

    if (results.real !== undefined) {
        resultText += `Действительная часть: ${results.real.toFixed(2)}<br>`;
    }

    if (results.imaginary !== undefined) {
        resultText += `Мнимая часть: ${results.imaginary.toFixed(2)}<br>`;
    }

    if (results.modulus !== undefined) {
        resultText += `Модуль: ${results.modulus.toFixed(2)}<br>`;
    }

    if (results.argument !== undefined) {
        resultText += `Аргумент: ${results.argument.toFixed(2)} радиан<br>`;
    }

    return resultText;
}
