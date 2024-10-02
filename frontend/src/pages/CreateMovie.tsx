import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente para crear una nueva película
 *
 * Utiliza el hook de estado useState para almacenar los valores de los campos
 * del formulario. Luego, utiliza el hook de navegación useNavigate para
 * redirigir al usuario a la página principal después de crear la película.
 *
 * @returns {JSX.Element}
 */
const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  /**
   * Función para manejar el envío del formulario
   *
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /**
     * Crea un objeto con los datos de la película
     *
     * @type {Object}
     */
    const movie = { title, author, genre, synopsis, picture };

    console.log(movie);
    /**
     * Envía una petición POST a la API para crear la película
     *
     * @param {string} url
     * @param {Object} options
     */
    const Response = await fetch("http://localhost:5000/api/movies/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    const data = await Response.json();
    const movieId = data._id;
    /**
     * Redirige al usuario a los detalles de la pelicula
     */
    navigate("/" + movieId);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Crear Nueva Película</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="genre">Género</label>
          <input
            type="text"
            id="genre"
            placeholder="Género"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="synopsis">Sinopsis</label>
          <textarea
            id="synopsis"
            placeholder="Sinopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="picture">URL de la imagen</label>
          <input
            type="text"
            id="picture"
            placeholder="URL de la imagen"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Guardar Película
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
