const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const routerApi = require("./routes");

/* Puerto a ocupar */
app.listen(port, () => console.log("Active port ", port));

/* Crear middleware para que la salida del HTTP muestre un JSON */
app.use(express.json());

/* Conexión con BD mongo */
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Success connection with mongo"))
  .catch((error) => console.log(error));

/* Pasar parametro de express a la función routerApi de routes */
routerApi(app);
