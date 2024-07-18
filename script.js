window.onload = function () {
    const formulario = document.getElementById('formulario');
    const dataInicioInput = document.getElementById('dataInicio');
    const afastamentoRadios = document.getElementsByName('afastamento');
    const dataRetornoInput = document.getElementById('dataRetorno');
    const dataFolgaInput = document.getElementById('dataFolga');
    const diasTrabalhadosLabel = document.getElementById('diasTrabalhados');
    const proximaFolgaLabel = document.getElementById('proximaFolga');

    function calcularDiasTrabalhados() {
        const dataInicioStr = dataInicioInput.value;
        const dataFolgaStr = dataFolgaInput.value;
        const afastamentoStr = Array.from(afastamentoRadios).find(radio => radio.checked).value;

        let dataRetornoStr = null;
        if (afastamentoStr === 'sim') {
            dataRetornoStr = dataRetornoInput.value;
        }

        console.log(`dataInicioStr: ${dataInicioStr}, dataFolgaStr: ${dataFolgaStr}, dataRetornoStr: ${dataRetornoStr}`);

        try {
            let dataInicio = parseDate(dataInicioStr);
            let dataFolga = parseDate(dataFolgaStr);

            if (!isValidDate(dataInicio) || !isValidDate(dataFolga)) {
                throw new Error('Formato de data inválido');
            }

            let dataRetorno = null;
            if (dataRetornoStr) {
                dataRetorno = parseDate(dataRetornoStr);
                if (!isValidDate(dataRetorno)) {
                    throw new Error('Formato de data inválido');
                }
            }

            let diasTrabalhados = calcularDiasFolga(dataInicio, dataFolga, dataRetorno);

            if (diasTrabalhados >= 14) {
                diasTrabalhadosLabel.textContent = `O policial tem direito a folga. Dias trabalhados: ${diasTrabalhados} dias.`;
                proximaFolgaLabel.textContent = '';
            } else {
                diasTrabalhadosLabel.textContent = `O policial ainda não tem direito a folga. Dias trabalhados: ${diasTrabalhados} dias.`;
                let proximaDataFolga = new Date(dataInicio);
                while (diasTrabalhados < 14) {
                    proximaDataFolga.setDate(proximaDataFolga.getDate() + 1);
                    diasTrabalhados = calcularDiasFolga(dataInicio, proximaDataFolga, dataRetorno);
                }
                proximaFolgaLabel.textContent = `Próxima data possível para folgar: ${proximaDataFolga.toLocaleDateString('pt-BR')}`;
            }
        } catch (error) {
            console.error(error);
            diasTrabalhadosLabel.textContent = 'Formato de data inválido.';
            proximaFolgaLabel.textContent = '';
        }
    }

    function parseDate(dateStr) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateStr)) {
            throw new Error('Formato de data inválido');
        }
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            throw new Error('Formato de data inválido');
        }
        return date;
    }

    function isValidDate(d) {
        return d instanceof Date && !isNaN(d.getTime());
    }

    function calcularDiasFolga(dataInicio, dataFolga, dataRetorno) {
        let diasTrabalhados = 0;
        if (dataRetorno) {
            dataInicio = dataRetorno;
        }

        let currentDate = new Date(dataInicio);
        while (currentDate <= dataFolga) {
            diasTrabalhados += 1;
            currentDate.setDate(currentDate.getDate() + 2); // Adiciona 2 dias (12 horas de trabalho + 36 horas de folga)
        }
        return diasTrabalhados;
    }

    afastamentoRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            dataRetornoInput.disabled = !document.getElementById('sim').checked;
        });
    });

    const calcularButton = document.getElementById('calcularButton');
    if (calcularButton) {
        calcularButton.addEventListener('click', calcularDiasTrabalhados);
    } else {
        console.error('Error: Button with ID "calcularButton" not found.');
    }
};
