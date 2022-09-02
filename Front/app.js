import "regenerator-runtime/runtime";
import axios from "axios";

const url = "http://localhost:8080/api/product";
const urlCat = "http://localhost:8080/api/category";

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

//QUERY ALL PRODUCT
axios
  .get(url)
  .then((res) => mostrarContenido(res.data))
  .catch((error) => console.log(error));

//RENDER ALL PRODUCT
const mostrarContenido = (product) => {
  if (product) {
    product.forEach((item) => {
      resultados += `    <div class="card itemCard">

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

//------------------->

//QUERY ALL CATEGORY
axios
  .get(urlCat)
  .then((res) => mostrarLinks(res.data))
  .catch((error) => console.log(error));

//RENDER ALL CATEGORY
const mostrarLinks = (cat) => {
  cat.forEach((item) => {
    resultadosCategorias += `    
                             <li id="${item.id}" class="itemLink">${item.name}</li>
                        `;
  });
  contenedorNav.innerHTML = resultadosCategorias;

  const itemLink = document.querySelectorAll("#nav li");

  itemLink.forEach((item) => {
    item.addEventListener("click", (e) => {
      const id = e.target.id;

      resultados = "";
      contenedor.innerHTML = "";
      menu.classList.toggle("active");
      iconBars.classList.toggle("fa-close");
      axios
        .get(`http://localhost:8080/api/category/${id}`)
        .then((res) => mostrarCategory(res.data))
        .catch((error) => console.log(error));
    });

    const mostrarCategory = (product) => {
      product.forEach((item) => {
        resultados += `  
                         <div id="celda" class="card">
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
    };
  });
};

//LOGO HOME

iconHome.addEventListener("click", () => {
  resultados = "";
  contenedor.innerHTML = "";

  axios
    .get(url)
    .then((res) => mostrarContenido(res.data))
    .catch((error) => console.log(error));

  mostrarContenido();

  menu.classList.toggle("active");
  iconBars.classList.toggle("fa-close");
});

//BUSQUEDA HOME

let texto;

inputBuscar.addEventListener("keyup", (e) => {
  let valor = e.target.value;
  texto = new RegExp(valor, "i");
  const keycode = e.keyCode || e.which;
  if (keycode == 13) {
    let name = texto.source;
    resultados = "";
    contenedor.innerHTML = "";
    axios
      .get(`http://localhost:8080/api/search/product/${name}`)
      .then((res) => mostrarContenido(res.data))
      .catch((error) => console.log(error));
    inputBuscar.value = "";
    mostrarContenido();
  }
});

starSearch.addEventListener("click", () => {
  const name = texto.source;
  resultados = "";
  contenedor.innerHTML = "";
  axios
    .get(`http://localhost:8080/api/search/product/${name}`)
    .then((res) => mostrarContenido(res.data))
    .catch((error) => console.log(error));
  inputBuscar.value = "";
  mostrarContenido();
});
