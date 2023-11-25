const tablaUsuario = document.querySelector("#tablaUsuario");
const formularioJuegos = document.querySelector("#formularioJuegos");
const tablaJuego = document.querySelector("#tablaJuego");

let usuariosPrueba = [
  {
    id: 123,
    nombre: "messi",
    email: "as@hotmail.com",
  },
];
localStorage.setItem("usuarios", JSON.stringify(usuariosPrueba));

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

//evento
formularioJuegos.addEventListener("submit", crearJuego);

let juegos = JSON.parse(localStorage.getItem("juegos"));

class juego {
  constructor(codigo, nombre, categoria, descripcion) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
  }
}

//mostrar los usuarios en la tabla
function cargarTablaUsuario() {
  if (usuarios.length > 0) {
    usuarios.map(function (usuario) {
      let tr = document.createElement("tr");

      tr.innerHTML = `
                <td class='row align-middle'>${usuario.id}</td>
                <td class='align-middle d-none d-md-table-cell'>${usuario.nombre}</td>
                <td class='align-middle '>${usuario.email}</td>
                <td><button class="btn btn-info" id="botonEdit"><i class="fa-regular fa-pen-to-square"></i></button>  
                <button class="btn btn-danger" id="botonEdit2"><i class="fa-solid fa-delete-left"></i></button></td>`;

      tablaUsuario.appendChild(tr);
    });
  } else {
    error("no existen usuarios");
  }
}

cargarTablaUsuario();

// crear juegos
function crearJuego(e) {
  e.preventDefault();

  const codigo = `${Date.now()}`;
  const nombre = document.querySelector("#nombre").value;
  const categoria = document.querySelector("#categoria").value;
  const descripcion = document.querySelector("#descripcion").value;

  //validacioness
  if (nombre === "" || categoria === "" || descripcion === "") {
    error("Los campos no pueden estar vacios");
    return;
  } else if (descripcion.length > 600) {
    error("la descripcion debe tener menor de 600 caracteres ");
  } else {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Producto Cargado Correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  const newgames = new juego(codigo, nombre, categoria, descripcion);

  juegos.push(newgames);

  localStorage.setItem("juegos", JSON.stringify(juegos));

  formularioJuegos.reset();

  cargarTablaJuego();
}

function cargarTablaJuego() {
  tablaJuego.innerHTML = "";

  juegos.map(function (jg) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
                <td class='row align-middle '>${jg.codigo}</td>
                <td class='align-middle'>${jg.nombre}</td>
                <td class='align-middle'>${jg.categoria}</td>
                <td class='align-middle d-none d-md-table-cell'>${jg.descripcion}</td>
                <td>
                <button class="btn btn-info" id="botonEdit"><i class="fa-regular fa-pen-to-square"></i></button>  
                <button class="btn btn-danger" id="botonEdit2" onclick='borrarJuegos (${jg.codigo})'><i class="fa-solid fa-delete-left"></i></button> 
                </td>`;

    tablaJuego.appendChild(tr);
  });
}

cargarTablaJuego();

function error(mensaje) {
  parrafo.textContent = mensaje;

  setTimeout(() => {
    parrafo.textContent = "";
  }, 6000);
}

// funcion borrar juegos

function borrarJuegos(codigo) {
  juegos = juegos.filter(function (jg) {
    return jg.codigo !== codigo;
  });
  console.log(juegos);
}
