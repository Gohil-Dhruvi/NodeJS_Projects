const Movie = require("../model/movie.model");
const path = require("path");
const fs = require("fs");

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        let allMovies = await Movie.find().sort({ releaseYear: -1 });
        return res.render("movie", { allMovies });
    } catch (err) {
        console.error("Error fetching movies:", err);
        return res.status(500).send("Internal Server Error");
    }
};

// Add new movie
exports.addMovie = async (req, res) => {
    try {
        let posterPath = req.file ? `/uploads/${req.file.filename}` : "";
        req.body.poster = posterPath;

        await Movie.create(req.body);
        return res.redirect("/");
    } catch (err) {
        console.error("Error adding movie:", err);
        return res.status(500).send("Internal Server Error");
    }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
    try {
        let id = req.params.id;
        let record = await Movie.findById(id);

        if (record && record.poster) {
            let imagePath = path.join(__dirname, "..", "public", record.poster);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Movie.findByIdAndDelete(id);
        return res.redirect("/");
    } catch (err) {
        console.error("Error deleting movie:", err);
        return res.status(500).send("Internal Server Error");
    }
};

// Edit movie (Render edit page)
exports.editMovie = async (req, res) => {
    try {
        let record = await Movie.findById(req.params.id);
        return res.render("movie-edit", { movie: record });
    } catch (err) {
        console.error("Error fetching movie:", err);
        return res.status(500).send("Internal Server Error");
    }
};

// View movie details
exports.viewMovie = async (req, res) => {
    try {
        let record = await Movie.findById(req.params.id);
        return res.render("movie-view", { movie: record });
    } catch (err) {
        console.error("Error viewing movie:", err);
        return res.status(500).send("Internal Server Error");
    }
};

// Update movie details
exports.updateMovie = async (req, res) => {
    try {
        let record = await Movie.findById(req.params.id);
        if (!record) return res.redirect("back");

        if (req.file) {
            if (record.poster) {
                let oldImagePath = path.join(__dirname, "..", "public", record.poster);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            req.body.poster = `/uploads/${req.file.filename}`;
        } else {
            req.body.poster = record.poster;
        }

        await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.redirect("/");
    } catch (err) {
        console.error("Error updating movie:", err);
        return res.status(500).send("Internal Server Error");
    }
};