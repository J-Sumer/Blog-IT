// Imports
const app = require("express")();

//Import routes
const authRoutes = require("./routes/auth.js");

//Middleware
app.use("/api", authRoutes);

// Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
