const express = require("express");
const port = 8005;
const path = require("path");
const dbconnect = require("./config/dbconnection");
const movieRoutes = require("./routes/movie.routes");

const app = express();

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection
dbconnect();

// Routes
app.use("/", movieRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});