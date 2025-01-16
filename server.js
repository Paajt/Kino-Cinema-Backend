import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import pug from 'pug';

const app = express();
const port = 5080;

app.set('views', path.join(process.cwd(), './views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(process.cwd(), 'static')));

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
