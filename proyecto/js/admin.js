const tablaUsuario = document.querySelector("#tablaUsuario");
const formularioProducto = document.querySelector("#formularioProducto");
const tablaProducto = document.querySelector("#tablaProducto");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));


let productos = [];

//evento
formularioProducto.addEventListener('submit', crearProducto);

class producto {
	constructor(id,nombre, precio, descripcion) {
		this.id= id;
		this.nombre = nombre;
		this.precio = precio;
    this.descripcion = descripcion;
	}
}


//mostrar los usuarios en la tabla
function cargarTablaUsuario() {
  usuarios.map(function (usuario) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
                <td class="row">${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>`;

    tablaUsuario.appendChild(tr);
  });
}

cargarTablaUsuario();

function crearProducto (e){
  e.preventDefault();

const id = Date.now();
const nombre = document.querySelector("#nombre").value;
const precio = document.querySelector("#precio").value;
const descripcion = document.querySelector("#descripcion").value;

//validacioness 
if(nombre == "" || precio == "" || descripcion =="" ){
  error("Los campos no pueden estar vacios");
  } else if (precio < 0) {
   error("El precio no puede ser negativo");
 } else if (descripcion.length > 600) {
  error("la descripcion debe tener menor de 600 caracteres ")
  }else {
Swal.fire({
  position: "top-center",
  icon: "success",
  title: "Producto Cargado Correctamente",
  showConfirmButton: false,
  timer: 2500
});

  }

  const newproduct = new producto (id,nombre,precio,descripcion);

  productos.push(newproduct);

  localStorage.setItem("productos" ,JSON.stringify(productos) )

  formularioProducto.reset();  

}



function cargarTablaProducto() {
  productos.map(function (producto) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
                <td class="row">${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.descripcion}</td>`;

    tablaProducto.appendChild(tr);
  });
}

 cargarTablaProducto () ;

function error (mensaje){
   parrafo.textContent = mensaje;

   setTimeout(() => {
    parrafo.textContent ="";
    
   }, 6000);
}




