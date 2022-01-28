const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const DB_URI = process.env.DB_MONGO_URI;

const Router = require("./routes/router");
const app = Express();

mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("conectado no banco")
);

app.use(cors());
app.use(Express.json());
app.use(Router);

app.listen(8080, () => console.log("server running"));
