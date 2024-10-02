import * as MovieController from '../controllers/movies.controller';
import express from 'express';

const router = express.Router();

router.get('/', MovieController.getMovies);

router.post('/create', MovieController.createMovie);

router.get('/list', MovieController.listMovies);

router.get('/:id', MovieController.getMovieById);

router.put('/:id', MovieController.updateMovie);

router.delete('/:id', MovieController.deleteMovie);


export default router;