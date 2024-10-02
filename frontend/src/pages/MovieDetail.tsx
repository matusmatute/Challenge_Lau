import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Movie {
  _id: string;
  title: string;
  author: string;
  genre: string;
  synopsis?: string;
  picture?: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>(); // Extrae el ID de la URL
  const [movie, setMovie] = useState<Movie | null>(null); // Estado para guardar la película
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los detalles de la película
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la película');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>No se encontró la película.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={movie.picture || 'https://via.placeholder.com/400'}
        alt={movie.title}
        className="w-full h-auto mb-4"
      />
      <p><strong>Autor:</strong> {movie.author}</p>
      <p><strong>Género:</strong> {movie.genre}</p>
      {movie.synopsis && <p><strong>Sinopsis:</strong> {movie.synopsis}</p>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => { navigate(`/edit/${movie._id}`)}}>Editar información</button>
    </div>
  );
};

export default MovieDetail;
