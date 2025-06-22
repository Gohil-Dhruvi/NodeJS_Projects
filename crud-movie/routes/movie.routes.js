// const express = require("express");
// const router = express.Router();
// const movieController = require("../controller/movie.controller");
// const Movie = require("../model/movie.model");

// router.get("/", movieController.getAllMovies); 
// router.get("/view", movieController.getAllMovies); 
// router.post("/add", Movie.uploadPoster, movieController.addMovie); 
// router.get("/delete/:id", movieController.deleteMovie); 
// router.get("/edit/:id", movieController.editMovie); 
// router.post("/update/:id", Movie.uploadPoster, movieController.updateMovie); 

// module.exports = router;

const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie.controller");
const Movie = require("../model/movie.model");

// Define movie routes
router.get("/", movieController.getAllMovies);
router.get("/view/:id", movieController.viewMovie);
router.post("/add", Movie.uploadPoster, movieController.addMovie);
router.get("/delete/:id", movieController.deleteMovie);
router.get("/edit/:id", movieController.editMovie);
router.post("/update/:id", Movie.uploadPoster, movieController.updateMovie);

module.exports = router;
