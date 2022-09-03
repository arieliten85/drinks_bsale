import axios from "axios";

//PRODUCTS

export function allProducts(fn) {
  return axios
    .get("http://localhost:8080/api/product")
    .then((res) => fn(res.data))
    .catch((error) => console.log(error));
}

export function searchProducts(fn, name) {
  return axios
    .get(`http://localhost:8080/api/search/product/${name}`)
    .then((res) => fn(res.data))
    .catch((error) => console.log(error));
}

//CATEGORY

export function allCategory(fn) {
  return axios
    .get("http://localhost:8080/api/category")
    .then((res) => fn(res.data))
    .catch((error) => console.log(error));
}

export function oneCategory(fn, id) {
  return axios
    .get(`http://localhost:8080/api/category/${id}`)
    .then((res) => fn(res.data))
    .catch((error) => console.log(error));
}
