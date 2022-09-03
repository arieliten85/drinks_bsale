import "regenerator-runtime/runtime";

import {
  allCategory,
  allProducts,
  oneCategory,
  searchProducts,
} from "./utils/querys";

let resultados = "";
let resultadosCategorias = "";
const contenedor = document.querySelector(".contenedor");
const contenedorNav = document.querySelector("#nav");
const inputBuscar = document.querySelector("#buscar");
const menu = document.querySelector(".menuSmall");
const iconBars = document.querySelector(".bars");
const iconHome = document.querySelector("#home");
const starSearch = document.querySelector("#starSearch");

//BARS
iconBars.addEventListener("click", (e) => {
  menu.classList.toggle("active");
  iconBars.classList.toggle("fa-close");
});

//RENDER ALL PRODUCT
const mostrarContenido = (product) => {
  if (product) {
    product.forEach((item) => {
      resultados += `    
                         <div id="celda" class="card  itemCard">
                             <div class="contenedorImg"> 
                               <img class="img" src=${item.url_image}>
                             </div>
                              <div>
                               <h3 class="titulo">${item.name}</h3>
                              </div>
                             <div>
                               <p> $ ${item.price}</p>
                             </div>

                             <div class="ButtonBuy">
                               <a href="#">Comprar</a>
                             </div>
                         </div>
                      `;
    });

    contenedor.innerHTML = resultados;
  }
};

//QUERY ALL PRODUCT
allProducts(mostrarContenido);

//RENDER ALL CATEGORY
const mostrarLinks = (cat) => {
  cat.forEach((item) => {
    resultadosCategorias += ` <li id="${item.id}" class="itemLink">${item.name}</li> `;
  });
  contenedorNav.innerHTML = resultadosCategorias;

  const itemLink = document.querySelectorAll("#nav li");

  //RENDER CATEGORY SELECT
  itemLink.forEach((item) => {
    item.addEventListener("click", (e) => {
      const id = e.target.id;
      resultados = "";
      contenedor.innerHTML = "";
      menu.classList.toggle("active");
      iconBars.classList.toggle("fa-close");
      oneCategory(mostrarContenido, id);
      mostrarContenido();
    });
  });
};

//QUERY ALL CATEGORY
allCategory(mostrarLinks);

//BUTTON HOME
iconHome.addEventListener("click", () => {
  resultados = "";
  contenedor.innerHTML = "";
  allProducts(mostrarContenido);
  mostrarContenido();
  menu.classList.toggle("active");
  iconBars.classList.toggle("fa-close");
});

//SEARCH
let texto;

inputBuscar.addEventListener("keyup", (e) => {
  let valor = e.target.value;
  texto = new RegExp(valor, "i");
  const keycode = e.keyCode || e.which;
  let name = texto.source;

  if (keycode == 13 && texto !== undefined && texto !== " ") {
    resultados = "";
    contenedor.innerHTML = "";
    inputBuscar.value = "";
    searchProducts(mostrarContenido, name);
    mostrarContenido();
  }
});

starSearch.addEventListener("click", () => {
  const name = texto.source;
  if (texto !== undefined) {
    resultados = "";
    contenedor.innerHTML = "";
    inputBuscar.value = "";
    searchProducts(mostrarContenido, name);
    mostrarContenido();
  }
});
