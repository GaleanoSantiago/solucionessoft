/*--------------Barra de Navegacion--------------*/
const menu = document.getElementById("menu");
const itemInicio = document.getElementById("itemInicio");
const itemServicios = document.getElementById("itemServicios");
const itemNosotros = document.getElementById("itemNosotros");
const itemContact = document.getElementById("itemContacto");
const itemsMenu = document.querySelectorAll(".nav-link");
// ------------------ Formulario --------------------
const form = document.getElementById("formulario");
//Seleccionas todos los inputs dentro del formulario
const inputs = form.querySelectorAll('input'); 
const textarea = form.querySelector('textarea');
// Expresion regular para el correo
const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validarForm = (event)=>{
    event.preventDefault();

    let hayErrores = false;

    //Iteras sobre los inputs y hacer las validaciones
    inputs.forEach(input => {
        // span para mostrar error debajo de los inputs
        const spanError = input.nextElementSibling;

        // Verifica que los inputs no esten vacios
        if (input.value.trim() === '') {
              spanError.classList.add('form-text',"text-danger");
              spanError.innerText = 'Este campo es obligatorio.';
              input.style.border = '1px solid red';
            hayErrores = true;

        // Verifica que el input email tenga el valor correcto
          }else if(input.type === 'email' && !correoRegex.test(input.value)) {
            spanError.classList.add('form-text', 'text-danger');
            spanError.innerText = 'Ingrese un correo electrónico válido.';
            input.style.border = '1px solid red';
            hayErrores = true;

        // Verifica que el input nombre no contenga numeros
          }else if (input.id === 'nombre' && /\d/.test(input.value)) {
            spanError.classList.add('form-text', 'text-danger');
            spanError.innerText = 'No se permiten números en este campo.';
            input.style.border = '1px solid red';
            hayErrores = true;

        // Si ninguna de las anteriores condiciones son verdaderas, significa que todo esta bien
          }else{
              spanError.classList.remove('form-text',"text-danger");
              spanError.innerText = '';
              input.style.border = ''; 
          }
    });
    // span para mostrar error en el textarea
    const spanErrorTextarea = textarea.nextElementSibling;
    
    // Verifica que el textarea no este vacio
    if(textarea.value.trim() === ''){
        spanErrorTextarea.classList.add('form-text',"text-danger", "mb-1");
        spanErrorTextarea.innerText = 'Este campo es obligatorio.';
        textarea.style.border = '1px solid red'; 
        hayErrores = true;
    }else{
        spanErrorTextarea.classList.remove('form-text',"text-danger", "mb-1");
        spanErrorTextarea.innerText = '';
        textarea.style.border = ''; 
    }
    
    if(!hayErrores){
        // Envia el correo
        handleSubmit();
    }
}

form.addEventListener("submit", validarForm);

addEventListener("scroll",()=>{
    
    //scroll para que el menu se fije en el top de la pantalla
    
    const heightScreen = 600;
    let pixel = window.scrollY;
    
    if(pixel>heightScreen){
        menu.classList.add("fixed")
    }else{
        menu.classList.remove("fixed");
    }

    // Para activar los items del menu
    let tamanoDePantalla=window.innerHeight;
    activarItemsMenu(tamanoDePantalla);

})



const activarItemsMenu = (tamanoDePantalla)=>{
    const inicio = document.getElementById("inicio");
    const servicios = document.getElementById("servicios");
    const nosotros = document.getElementById("nosotros");
    const contacto = document.getElementById("contacto");



    let posicionInicio=inicio.getBoundingClientRect().top;
    let posicionServices=servicios.getBoundingClientRect().top;
    let posicionUs=nosotros.getBoundingClientRect().top;
    let posicionContact=contacto.getBoundingClientRect().top;

    let secciones=[posicionInicio, posicionServices, posicionUs, posicionContact];
    // console.log(secciones);


    // if(posicionInicio<(tamanoDePantalla/3) && posicionServices>(tamanoDePantalla/3.2)){
    //     itemInicio.classList.add("active-item");
    // }else{
    //     itemInicio.classList.remove("active-item");

    // }
    // if(posicionServices<(tamanoDePantalla/3.2) && posicionUs>(tamanoDePantalla/5)){
    //     itemServicios.classList.add("active-item");
    // }else{
    //     itemServicios.classList.remove("active-item");
        
    // }
    // if(posicionUs<(tamanoDePantalla/5) && posicionContact>(tamanoDePantalla/5)){
    //     itemNosotros.classList.add("active-item");
    // }else{
    //     itemNosotros.classList.remove("active-item");
    // }
    // if(posicionContact<(tamanoDePantalla/5)){
    //     itemContact.classList.add("active-item");
    // }else{
    //     itemContact.classList.remove("active-item");
    // }

    for(let i=0; i<secciones.length; i++){
        if(secciones[i]<(tamanoDePantalla/4) && secciones[i+1]>(tamanoDePantalla/4)){
            itemsMenu[i].classList.add("active-item");
        }else{
            itemsMenu[i].classList.remove("active-item");
        }
        if(secciones[secciones.length - 1]<(tamanoDePantalla/4)){
            itemsMenu[itemsMenu.length - 1].classList.add("active-item");
        }else{
            itemsMenu[itemsMenu.length - 1].classList.remove("active-item");
        }
           
    }

}

async function handleSubmit() {
    // event.preventDefault();
    const formulario = new FormData(form);
    const response = await fetch(form.action, {
    method: form.method,
    body: formulario,
    headers: {
            'Accept': 'application/json'
    }
        });
        // Si funciona
    if (response.ok) {
        // Activa el alert de correo enviado
        alert("Correo Enviado");

        // Vacia los inputs y el textarea
        inputs.forEach(input=>{
            input.value="";
        });
        textarea.value="";
    }
}

// Api del mapa

function initMap() {
    // Creamos un objeto geocoder para obtener las coordenadas de la dirección
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': '-26.178939, -58.184488' }, function(results, status) {
        if (status === 'OK') {
        // Creamos un objeto mapa centrado en las coordenadas obtenidas
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: results[0].geometry.location
        });
        // Agregamos un marcador en las coordenadas obtenidas
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        } else {
        alert('No se pudo obtener la dirección: ' + status);
        }
    });
    }
    // Llamamos a la función initMap cuando se cargue la página
    window.onload = initMap;
    