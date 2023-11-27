const tablaUsuario = document.querySelector("#tablaUsuario");
const formularioJuegos = document.querySelector("#formularioJuegos");
const tablaJuego = document.querySelector("#tablaJuego");
const formJuegosEditar = document.querySelector("#formJuegosEditar");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuariosPrueba = [
  {
    id: 123,
    nombre: "messi",
    email: "as@hotmail.com",
  },
];

localStorage.setItem("usuarios", JSON.stringify(usuariosPrueba));

//evento
formularioJuegos.addEventListener("submit", crearJuego);
formJuegosEditar.addEventListener("submit", editarJuegos);

let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

class juego {
  constructor(codigo, nombre, categoria, descripcion) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
  }
}
const admin = new admin(9999, "admin", 33, "admin@hotmail.com", "admin123");
//mostrar los usuarios en la tabla
function cargarTablaUsuario() {
  if (usuarios.length > 0) {
    usuarios.map(function (usuario) {
      let tr = document.createElement("tr");
      tr.innerHTML = `
                <td class=' align-middle'>${usuario.id}</td>
                <td class='align-middle d-none d-md-table-cell'>${usuario.nombre}</td>
                <td class='align-middle '>${usuario.email}</td>
                <td><button class="btn btn-info" ><i class="fa-regular fa-pen-to-square"></i></button>  
                <button class="btn btn-danger" onclick='borrarUsuario(${usuario.id})'><i class="fa-solid fa-delete-left"></i></button></td>`;
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
                <td class='align-middle '>${jg.codigo}</td>
                <td class='align-middle'>${jg.nombre}</td>
                <td class='align-middle'>${jg.categoria}</td>
                <td class='align-middle d-none d-md-table-cell'>${jg.descripcion}</td>
                <td>
                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#ModalJuego" onclick='mostrarEditarJuegoModal(${jg.codigo})' ><i class="fa-regular fa-pen-to-square"></i></button>  
                <button class="btn btn-danger"  onclick='borrarJuegos(${jg.codigo})'><i class="fa-solid fa-delete-left"></i></button> 
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

//funcion editar juegos
function mostrarEditarJuegoModal(codigo) {
  const juego = juegos.find((gam) => gam.codigo === codigo.toString());

  document.querySelector("#nombreEditar").value = juego.nombre;
  document.querySelector("#categoriaEditar").value = juego.categoria;
  document.querySelector("#descripcionEditar").value = juego.descripcion;

  formJuegosEditar.setAttribute("data-id", codigo);
}

//funcion cuando se eecuta el submit del modalEditar
function editarJuegos() {
  const nombreEditar = document.querySelector("#nombreEditar").value;
  const categoriaEditar = document.querySelector("#categoriaEditar").value;
  const descripcionEditar = document.querySelector("#descripcionEditar").value;

  //expresion regular para validar nombre
  const validarNombre = /^[a-zA-Z]+$/;
  const resultadoValidacionNombre = validarNombre.test(nombreEditar);

  if (
    nombreEditar === "" ||
    categoriaEditar === "" ||
    descripcionEditar === ""
  ) {
    error("Todos los campos son obligatorios");
    return;
  } else if (!resultadoValidacionNombre) {
    error(
      "Ingrese un nombre que no contenga signos, numeros ni caracteres especiales"
    );
    return;
  } else {
    Swal.fire({
      icon: "success",
      text: "Editado exitosamente!",
    });

    const Codigo = formJuegosEditar.getAttribute("data-id");

    const juegoIndex = juegos.findIndex(function (juegoss) {
      return juegoss.codigo === Codigo;
    });

    juegos[juegoIndex].nombre = nombreEditar;
    juegos[juegoIndex].categoria = categoriaEditar;
    juegos[juegoIndex].descripcion = descripcionEditar;

    document.querySelector("#ModalJuego").style.display = "none";

    localStorage.setItem("juegos", JSON.stringify(juegos));
    cargarTablaUsuario();
  }
}

// funcion borrar juegos
function borrarJuegos(codigo) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, borrarlo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Filtrar los juegos para excluir el juego con el código proporcionado
      juegos = juegos.filter(function (juego) {
        return juego.codigo != codigo;
      });

      localStorage.setItem("juegos", JSON.stringify(juegos));
      // Actualizar la tabla después de borrar el juego
      cargarTablaJuego();

      Swal.fire("Borrado", "El juego ha sido borrado", "success");
    }
  });
}

// funcion borrar usuario
function borrarUsuario(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, borrarlo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Filtrar los usuarios para excluir el usuario con el id proporcionado
      usuarios = usuarios.filter(function (usuario) {
        return usuario.id !== id.toString();
      });

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      // Limpiar la tabla de usuarios antes de volver a cargar
      tablaUsuario.innerHTML = "";
      // Actualizar la tabla después de borrar el usuario
      cargarTablaUsuario();

      Swal.fire("Borrado", "El usuario ha sido borrado", "success");
    }
  });
}
