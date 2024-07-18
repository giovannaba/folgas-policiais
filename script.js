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
    let dataRetorno = null;
    if (afastamento === 's') {
        dataRetorno = new Date(document.getElementById('data-retorno').value);
    }
    const dataFolga = new Date(document.getElementById('data-folga').value);

    let diasTrabalhados = 0;
    let currentDate = dataRetorno ? dataRetorno : dataInicio;
    while (currentDate <= dataFolga) {
        diasTrabalhados += 1;
        currentDate.setHours(currentDate.getHours() + 12 + 36);
    }

    const resultado = document.getElementById('resultado');
    if (diasTrabalhados >= 14) {
        resultado.textContent = O policial tem direito a folga. Dias trabalhados: ${diasTrabalhados} dias.;
    } else {
        resultado.textContent = O policial ainda não tem direito a folga. Dias trabalhados: ${diasTrabalhados} dias.;

        while (diasTrabalhados < 14) {
            dataFolga.setDate(dataFolga.getDate() + 1);
            diasTrabalhados = 0;
            currentDate = dataRetorno ? dataRetorno : dataInicio;
            while (currentDate <= dataFolga) {
                diasTrabalhados += 1;
                currentDate.setHours(currentDate.getHours() + 12 + 36);
            }
        }

        resultado.textContent += ` A próxima data possível para folgar é: ${dataFolga.toLocaleDateString()}.`;
    }
}