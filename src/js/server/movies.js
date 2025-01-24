import fetch from 'node-fetch';
import { marked } from 'marked';

const Movie_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/';

export async function loadAllMovies() {
  try {
    const response = await fetch(Movie_API + 'movies');

    if (!response.ok) {
      console.error('Failed to fetch movies:', response.statusText);
      return [];
    }

    const payload = await response.json();
    return payload.data.map((movie) => ({
      id: movie.id,
      ...movie.attributes,
    }));
  } catch (error) {
    console.error('Error fetching all movies', error.message);
    return [];
  }
}

export async function loadSingleMovie(id) {
  try {
    const response = await fetch(`${Movie_API}movies/${id}`);

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return {
      id: payload.data.id,
      title: payload.data.attributes.title,
      intro: marked(payload.data.attributes.intro),
      image: payload.data.attributes.image?.url,
    };
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error.message);
    return null;
  }
}
