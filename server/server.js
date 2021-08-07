// Imports
const app = require("express")();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to Mongodb"))
  .catch((err) => {
    console.log("Mongodb connection failure");
    console.log(err);
  });

//Import routes
const authRoutes = require("./routes/auth.js");
const { body } = require("express-validator");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({ origin: process.env.CLIENT_URL }));

//Middleware
app.use("/api", authRoutes);

// Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
