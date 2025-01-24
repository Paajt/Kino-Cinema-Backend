import initApp from './src/js/server/app.js';
import { loadAllMovies, loadSingleMovie } from './src/js/server/movies.js';

const api = {
  loadAllMovies,
  loadSingleMovie,
};

const app = initApp(api);
const port = 5080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
