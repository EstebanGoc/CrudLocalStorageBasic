//Variables globales 

const formularioUI = document.querySelector("#formulario")
const listaActividadUI = document.querySelector("#listaActividades")
let arrayActividades = []



// Funciones 

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item)

}

const guardarDB = () => {

    localStorage.setItem('rutina', JSON.stringify(arrayActividades))
    pintarDB()
}
const eliminarDB = (index) => {
    //console.log("Eliminar", index)
    arrayActividades.splice(index, 1);
    guardarDB();
}
const editarDB = (index) => {
    //console.log("Editar", index)
    arrayActividades[index].estado = !arrayActividades[index].estado;

    guardarDB();
}
const pintarDB = () => {
    listaActividadUI.innerHTML = `<tr>
    <th>Actividad</th>
    <th>Completar</th>
    <th>Editar</th>
    <th>Eliminar</th>
</tr>`;
    arrayActividades = JSON.parse(localStorage.getItem('rutina'))
    if (arrayActividades === null) {
        arrayActividades = []
    } else {

        arrayActividades.forEach((element, index) => {

            listaActividadUI.innerHTML += `
            <tr>
            <td>${element.actividad}</td>
            <td>${element.estado}</td>
            <td><button onclick="editarDB(${index})">Editar</button></td>
            <td><button onclick="eliminarDB(${index})">Eliminar</button></td>
            
          </tr>
             `
        });
    }
}



//EventListener 

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault()
    let actividadUI = document.querySelector('#actividad').value


    CrearItem(actividadUI)
    guardarDB()
    formularioUI.reset()
})


document.addEventListener('DOMContentLoaded', pintarDB)

