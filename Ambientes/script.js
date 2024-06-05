document.addEventListener("DOMContentLoaded", function() {
    let environmentCount = 1; // Contador inicial (já existe um ambiente inicial)
    const maxEnvironments = 20;

    function saveFixedEnvironment() {
        const fixedEnvironment = {
            name: document.getElementById('fixed-name').value,
            energy: document.getElementById('fixed-energy').value,
            hours: document.getElementById('fixed-hours').value
        };
        localStorage.setItem('fixedEnvironment', JSON.stringify(fixedEnvironment));
    }

    document.getElementById('fixed-name').addEventListener('input', saveFixedEnvironment);
    document.getElementById('fixed-energy').addEventListener('input', saveFixedEnvironment);
    document.getElementById('fixed-hours').addEventListener('input', saveFixedEnvironment);

    window.addEnvironment = function(envData) {
        if (environmentCount >= maxEnvironments) {
            alert('Você atingiu o limite de 20 ambientes.');
            return;
        }

        const environmentsContainer = document.getElementById('environments');
        const newEnvironment = document.createElement('div');
        newEnvironment.className = 'add-environment';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = function() {
            removeEnvironment(deleteBtn);
        };

        const inputsDiv = document.createElement('div');
        inputsDiv.className = 'inputs';

        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.placeholder = 'Adicione um ambiente...';
        input1.oninput = saveEnvironmentData;

        const input2 = document.createElement('input');
        input2.type = 'number';
        input2.placeholder = 'Energia gasta (W)...';
        input2.oninput = saveEnvironmentData;

        const input3 = document.createElement('input');
        input3.type = 'number';
        input3.placeholder = 'Horas consumidas...';
        input3.oninput = saveEnvironmentData;

        if (envData) {
            input1.value = envData.name;
            input2.value = envData.energy;
            input3.value = envData.hours;
        }

        inputsDiv.appendChild(input1);
        inputsDiv.appendChild(input2);
        inputsDiv.appendChild(input3);

        newEnvironment.appendChild(deleteBtn);
        newEnvironment.appendChild(inputsDiv);
        environmentsContainer.appendChild(newEnvironment);
        environmentCount++;

        saveEnvironmentData();
    };

    window.removeEnvironment = function(button) {
        const environment = button.parentElement;
        environment.remove();
        environmentCount--;
        saveEnvironmentData();
    };

    function saveEnvironmentData() {
        const environments = [];
        // Salvar dados do ambiente fixo
        const fixedEnvironment = {
            name: document.getElementById('fixed-name').value,
            energy: document.getElementById('fixed-energy').value,
            hours: document.getElementById('fixed-hours').value
        };
        environments.push(fixedEnvironment);

        // Salvar dados dos ambientes dinâmicos
        document.querySelectorAll('.add-environment').forEach((envDiv, index) => {
            if (index > 0) { // Skip the fixed environment
                const inputs = envDiv.querySelectorAll('input');
                environments.push({
                    name: inputs[0].value,
                    energy: inputs[1].value,
                    hours: inputs[2].value
                });
            }
        });
        localStorage.setItem('environments', JSON.stringify(environments));
    }

    function loadEnvironmentData() {
        const fixedEnvironment = JSON.parse(localStorage.getItem('fixedEnvironment')) || {
            name: '',
            energy: '',
            hours: ''
        };
        document.getElementById('fixed-name').value = fixedEnvironment.name || '';
        document.getElementById('fixed-energy').value = fixedEnvironment.energy || '';
        document.getElementById('fixed-hours').value = fixedEnvironment.hours || '';

        const environments = JSON.parse(localStorage.getItem('environments')) || [];
        environments.forEach((env, index) => {
            if (index > 0) { // Skip the fixed environment
                addEnvironment(env);
            }
        });
    }

    loadEnvironmentData();
});




