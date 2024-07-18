document.getElementById('afastamento').addEventListener('change', function() {
    const dataRetornoContainer = document.getElementById('data-retorno-container');
    if (this.value === 's') {
        dataRetornoContainer.style.display = 'block';
    } else {
        dataRetornoContainer.style.display = 'none';
    }
});

function calcularFolga() {
    const dataInicio = new Date(document.getElementById('data-inicio').value);
    const afastamento = document.getElementById('afastamento').value;
    const dataRetorno = afastamento === 's' ? new Date(document.getElementById('data-retorno').value) : null;
    const dataFolga = new Date(document.getElementById('data-folga').value);

    if (isNaN(dataInicio) || isNaN(dataFolga) || (afastamento === 's' && isNaN(dataRetorno))) {
        alert("Por favor, insira todas as datas corretamente.");
        return;
    }

    let diasTrabalhados = 0;
    let currentDate = dataRetorno || dataInicio;

    while (currentDate <= dataFolga) {
        diasTrabalhados++;
        currentDate.setHours(currentDate.getHours() + 12); // adiciona 12 horas de trabalho
        currentDate.setDate(currentDate.getDate() + 1); // adiciona 36 horas de folga
    }

    const resultado = document.getElementById('resultado');
    if (diasTrabalhados >= 14) {
        resultado.textContent = O policial tem direito a folga. Dias trabalhados: ${diasTrabalhados} dias.;
    } else {
        resultado.textContent = O policial ainda não tem direito a folga. Dias trabalhados: ${diasTrabalhados} dias.;

        while (diasTrabalhados < 14) {
            dataFolga.setDate(dataFolga.getDate() + 1);
            diasTrabalhados = 0;
            currentDate = dataRetorno || dataInicio;
            while (currentDate <= dataFolga) {
                diasTrabalhados++;
                currentDate.setHours(currentDate.getHours() + 12); // adiciona 12 horas de trabalho
                currentDate.setDate(currentDate.getDate() + 1); // adiciona 36 horas de folga
            }
        }

        resultado.textContent += ` A próxima data possível para folgar é: ${dataFolga.toLocaleDateString()}.`;
    }
}