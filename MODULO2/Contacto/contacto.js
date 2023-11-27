const $form = document.querySelector('#form')
const buttonMailto = document.querySelector('#boton')
const linkboton = document.querySelector("#linkboton")

$form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this) 
    console.log(form.get("name"))   
    linkboton.setAttribute('href', `Mailto:rollinggames@gmail.com?subject=${form.get('name',)}${form.get('email')}&body=${form.get('message')}`)
    linkboton.click() 
}
