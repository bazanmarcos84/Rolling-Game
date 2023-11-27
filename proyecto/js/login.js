
const validarUsuario = document.getElementById("validarUsuario");

validarUsuario.addEventListener("submit", validarlogin);

let usuarios = JSON.parse(localStorage.getItem("usuarios"));


function validarlogin(e){
    e.preventDefault();

    const mail = document.getElementById("mail").value;
    const passw = document.getElementById("passw").value;

    const validarEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const resultadoValidacion = validarEmail.test(mail);
    

    //validaciones
    if(mail === "" || passw === ""){
        mostrarError("Todos los campos son obligatorios");
    }else if(!resultadoValidacion){
        mostrarError("Email invalido");

    }    //comprobar si el mail ya esta registrado
    const existeEmail = usuarios.find(function(usuario){
        return usuario.mail === mail;
    });
        
    if (existeEmail !== undefined){
        if(existeEmail.passw.trim() === passw.trim()){
            return window.location.href="http://127.0.0.1:5500/proyecto/home.html";
        }else {
            mostrarError("Correo o contraseña incorrecto!");
        }
    }else {
        mostrarError("Correo o contraseña incorrecto!");
    }
    if(existeEmail === mail.admin@admin.com){
         if(mail.admin@admin.com = passw.admin)
        return window.location.href= "http://127.0.0.1:5500/proyecto/pages/admin.html"
     }
    
    validarUsuario.reset()
}



function mostrarError(mensaje) {
    // Mostrar mensaje de error con SweetAlert
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
    });
}

function mostrarMensajeExitoso(mensaje) {
    // Mostrar mensaje de éxito con SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: mensaje,
    });
}