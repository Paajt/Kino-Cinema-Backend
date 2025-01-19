import fetch from 'node-fetch';

const Movie_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/';

export async function loadAllMovies() {
  const response = await fetch(Movie_API + 'movies');
  const payload = await response.json();
  return payload.data.map((movie) => ({
    id: movie.id,
    title: movie.attributes.title,
    intro: movie.attributes.intro,
    image: movie.attributes.image?.url,
  }));
}

export async function loadSingleMovie(id) {
  const response = await fetch(`${Movie_API}movies/${id}`);
  const payload = await response.json();
  return {
    id: payload.data.id,
    title: payload.data.attributes.title,
    intro: payload.data.attributes.intro,
    image: payload.data.attributes.image?.url,
  };
}
