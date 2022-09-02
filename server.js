const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes/product");
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    header: "Access-Control-Allow-Origin: *",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Some custom error!!");
});

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto http://localhost:8080/");
});
