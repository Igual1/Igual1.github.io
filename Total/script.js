document.addEventListener("DOMContentLoaded", function() {
    const boxesContainer = document.getElementById('boxes-container');
    const tarifa = 0.69; // Tarifa em reais por kWh segundo a CPFL Paulista

    function calculateCost(energy, hours) {
        const consumption = (energy * hours) / 1000; // Convertendo de Watts para kWh
        return consumption * 30 * tarifa; // Cálculo mensal
    }

    function updateTotalSaldo() {
        const totalSaldoElement = document.getElementById('total-saldo-value');
        const environments = JSON.parse(localStorage.getItem('environments')) || [];
        let totalSaldo = 0;

        environments.forEach(env => {
            if (env.energy && env.hours) {
                totalSaldo += calculateCost(env.energy, env.hours);
            }
        });

        totalSaldoElement.textContent = totalSaldo.toFixed(2);
    }

    function loadEnvironments() {
        // Carregar dados do retângulo fixo do localStorage
        const fixedEnvironment = JSON.parse(localStorage.getItem('fixedEnvironment')) || {
            name: '',
            energy: '',
            hours: ''
        };
        document.getElementById('fixed-name-display').textContent = fixedEnvironment.name || 'Adicione seu eletrodoméstico';
        document.getElementById('fixed-energy-display').textContent = fixedEnvironment.energy || '-';
        document.getElementById('fixed-hours-display').textContent = fixedEnvironment.hours || '-';

        const fixedCost = calculateCost(fixedEnvironment.energy, fixedEnvironment.hours);
        const fixedBoxContent = document.querySelector('#fixed-box .box-content');
        const fixedCostElement = document.createElement('p');
        fixedCostElement.textContent = `Custo mensal: R$${fixedCost.toFixed(2)}`;
        fixedBoxContent.appendChild(fixedCostElement);

        // Adicionar comportamento de clique ao retângulo fixo
        const fixedBox = document.getElementById('fixed-box');
        fixedBox.addEventListener('click', () => {
            fixedBox.classList.toggle('active');
        });

        // Carregar ambientes dinâmicos do localStorage
        const environments = JSON.parse(localStorage.getItem('environments')) || [];
        environments.forEach((env, index) => {
            if (index > 0) { // Skip the fixed environment
                const existingBox = document.querySelector(`#box-${index}`);
                if (!existingBox) {
                    const box = document.createElement('div');
                    box.className = 'box';
                    box.id = `box-${index}`;

                    const arrow = document.createElement('span');
                    arrow.className = 'arrow';
                    arrow.textContent = '>';

                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = env.name;

                    const cost = calculateCost(env.energy, env.hours);
                    
                    const boxContent = document.createElement('div');
                    boxContent.className = 'box-content';
                    boxContent.innerHTML = `<p>Energia gasta: ${env.energy} W</p>
                                            <p>Horas consumidas: ${env.hours} h</p>
                                            <p>Custo mensal: R$${cost.toFixed(2)}</p>`;

                    box.appendChild(arrow);
                    box.appendChild(nameSpan);
                    box.appendChild(boxContent);

                    boxesContainer.appendChild(box);

                    box.addEventListener('click', () => {
                        box.classList.toggle('active');
                    });
                }
            }
        });

        updateTotalSaldo();
    }

    loadEnvironments();
});
