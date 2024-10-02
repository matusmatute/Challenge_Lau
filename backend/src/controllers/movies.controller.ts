import { RequestHandler } from "express";
import MovieModel from "../models/movie";
import * as schema from "yup";

/**
 ** Retrieves a list of all movies from the database and returns them in the response.
 */
export const getMovies: RequestHandler = async(req, res, next) => {
    try {
        const movies = await MovieModel.find().exec(); 
        res.status(200).json(movies);
    } catch (error) {
        next(error);
       }

};
/**
 ** Validates and creates a new movie in the database.
 */
export const movieValidate =  schema.object({
    title: schema.string().required(),
    author: schema.string().required(),
    genre: schema.string().required(),
    synopsis: schema.string().optional(),
    picture: schema.string().optional(),
});


/**
 ** Creates a new movie and adds it to the database.
 */
export const createMovie: RequestHandler = async(req, res, next) => {

    const {title, author, genre, synopsis, picture} = req.body;
    try {
        await movieValidate.validate(req.body);
        const newMovie = await MovieModel.create(movieValidate.cast({title, author, genre, synopsis, picture}));
        res.status(201).json(newMovie);
    } catch (error) {
        next(error);
    };

};


/**
 ** Retrieves a list of movies from the database based on the provided search criteria and returns them in the response.
 */
export const listMovies: RequestHandler = async(req, res, next) => {
    try {
        const {title, author, genre } = req.query;
        const query = {
            ...(title && { title: new RegExp(title.toString(), 'i') }),
            ...(author && { author: new RegExp(author.toString(), 'i') }),
            ...(genre && { genre: new RegExp(genre.toString(), 'i') }),
        };
        const movies = await MovieModel.find(query).exec();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};

/**
 ** Retrieves a single movie from the database based on the provided id and returns it in the response.
 */
export const getMovieById: RequestHandler = async(req, res, next) => {
        const id = req.params.id;
    try {
        const movie = await MovieModel.findById(id).exec();
        if (!movie) throw new Error("Movie not found");
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};


/**
 * *Updates a single movie in the database with the provided information and returns the updated movie in the response.
 */
export const updateMovie: RequestHandler = async(req, res, next) => {
    const id = req.params.id;
    const {title, author, genre, synopsis, picture} = req.body;
    try {
        await movieValidate.validate(req.body);
        const movie = await MovieModel.findById(id).exec();
        if (!movie) throw new Error("Movie not found");
        movie.title = title;
        movie.author = author;
        movie.genre = genre;
        movie.synopsis = synopsis;
        movie.picture = picture;
        const updatedMovie = await movie.save();
        res.status(200).json(updatedMovie);
    } catch (error) {
        next(error);
    }
};


/**
 * *Deletes a single movie from the database based on the provided id and returns the deleted movie in the response.
 */
export const deleteMovie: RequestHandler = async(req, res, next) => {
    const id = req.params.id;
    try {
        const movie = await MovieModel.findById(id).exec();
        if (!movie) throw new Error("Movie not found");
        await movie.deleteOne();
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
};







