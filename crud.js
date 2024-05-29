document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crudForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const indexInput = document.getElementById('index');
    const crudTableBody = document.getElementById('crudTableBody');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const index = indexInput.value;

        if (name === '' || email === '' || phone === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        const data = getData();
        if (index === '') {
            data.push({ name, email, phone });
        } else {
            data[parseInt(index)] = { name, email, phone };
        }
        saveData(data);
        renderData();
        form.reset();
        indexInput.value = '';
    });

    function getData() {
        return JSON.parse(localStorage.getItem('crudData')) || [];
    }

    function saveData(data) {
        localStorage.setItem('crudData', JSON.stringify(data));
    }

    function renderData() {
        const data = getData();
        crudTableBody.innerHTML = '';
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>
                    <button id="editbtn" onclick="editData(${index})">Editar</button>
                    <button id="eliminarbtn" onclick="deleteData(${index})">Eliminar</button>
                </td>
            `;
            crudTableBody.appendChild(row);
        });
    }

    window.editData = function(index) {
        const data = getData();
        const item = data[index];
        nameInput.value = item.name;
        emailInput.value = item.email;
        phoneInput.value = item.phone;
        indexInput.value = index;
    }

    window.deleteData = function(index) {
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            const data = getData();
            data.splice(index, 1);
            saveData(data);
            renderData();
        }
    }

    renderData();
});