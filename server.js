import express from 'express';
import path from 'path';
import * as sass from 'sass';
import fs from 'fs/promises';
import { loadAllMovies, loadSingleMovie } from './static/js/movies.js';

const app = express();
const port = 5080;

app.use('/static/styles', async (request, response, next) => {
  const scssPath = path.join(process.cwd(), 'static', 'styles', 'styles.scss');
  const cssPath = path.join(process.cwd(), 'static', 'styles', 'styles.css');

  try {
    const result = await sass.compileAsync(scssPath);
    await fs.writeFile(cssPath, result.css);
    response.sendFile(cssPath);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.use('/static', express.static(path.join(process.cwd(), 'static')));

app.set('views', path.join(process.cwd(), './views'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.get('/movies', async (request, response) => {
  const allMovies = await loadAllMovies();
  response.render('movies', { allMovies });
});

app.get('/movies/:movieId', async (request, response) => {
  const movieId = request.params.movieId;
  const singleMovie = await loadSingleMovie(movieId);
  response.render('movieID', { singleMovie });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
