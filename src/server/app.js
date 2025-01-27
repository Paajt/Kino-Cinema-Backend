import express from 'express';
import * as sass from 'sass';
import fs from 'fs/promises';

function initApp(api) {
  const app = express();

  app.use('/static/styles', async (request, response, next) => {
    const scssPath = './static/styles/styles.scss';
    const cssPath = './static/styles/styles.css';

    try {
      const result = await sass.compileAsync(scssPath);
      await fs.writeFile(cssPath, result.css);
      response.sendFile(cssPath, { root: '.' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  app.use('/static', express.static('./static'));

  app.set('views', './views');
  app.set('view engine', 'pug');

  app.get('/', (request, response) => {
    response.render('index', { page: 'home' });
  });

  app.get('/about', (request, response) => {
    response.render('about');
  });

  app.get('/movies', async (request, response) => {
    const allMovies = await api.loadAllMovies();
    response.render('movies', { allMovies });
  });

  app.get('/movies/:movieId', async (request, response) => {
    const movieId = request.params.movieId;
    const singleMovie = await api.loadSingleMovie(movieId);

    if (!singleMovie) {
      return response.status(404).render('404');
    }

    response.render('movieID', { singleMovie });
  });

  return app;
}

export default initApp;
