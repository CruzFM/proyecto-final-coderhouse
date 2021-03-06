// Crea carrito de compras a través de una lista parcialmente vacía.

let carritoCompras = [];

let botonFiltroProductos = $('#botonFiltroProductos');

let botonFiltroBanda = $('#botonFiltroBanda');

let botonFiltroPrecio = $('#botonFiltroPrecio');

let botonFinalizarCompra = $('#finalizarCompra');

// Crea array de objetos. Contiene cada uno de los objetos disponibles en la página.
const stockProductos = [];

const contenedorProductos = document.getElementById("contenedorProductos");

const contenedorDeCarrito = document.getElementById("carritoCompras");

const cantidadProductos = document.getElementById("numeroEnCarrito");

const precioTotal = document.getElementById("precioTotal");

const header = document.querySelector("#header");

const topeOfNav = header.offsetHeight;

const botonRemera = $('#botonRemera');

const botonBuzo = $('#botonBuzo');

const botonAccesorio = $('#botonAccesorio');

const botonEluveitie = $('#botonEluveitie');

const botonSabaton = $('#botonSabaton');

const botonWT = $('#botonWT');

const limpiarFiltros = $('#limpiarFiltros');

const botonPrecioMayor = $('#botonPrecioMayor');

const botonPrecioMenor = $('#botonPrecioMenor');

$.getJSON("productos.JSON", function (response) {
  response.forEach((elemento) => {
    stockProductos.push(elemento);
  });
mostrarProducts(stockProductos);
});

// Realiza un filtro de los productos por tipo

// Filtro por tipo: remera
botonRemera.click( ()=>{
  mostrarProducts(stockProductos.filter(elemento => elemento.tipo === "Remera"))
});

// Filtro por tipo: Buzo
botonBuzo.click( () => {
  mostrarProducts(stockProductos.filter(elemento => elemento.tipo === "Buzo"))
});

// Filtro por tipo: Accesorio
botonAccesorio.click( ()=>{
  mostrarProducts(stockProductos.filter(elemento => elemento.tipo === "Accesorio"))
});


// Realiza filtro por banda (grupo musical al que pertenece el producto)

// Filtro por banda: Eluveitie
botonEluveitie.click( ()=> {
  mostrarProducts(stockProductos.filter(elemento => elemento.banda === "Eluveitie"))
});

// Filtro por banda: Sabaton
botonSabaton.click( ()=>{
  mostrarProducts(stockProductos.filter(elemento => elemento.banda === "Sabaton"))
});

// Filtro por banda: Within Temptation
botonWT.click( ()=> {
  mostrarProducts(stockProductos.filter(elemento => elemento.banda === "Within Temptation"))
});

// Limpia los filtros anteriores, mostrando el array de productos completo.
limpiarFiltros.click( ()=>{
  mostrarProducts(stockProductos);
})

//Ordena los productos de mayor a menor
botonPrecioMayor.click( ()=> {
  mostrarProducts(stockProductos.sort((a,b) => b.precio - a.precio))
})

//Ordena los productos de menor a mayor
botonPrecioMenor.click( () => {
  mostrarProducts(stockProductos.sort((a,b) => a.precio - b.precio))
})

// Muestra el array de productos en el HTML

function mostrarProducts(array) {
  contenedorProductos.innerHTML='';
  array.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("col-3");
    div.classList.add("col-lg-4");
    div.classList.add("col-md-6");
    div.classList.add("col-sm-12");
    div.classList.add("estiloCard");
    div.innerHTML += `  <div class="card">
                                <img src="${producto.img}" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h3>${producto.nombre}</h3>
                                    <h4>${producto.banda}</h4>
                                    <p class="card-text">$${producto.precio}</p>
                                    <div>
                                    <a id="botonAgregar${producto.id}" class="btn btn-primary">
                                    <img src="./images/agregar-carrito-COLORNEGRO.png" alt="Añadir al carrito" id="añadirCarrito">
                                    </a>
                                    </div>
                                </div>
                            </div> `;
    contenedorProductos.appendChild(div);

    // toma el boton, que se identificara por cada id.
    let boton = document.getElementById(`botonAgregar${producto.id}`);

    boton.addEventListener("click", () => {
      // agrega productos seleccionados a través del botón al carrito de compras
      agregarAlCarrito(`${producto.id}`);
    });
  });
}

function agregarAlCarrito(id) {
  let repetido = carritoCompras.find((elemento) => elemento.id == id);
  if (repetido) {
    repetido.cantidad = repetido.cantidad + 1;
    document.getElementById(
      `cantidad${repetido.id}`
    ).innerHTML = `<span id="cantidad">${repetido.cantidad}</span>`;
    actualizacionCarrito();
  } else {
    let agregarProducto = stockProductos.find((elemento) => elemento.id == id);

    // agrega producto al array de carrito de compras
    carritoCompras.push(agregarProducto);
    actualizacionCarrito();

    let div = document.createElement("div");
    div.classList.add("productoCarrito");
    div.innerHTML += `   <div class="estiloProductoEnCarrito">   
                                <p>${agregarProducto.nombre}</p>
                                <p>Cantidad: <span id="cantidad${agregarProducto.id}">${agregarProducto.cantidad}</span></p>
                                <p>$${agregarProducto.precio}</p>
                                <a id="botonEliminar${agregarProducto.id}" class="btn btn-primary">
                                <img src="./images/trash.png" alt="Eliminar del carrito" class="eliminarCarrito">
                                </a>
                            </div>`;
    contenedorDeCarrito.appendChild(div);

    // agrega funcionaliadad al boton para eliminar productos del carrito
    let botonEliminar = document.getElementById(
      `botonEliminar${agregarProducto.id}`
    );
    botonEliminar.addEventListener("click", () => {
      if (agregarProducto.cantidad == 1) {
        // cuando se clickea, elmina un producto del carrito en html.
        botonEliminar.parentElement.remove();

        // cuando se clickea, devuelve el array con todos los productos, menos el que contenía el botón eliminar que se clickeó.
        carritoCompras = carritoCompras.filter(
          (elemento) => elemento.id != agregarProducto.id
        );
      } else {
        // Si hay un producto con más de una cantidad, se elimina de a uno al clickear en el botón de eliminación.
        agregarProducto.cantidad = agregarProducto.cantidad - 1;

        // se imprime dicha elminación en el HTML.
        document.getElementById(
          `cantidad${agregarProducto.id}`
        ).innerHTML = `<span id="cantidad${agregarProducto.id}">${agregarProducto.cantidad}</span>`;
      }

      // Para que cada vez que se elimine un producto, se imprima en el html
      // Tanto en precio, como en cantidad de productos.
      actualizacionCarrito();
    });
  }
}

// Actualiza la cantidad en el carrito de compras, cuando se suman productos
// o cuando se eliminan.
function actualizacionCarrito() {
  cantidadProductos.innerText = carritoCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );

  // Guarda todos los cambios hechos al array CarritoCompras en el Local Storage:
  // desde agregado de productos, hasta eliminación de los mismos.
  localStorage.setItem("keyProductosCarrito", JSON.stringify(carritoCompras));
}

// función que muestra la lista que contiene los filtros por PRODUCTOS
botonFiltroProductos.click( ()=> {
  if($('#listaFiltroProductos').css("display") === "none"){
    $('#listaFiltroProductos').show();
  } else {
    $('#listaFiltroProductos').hide()
  }
});

// función que muestra la lista que contiene los filtros por BANDA
botonFiltroBanda.click( ()=> {
  if($('#listaFiltroBanda').css("display") === "none"){
    $('#listaFiltroBanda').show();
  } else {
    $('#listaFiltroBanda').hide()
  }
})

// función que muestra la lista que contiene los filtros por PRECIO
botonFiltroPrecio.click( ()=>{
  if($('#listaFiltroPrecio').css("display") === "none"){
    $('#listaFiltroPrecio').show();
  } else {
    $('#listaFiltroPrecio').hide()
  }
})


// Modo oscuro

let darkMode;

if (localStorage.getItem('darkMode')){
  darkMode = localStorage.getItem('darkMode');
} else {
  darkMode = 'light';
}

localStorage.setItem('darkMode', darkMode);

$(()=> {
  if (localStorage.getItem('darkMode') == "dark") {
    $('body').addClass('darkMode');
    $('#darkModeButton').hide();
    $('#lightModeButton').show();
  } else {
    $('#lightModeButton').hide();
  }

  $('#darkModeButton').click( ()=>{
    $('body').addClass("darkMode");
    $('#darkModeButton').hide();
    $('#lightModeButton').show();
    localStorage.setItem('darkMode', "dark");
  });

  $('#lightModeButton').click( ()=>{
    $('#lightModeButton').hide();
    $('#darkModeButton').show();
    $('body').removeClass("darkMode")
    localStorage.setItem('darkMode', "light");
  })

} )


// Finalizar compra

botonFinalizarCompra.click( ()=> {
  if (carritoCompras.length >= 1) {
    localStorage.setItem('compra', JSON.stringify(carritoCompras))
    alert("¡Gracias por confiar en nosotros! En breve recibirá su compra.");
  }else {
    alert("No ha cargado ningún producto!");
  }
})
