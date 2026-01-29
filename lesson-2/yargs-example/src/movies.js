import {readFile, writeFile} from "node:fs/promises";
import {resolve, join} from "node:path";
import { nanoid } from "nanoid";

// const moviesPath = join("src", "db", "movies.json");
// const moviesPath = join(process.cwd(), "src", "db", "movies.json");
const moviesPath = resolve("src", "db", "movies.json");

const updateMovies = movies => writeFile(moviesPath, JSON.stringify(movies, null, 2));;

export const getAllMovies = async ()=> {
    const data = await readFile(moviesPath, "utf-8");
    return JSON.parse(data);
}

export const getMovieById = async id => {
    const movies = await getAllMovies();
    const result = movies.find(item => item.id === id);
    return result || null;
}

export const addMovie = async data => {
    const movies = await getAllMovies();
    const newMovie = {
        id: nanoid(),
        ...data,
    };
    movies.push(newMovie);
    await updateMovies(movies);
    return newMovie;
}

export const updateMovieById = async (id, data)=> {
    const movies = await getAllMovies();
    const idx = movies.findIndex(item => item.id === id);
    if(idx === -1) return null;
    movies[idx] = {...movies[idx], ...data};
    await updateMovies(movies);
    return movies[idx];
}

export const deleteMovieById = async id => {
    const movies = await getAllMovies();
    const idx = movies.findIndex(item => item.id === id);
    if(idx === -1) return null;
    const [result] = movies.splice(idx, 1);
    await updateMovies(movies);
    return result;
}