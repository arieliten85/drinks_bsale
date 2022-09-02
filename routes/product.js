const express = require("express");
const routes = express.Router();
const pool = require("../db");

routes.get("/product", (req, res) => {
  pool.query("SELECT * FROM product", (error, filas) => {
    if (error) {
      throw error;
    } else {
      res.send(filas);
    }
  });
});

routes.get("/category", (req, res) => {
  pool.query("SELECT * FROM category", (error, filas) => {
    if (error) {
      throw error;
    } else {
      res.send(filas);
    }
  });
});

routes.get("/category/:id", (req, res) => {
  pool.query(
    "SELECT * FROM product WHERE category = ?",
    [req.params.id],
    (error, filas) => {
      if (error) {
        throw error;
      } else {
        res.send(filas);
      }
    }
  );
});

routes.get("/search/product/:name", (req, res) => {
  pool.query(
    `SELECT * FROM product WHERE name LIKE "%${req.params.name}%" `,
    (error, filas) => {
      if (error) {
        throw error;
      } else {
        res.send(filas);
      }
    }
  );
});

module.exports = routes;
