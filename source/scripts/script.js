document.addEventListener('DOMContentLoaded', function () {
    const num1Input = document.getElementById('calc-num1');
    const num2Input = document.getElementById('calc-num2');
    const operationSelect = document.getElementById('calc-operation');
    const calcButton = document.getElementById('calc-btn');
    const resultBox = document.getElementById('calc-result');

    if (!num1Input || !num2Input || !operationSelect || !calcButton || !resultBox) {
        // Página sem calculadora (por segurança)
        console.warn('Elementos da calculadora não encontrados na página.');
        return;
    }

    function formatNumber(value) {
        // Evita mostrar .000 e trata NaN
        if (Number.isNaN(value)) return 'Valor inválido';
        return Number.isInteger(value) ? value.toString() : value.toFixed(2);
    }

    calcButton.addEventListener('click', function () {
        const n1 = parseFloat(num1Input.value.replace(',', '.'));
        const n2 = parseFloat(num2Input.value.replace(',', '.'));

        if (Number.isNaN(n1) || Number.isNaN(n2)) {
            resultBox.textContent = 'Por favor, preencha os dois números.';
            resultBox.classList.add('calculator__result--error');
            return;
        }

        let result;
        const op = operationSelect.value;

        switch (op) {
            case 'add':
                result = n1 + n2;
                break;
            case 'sub':
                result = n1 - n2;
                break;
            case 'mul':
                result = n1 * n2;
                break;
            case 'div':
                if (n2 === 0) {
                    resultBox.textContent = 'Não é possível dividir por zero.';
                    resultBox.classList.add('calculator__result--error');
                    return;
                }
                result = n1 / n2;
                break;
            default:
                resultBox.textContent = 'Operação inválida.';
                resultBox.classList.add('calculator__result--error');
                return;
        }

        resultBox.classList.remove('calculator__result--error');
        resultBox.textContent = `Resultado: ${formatNumber(result)}`;
    });
});