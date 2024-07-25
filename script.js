class Estudiante {
    constructor(apellido, nombre, curso, nota1, nota2, nota3) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.curso = curso;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = this.calcularPromedio();
        this.situacion = this.determinarSituacion();
    }

    calcularPromedio() {
        const promedio = (parseFloat(this.nota1) + parseFloat(this.nota2) + parseFloat(this.nota3)) / 3;
        return Math.ceil(promedio);
    }

    determinarSituacion() {
        return this.promedio >= 40 ? "Aprobado" : "Reprobado";
    }
}

let estudiantes = [];
let editIndex = -1;

function capturar() {
    const apellido = document.getElementById('apellido').value;
    const nombre = document.getElementById('nombre').value;
    const curso = document.getElementById('curso').value;
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;
    const nota3 = document.getElementById('nota3').value;

    if (validar(apellido, nombre, curso, nota1, nota2, nota3)) {
        return new Estudiante(apellido, nombre, curso, nota1, nota2, nota3);
    } else {
        alert("Todos los campos son obligatorios");
        return null;
    }
}

function validar(apellido, nombre, curso, nota1, nota2, nota3) {
    return apellido && nombre && curso && nota1 && nota2 && nota3;
}

function agregar() {
    const estudiante = capturar();
    if (estudiante) {
        if (editIndex === -1) {
            estudiantes.push(estudiante);
        } else {
            estudiantes[editIndex] = estudiante;
            editIndex = -1;
        }
        actualizarTabla();
        document.getElementById('formulario').reset();
    }
}

function actualizarTabla() {
    const tbody = document.getElementById('tabla-estudiantes').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    estudiantes.forEach((estudiante, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = estudiante.apellido;
        row.insertCell(1).innerText = estudiante.nombre;
        row.insertCell(2).innerText = estudiante.curso;
        row.insertCell(3).innerText = estudiante.nota1;
        row.insertCell(4).innerText = estudiante.nota2;
        row.insertCell(5).innerText = estudiante.nota3;
        row.insertCell(6).innerText = estudiante.promedio;
        row.insertCell(7).innerText = estudiante.situacion;

        const actionsCell = row.insertCell(8);
        actionsCell.className = 'actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.innerText = 'Editar';
        editButton.onclick = () => editar(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerText = 'Eliminar';
        deleteButton.onclick = () => eliminar(index);
        actionsCell.appendChild(deleteButton);
    });
}

function editar(index) {
    const estudiante = estudiantes[index];
    document.getElementById('apellido').value = estudiante.apellido;
    document.getElementById('nombre').value = estudiante.nombre;
    document.getElementById('curso').value = estudiante.curso;
    document.getElementById('nota1').value = estudiante.nota1;
    document.getElementById('nota2').value = estudiante.nota2;
    document.getElementById('nota3').value = estudiante.nota3;
    editIndex = index;
}

function eliminar(index) {
    if (confirm("¿Está seguro de que desea eliminar este registro?")) {
        estudiantes.splice(index, 1);
        actualizarTabla();
    }
}
