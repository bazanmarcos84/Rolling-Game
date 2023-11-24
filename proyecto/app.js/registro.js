class Usuario {
    constructor(id,name,mail,passw){
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.passw = passw;        
    }
}


//traemos la etiqueta del formulario

const validarUsuario = document.getElementById('validarUsuario')

const formError = document.getElementById('formError')

// arreglo que amacena a todos los usuarios

let usuarios = [];

//evento que se ejecuta bien se carga la pagina
document.addEventListener("DOMContentLoaded", function(){
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
})
//la funcion de validar registro

validarUsuario.addEventListener('submit', validarRegistro)

//validaciones

function validarRegistro(e) {
    e.preventDefault();

    const id = Date.now();
    const name = (document.querySelector("#name")).value;
    const mail = document.querySelector("#mail").value;
    const passw = document.querySelector("#passw").value;
    const confirmPassw = document.querySelector("#confirmPassw").value;
    
    const validarEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const resultadoValidacion = validarEmail.test(mail);

    if (name === '' || mail === '' || passw === '' || confirmPassw === '') {
        mostrarError("Todos los campos son obligatorios");
    } else if (!resultadoValidacion) {
        mostrarError("Email inválido");
    } else if( passw.length <6 ){
        mostrarError("la contraseña debe ser mayor a 6 caracteres")
    } else if (passw !== confirmPassw){
        mostrarError("contraseña y confirmar contraseña deben ser iguales")
    }else {
        mostrarMensajeExitoso("Registro exitoso");
    }
    const existeEmail = usuarios.find(function (usuario){
        return usuario.mail === mail
    })
    
    if(existeEmail !== undefined){
        mostrarError("Usuario existente")
    } else{
    //guardamos los datos del usuario
    const newUser = new Usuario( id, name, mail, passw)
    
    usuarios.push(newUser);

    localStorage.setItem("usuarios", JSON.stringify(usuarios))    
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
