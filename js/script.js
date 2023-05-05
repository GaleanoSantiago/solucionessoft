/*--------------Barra de Navegacion--------------*/
const menu = document.getElementById("menu");
const itemInicio = document.getElementById("itemInicio");
const itemServicios = document.getElementById("itemServicios");
const itemNosotros = document.getElementById("itemNosotros");
const itemContact = document.getElementById("itemContacto");
const itemsMenu = document.querySelectorAll(".nav-link");
// ------------------ Formulario --------------------
const form = document.getElementById("formulario");

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



    if(posicionInicio<(tamanoDePantalla/3) && posicionServices>(tamanoDePantalla/3.2)){
        itemInicio.classList.add("active-item");
    }else{
        itemInicio.classList.remove("active-item");

    }
    if(posicionServices<(tamanoDePantalla/3.2) && posicionUs>(tamanoDePantalla/5)){
        itemServicios.classList.add("active-item");
    }else{
        itemServicios.classList.remove("active-item");
        
    }
    if(posicionUs<(tamanoDePantalla/5) && posicionContact>(tamanoDePantalla/5)){
        itemNosotros.classList.add("active-item");
    }else{
        itemNosotros.classList.remove("active-item");
    }
    if(posicionContact<(tamanoDePantalla/5)){
        itemContact.classList.add("active-item");
    }else{
        itemContact.classList.remove("active-item");
    }
}
