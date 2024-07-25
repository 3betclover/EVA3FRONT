class Estudiante {
    constructor(apellidos, nombres, curso, nota1, nota2, nota3) {
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.curso = curso;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = this.calcularPromedio();
        this.situacion = this.determinarSituacion();
    }

    calcularPromedio() {
        const promedio = (parseFloat(this.nota1) + parseFloat(this.nota2) + parseFloat(this.nota3)) / 3;
        return Math.round(promedio);
    }

    determinarSituacion() {
        return this.promedio >= 40 ? "Aprobado" : "Reprobado";
    }
}

let estudiantes = [];
let editIndex = -1;

function capturar() {
    const apellidos = document.getElementById('apellidos').value;
    const nombres = document.getElementById('nombres').value;
    const curso = document.getElementById('curso').value;
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;
    const nota3 = document.getElementById('nota3').value;

    if (validar(apellidos, nombres, curso, nota1, nota2, nota3)) {
        return new Estudiante(apellidos, nombres, curso, nota1, nota2, nota3);
    } else {
        return null;
    }
}

function validar(apellidos, nombres, curso, nota1, nota2, nota3) {
    if (!apellidos || !nombres || !curso || !nota1 || !nota2 || !nota3) {
        alert("Todos los campos son obligatorios");
        return false;
    }

    const letraRegex = /^[A-Za-záéíóúÁÉÍÓÚüÜñÑ ]+$/;
    if (!letraRegex.test(apellidos) || !letraRegex.test(nombres)) {
        alert("Los campos de apellidos y nombres solo deben contener letras, tildes y espacios");
        return false;
    }

    const notas = [nota1, nota2, nota3].map(nota => parseFloat(nota));
    if (notas.some(nota => nota < 10 || nota > 70)) {
        alert("Las notas deben estar en el rango de 10 a 70");
        return false;
    }

    return true;
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
        row.insertCell(0).innerText = estudiante.apellidos;
        row.insertCell(1).innerText = estudiante.nombres;
        row.insertCell(2).innerText = estudiante.curso;

        // Inserta color segun la nota
        row.insertCell(3).innerHTML = `<span class="${getColorClass(estudiante.nota1)}">${estudiante.nota1}</span>`;
        row.insertCell(4).innerHTML = `<span class="${getColorClass(estudiante.nota2)}">${estudiante.nota2}</span>`;
        row.insertCell(5).innerHTML = `<span class="${getColorClass(estudiante.nota3)}">${estudiante.nota3}</span>`;

        // Aplica color al promedio
        row.insertCell(6).innerHTML = `<span class="${getPromedioClass(estudiante.promedio)}">${estudiante.promedio}</span>`;
        // Aplica color a la situacion
        row.insertCell(7).innerHTML = `<span class="${getSituacionClass(estudiante.situacion)}">${estudiante.situacion}</span>`;

        const actionsCell = row.insertCell(8);
        actionsCell.className = 'actions'; // Manejo de clases en css

        // Crea el btn editar
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.innerText = 'Editar';
        editButton.onclick = () => editar(index);
        actionsCell.appendChild(editButton);

        // Crea el btn Eliminar
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerText = 'Eliminar';
        deleteButton.onclick = () => eliminar(index);
        actionsCell.appendChild(deleteButton);
    });
}

function getColorClass(nota) {
    return parseFloat(nota) < 40 ? 'nota-roja' : 'nota-verde';
}

function getPromedioClass(promedio) {
    return parseFloat(promedio) < 40 ? 'promedio-rojo' : 'promedio-verde';
}

function getSituacionClass(situacion) {
    return situacion === 'Reprobado' ? 'situacion-roja' : 'situacion-verde';
}

function editar(index) {
    const estudiante = estudiantes[index];
    document.getElementById('apellidos').value = estudiante.apellidos;
    document.getElementById('nombres').value = estudiante.nombres;
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

