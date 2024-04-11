// Variables globales
var lista = [];  // Lista de espera
var consultorio = [];  // Consultorio de reproducción
var cancionesdisponibles = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];  // Lista de canciones disponibles
var historialCanciones = [];  // Historial de canciones reproducidas

// Función para agregar una canción a la lista de espera
function agregarPersona() {
  var nombre = prompt("Ingrese el nombre de la canción:");

  if (cancionesdisponibles.includes(nombre)) {
    lista.push(nombre);  // Agrega la canción a la lista de espera

    actualizarLista();
  } else {
    alert("La canción no está en la lista de canciones disponibles.");
  }
} 

// Función para pasar a la siguiente canción
function pasarPersona() {
  if (lista.length > 0) {
    var persona = lista.shift();  // Obtiene la primera canción de la lista de espera

    if (consultorio.length > 0) {
      consultorio.shift();  // Borra la canción que estaba en reproducción
    }

    if (cancionesdisponibles.includes(persona)) {
      consultorio.push(persona);  // Agrega la canción al consultorio de reproducción

      historialCanciones.push(persona);  // Agrega la canción al historial

      actualizarLista();
    } else {
      alert("La canción no está en la lista de canciones disponibles.");
    }
  } else {
    alert("La lista de espera está vacía.");
  }
}

// Función para actualizar la interfaz con las listas
function actualizarLista() {
  document.getElementById("lista-espera").innerHTML = "";
  for (var i = 0; i < lista.length; i++) {
    var li = document.createElement("li");
    li.textContent = lista[i];
    document.getElementById("lista-espera").appendChild(li);
  }

  document.getElementById("lista-consultorio").innerHTML = "";
  for (var i = 0; i < consultorio.length; i++) {
    var li = document.createElement("li");
    li.textContent = consultorio[i];
    document.getElementById("lista-consultorio").appendChild(li);
  }
}

// Función para borrar una canción de la lista de espera
function borrarConsultorio() {
  var nombre = prompt("Ingrese el nombre de la canción que quiere borrar:");

  for (var i = 0; i < lista.length; i++) {
    if (lista[i] == nombre) {
      lista.splice(i, 1);  // Elimina la canción de la lista de espera

      actualizarLista();

      alert("La canción " + nombre + " fue borrada de la cola.");
      return;
    }
  }

  alert("La canción " + nombre + " no se encuentra en la cola");
}

// Función para ver el historial de canciones reproducidas
function verHistorial() {
  if (historialCanciones.length === 0) {
    alert("El historial de canciones está vacío.");
  } else {
    alert("Historial de canciones:\n" + historialCanciones.join("\n"));
  }
}

// Función para regresar una canción desde el historial
function regresarCancionDesdeHistorial() {
  if (historialCanciones.length > 0) {
    var cancion = historialCanciones.pop();  // Obtiene la última canción del historial

    if (consultorio.length > 0 && consultorio[0] !== cancion) {
      lista.unshift(consultorio[0]);  // Mueve la canción actual al principio de la lista de espera
    }

    if (consultorio.length > 0) {
      consultorio.shift();  // Elimina la canción del consultorio
    }

    consultorio.unshift(cancion);  // Agrega la canción desde el historial al consultorio

    actualizarLista();
  } else {
    alert("No hay canciones en el historial para regresar.");
  }
}

// Eventos
document.getElementById("boton-agregar").addEventListener("click", agregarPersona);
document.getElementById("boton-pasar").addEventListener("click", pasarPersona);
document.getElementById("boton-borrar").addEventListener("click", borrarConsultorio);
document.getElementById("ver-historial").addEventListener("click", verHistorial);
document.getElementById("boton-regresar-historial").addEventListener("click", regresarCancionDesdeHistorial);

// Inicialización
actualizarLista();
