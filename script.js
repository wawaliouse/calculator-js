// 1. Cibler le display
const display = document.getElementById("display");
//2. Cibler tout les bouton 
const buttons = document.querySelectorAll("button");
const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "x", ".", "%", "Backspace"];
const operators = ["+", "-", "*", "/", "."];

//3. Réagir quand un bouton est cliqué
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        //Ignorer le bouton "C" ou "=" pour l'instant
        if (value === "C") {
            display.textContent = "0";
        } else if (value === "=") {
            try {
                const expression = display.textContent
                    .replaceAll("x", "*")
                    .replaceAll("%", "/100");
                display.textContent = eval(expression);
            } catch {
                display.textContent = "Erreur";
            }
        } else if (value === "←") {
            if (display.textContent.length > 1) {
                display.textContent = display.textContent.slice(0, -1);
            } else {
                display.textContent = "0";
            }
        } else {
            const lastChar = display.textContent.slice(-1);

            if (operators.includes(lastChar) && operators.includes(value)) {
                // Ne pas autoriser deux opérateurs d’affilée
                return;
            }

            if (display.textContent === "0") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }
    });
});
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "c" || key === "C") {
        display.textContent = "0";
    } else if (key === "Enter" || key === "=") {
        try {
            const expression = display.textContent
                .replaceAll("x", "*")
                .replaceAll("%", "/100");
            display.textContent = eval(expression);
        } catch {
            display.textContent = "Erreur";
        }
    } else if (key === "Backspace") {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else {
            display.textContent = "0";
        }
    } else if (validKeys.includes(key)) {
        const lastChar = display.textContent.slice(-1);

        if (operators.includes(lastChar) && operators.includes(key)) {
            return;
        }

        if (display.textContent === "0") {
            display.textContent = key;
        } else {
            display.textContent += key;
        }
    }
});
