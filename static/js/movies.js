import fetch from 'node-fetch';
import { marked } from 'marked';

const Movie_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/';

export async function loadAllMovies() {
  const response = await fetch(Movie_API + 'movies');
  const payload = await response.json();
  return payload.data.map((movie) => ({
    id: movie.id,
    ...movie.attributes,
  }));
}

export async function loadSingleMovie(id) {
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
}
