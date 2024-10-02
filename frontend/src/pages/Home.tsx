import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

interface Movie {
  _id: string;
  title: string;
  author: string;
  genre: string;
  synopsis?: string;
  picture?: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:5000/api/movies/list');
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  // Filtrar las películas por título, género y autor
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (genreFilter ? movie.genre === genreFilter : true) &&
    (authorFilter ? movie.author === authorFilter : true)
  );

  // Obtener géneros y autores únicos para los selectores
  const uniqueGenres = Array.from(new Set(movies.map(movie => movie.genre)));
  const uniqueAuthors = Array.from(new Set(movies.map(movie => movie.author)));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Catálogo de Películas</h1>
      
      {/* Barra de búsqueda */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          className="w-full max-w-md p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtros por género y autor */}
      <div className="flex justify-center space-x-4 mb-8">
        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">Todos los Géneros</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        >
          <option value="">Todos los Autores</option>
          {uniqueAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      {/* Grilla de películas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={movie.picture || 'https://via.placeholder.com/400'}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Autor: {movie.author}</p>
              <p className="text-sm text-gray-600 mb-2">Género: {movie.genre}</p>
              <p className="text-sm text-gray-700">{movie.synopsis?.slice(0, 100)}...</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={() => navigate(`/${movie._id}`)}>Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
