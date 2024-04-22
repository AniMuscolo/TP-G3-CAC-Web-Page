/*Funcionalidad NavBar*/

document.addEventListener("DOMContentLoaded", () => {
    //Seleccionamos elementos del DOM
    const toogleButton = document.querySelector(".navbar-toogle-boton");
    const movilMenu = document.querySelector(".navbar-menu-movil");

    //si el menu movil esta oculto (none o vacio) lo cambia a "flex"
    //Si el menu movil esta visible, lo oculta cambiando a "none"
    const toogleMenu = () => {
        movilMenu.style.display =
            movilMenu.style.display === "none" || movilMenu.style.display === ""
                ? "flex"
                : "none";
    };

    const ocultarMenuResize = () => {
        movilMenu.style.display = "none"
    }

    toogleButton.addEventListener("click", toogleMenu); // cuando se hace click en los puntos se despliega el menu
    window.addEventListener("resize", ocultarMenuResize); // cuando se agranda la pagina se oculta ese menú
    window.addEventListener("load", ocultarMenuResize); //para ocultar el menu de los puntos cuando se actualiza la pagina
});

/* Funcionalidad carrousel */

document.addEventListener("DOMContentLoaded", () => {
    const fotosCarrousel = document.querySelectorAll(".carrousel-seccion-slide");

    const botonPrevio = document.querySelector(".carrousel-control-previa");

    const botonProximo = document.querySelector(".carrousel-control-proximo");

    let fotoActualIndice = 0;

    const mostrarFoto = (index) => {
        fotosCarrousel.forEach(fotos => fotos.classList.remove("contenido"));
        fotosCarrousel[index].classList.add("contenido");
    }


    const cambiarFoto = (increment) => {
        fotoActualIndice = (fotoActualIndice + increment + fotosCarrousel.length) % fotosCarrousel.length;
        mostrarFoto(fotoActualIndice);
    }

    botonProximo.addEventListener("click", (event) => {  //para cambiar a foto siguiente en carrousel
        event.preventDefault();
        cambiarFoto(1);
    })

    botonPrevio.addEventListener("click", (event) => {  // para cambiar a foto anterior en carrousel
        event.preventDefault();
        cambiarFoto(-1);
    })

    const autoDesplazamiento = () => {       // para que las fotos se deslicen automaticamente
        cambiarFoto(1, "carrousel-control-proximo");
    }

    let autoDesplazamientoIntervalo = setInterval(autoDesplazamiento, 4000)  // intervalo de tiempo que dura la foto a la vista
});

/* Funcionalidad Slide Testimonios */

document.addEventListener("DOMContentLoaded", () => {
    const testimonioSlide = document.querySelectorAll(".testimonios-tarjeta");

    const botonPrevio = document.querySelector(".testimonios-control-previa");

    const botonProximo = document.querySelector(".testimonios-control-proximo");

    let TestimonioActualIndice = 0;

    const mostrarTestimonio = (index) => {
        testimonioSlide.forEach(testimonio => testimonio.classList.remove("contenido"));
        testimonioSlide[index].classList.add("contenido");
    }

    const cambiarTestimonio = (increment) => {
        TestimonioActualIndice = (TestimonioActualIndice + increment + testimonioSlide.length) % testimonioSlide.length;
        mostrarTestimonio(TestimonioActualIndice);
    }

    botonProximo.addEventListener("click", (event) => {   // para cambiar a testimonio siguiente
        event.preventDefault();  
        cambiarTestimonio(1);
    })

    botonPrevio.addEventListener("click", (event) => {  // para volver a testimonio anterior
        event.preventDefault();
        cambiarTestimonio(-1);
    })

    const autoDesplazamiento = () => {     // para que los testimonios se deslicen automaticamente
        cambiarTestimonio(1, "testimonios-control-proximo");
    }

    let autoDesplazamientoIntervalo = setInterval(autoDesplazamiento, 8000)   // intervalo de tiempo que dura el testimonio a la vista

});

/* Funcionalidad Carrito de compras */

const botonCarrito = document.querySelector(".navbar-carrito-icon");
const contenedorProductosCarrito = document.querySelector(".container-carrito-productos");


const carritoInfo = document.querySelector(".carrito-producto");

const agregarProducto = document.querySelector(".carga-producto");


const botonCancelar = document.querySelector(".icono-cancela-compra");

const listaPlanes = document.querySelector(".planes-seccion-compra-container"); //lista de todos los containers de planes

let productosTotales = []; // variable con array que incluye el total de productos que se agreguen al carrito

const valorTotalCarrito = document.querySelector(".total-pagar");

const contarProductos = document.querySelector("#contador-productos");

const carritoVacio = document.querySelector(".carrito-vacio");

const totalProductosCarrito = document.querySelector(".total-carrito");


botonCarrito.addEventListener("click", () => {                // para abrir o esconder el contenido del carrito
    contenedorProductosCarrito.classList.toggle("hidden-cart");
});


listaPlanes.addEventListener("click", event => {
    if (event.target.classList.contains("boton-comprar-planes")) {   // al hacer click en el plan que se desea comprar, se agrega al carrito
        const plan = event.target.parentElement;

        const informacionPlan = {
            cantidad: 1,
            titulo: plan.querySelector("h2").textContent,
            precio: plan.querySelector(".precio").textContent,
        };

        const productoExistente = productosTotales.some(
            plan => plan.titulo === informacionPlan.titulo); // si ya existe un producto con ese titulo en el carrito lo suma al numero de productos con ese mismo titulo y no lo agrega aparte

        if (productoExistente) {
            const planes = productosTotales.map(plan => {
                if (plan.titulo === informacionPlan.titulo) {
                    plan.cantidad++;
                    return plan;
                } else {
                    return plan;
                }
            });
            productosTotales = [...planes];
        } else {
            productosTotales = [...productosTotales, informacionPlan]; // agregamos la informacion y el total de productos agregados al array, el operador "..." esparce en el arreglo la informacion que le pedimos, para contar la cantidad de veces que se agreguen productos al carrito junto con su informacion
        }

        mostrarCarrito();
    }

});

agregarProducto.addEventListener("click", event => {
    if (event.target.classList.contains("icono-cancela-compra")) {    //para que al apretar la cruz se borren los elementos del carrito
        const producto = event.currentTarget.parentElement;
        const titulo = producto.querySelector(".titulo-producto-carrito").textContent.trim(); //con el "trim" eliminamos espacios en blanco que haya quedado alrededor del titulo, daba error antes y con esto se solucionó

        const indice = productosTotales.findIndex(plan => plan.titulo.trim() === titulo.trim()); // usamos "trim" por lo mismo aca y "findIndex()"" para encontrar el índice del producto que queremos eliminar del carrito
        if (indice !== -1) {
            productosTotales.splice(indice, 1); //usamos "splice()" para eliminar el producto del carrito una vez que encontramos su índice
            mostrarCarrito();
        } else {
            console.error("No se encontró el producto en el carrito.");
        }
    }
});


const mostrarCarrito = () => {    // para crear el carrito y que todos esos productos se vean dentro de él

    if(!productosTotales.length){
        carritoVacio.classList.remove("hidden");
        agregarProducto.classList.add("hidden");
        totalProductosCarrito.classList.add("hidden");
    } else {
        carritoVacio.classList.add("hidden");
        agregarProducto.classList.remove("hidden");
        totalProductosCarrito.classList.remove("hidden");
    }


    agregarProducto.innerHTML = ""; //limpiar carrito para que quede vacío al querer realizar nueva compra

    let precioTotal = 0;
    let totalDePlanesAgregados = 0;

    productosTotales.forEach(plan => {
        const contenedorProductos = document.createElement("div") //creamos el div que luego va a contener al carrito con los productos
        contenedorProductos.classList.add("carrito-producto")
        contenedorProductos.innerHTML = `
        <div class="info-carrito-producto">
            <span class="cantidad-producto-carrito"> ${plan.cantidad} </span>
            <p class="titulo-producto-carrito"> ${plan.titulo} </p>
            <span class="precio-producto-carrito"> ${plan.precio} </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="icono-cancela-compra">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
        `; // insertamos la estructura HTML del contenido del carrito 

            agregarProducto.append(contenedorProductos); //para ir añadiendo los productos al carrito

            precioTotal = precioTotal + parseInt(plan.cantidad * plan.precio.slice(1)); //"Parseint" para convertirlo a entero, porque era un string y "slice" para sacar el simbolo "pesos". Multiplicamos el valor de cada plan por cada plan agregado asi nos da el total
            totalDePlanesAgregados = totalDePlanesAgregados + plan.cantidad;
        });

        valorTotalCarrito.innerText = ` $${precioTotal} `;
        contarProductos.innerText = totalDePlanesAgregados;
};    


// Uso de modals
const modales = document.querySelectorAll('.modal');
const botonesCerrar = document.querySelectorAll('.modal button');
const enlaces = document.querySelectorAll('a[data-modal]');

function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('modal-activo');
}

function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('modal-activo');
}

enlaces.forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = e.target.dataset.modal;
    abrirModal(modalId);
  });
});

botonesCerrar.forEach(boton => {
  boton.addEventListener('click', () => {
    const modalId = boton.parentNode.parentNode.id;
    cerrarModal(modalId);
  });
});

// lo unico que pasa es que al cambiar de página el carrito se vacía automaticamente. Me fije como hacer pero creo que para eso ya hay que usar Back end, porque hay que almacenarlo en un storage con archivo json, etc. Asi que por ahora lo dejo asi.

// También faltaría que cuando se clickea en comprar carrito nos lleve a algun lado tipo: opciones de pago : tarjeta, pay pal, transferencia, etc, eso falta

// hice el estilo de la lupa y buscador con css y hover pero no se si quieren darle funcionalidad, o sea que busque palabras dentro de nuestra página. Eso faltaría hacer

