import express from 'express';
import path from 'path';
import sass from 'sass';
import fs from 'fs/promises';
import pug from 'pug';

const app = express();
const port = 5080;

app.use('/static/styles', (request, response, next) => {
  const scssPath = path.join(process.cwd(), 'static', 'styles', 'styles.scss');
  const cssPath = path.join(process.cwd(), 'static', 'styles', 'styles.css');

  // Kompilera SCSS till CSS
  sass.render({ file: scssPath }, (err, result) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    // Skriv den genererade CSS-filen
    fs.writeFile(cssPath, result.css)
      .then(() => response.sendFile(cssPath))
      .catch(next);
  });
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

app.get('/movies', (request, response) => {
  response.render('movies');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
