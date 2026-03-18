const express = require("express");
const app = express();
require("dotenv/config");
const authMiddleware = require("./middleware/authMiddleware");


const conn = require("./db/conn");

const cors = require("cors");
app.use(cors());
app.use(express.json());

const api = process.env.API_URL;

const bodyParser = require("body-parser");

const morgan = require("morgan");

app.use(bodyParser.json());
app.use(morgan("tiny"));

const clientsRoutes = require("./routes/clientsRoutes");
const petsRoutes = require("./routes/petsRoutes");
const vetsRoutes = require("./routes/vetsRoutes");
const proceduresRoutes = require("./routes/proceduresRoutes");
const consultationsRoutes = require("./routes/consultationsRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(`${api}/clients`, authMiddleware, clientsRoutes);
app.use(`${api}/pets`, petsRoutes);
app.use(`${api}/vets`, vetsRoutes);
app.use(`${api}/procedures`, proceduresRoutes);
app.use(`${api}/consultations`, consultationsRoutes);
app.use(`${api}/auth`, authRoutes);
    
app.listen(5000, () => {
  console.log("server is running 5000");
});
