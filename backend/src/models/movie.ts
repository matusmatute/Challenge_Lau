import { Schema, model, InferSchemaType } from "mongoose";

const movieSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    synopsis: {type: String, required: true},
    picture: {type: String, required: true},
}, {timestamps: true});


type Movie = InferSchemaType<typeof movieSchema>;

export default model<Movie>("Movie", movieSchema);