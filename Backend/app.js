const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");
const errorController = require("./controllers/error");

const app = express();

const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(userRoutes);
app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log("result", result);
    app.listen(8000);
  })
  .catch((err) => console.log(err));