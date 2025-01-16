import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import pug from 'pug';

const app = express();
const port = 5080;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', async (request, response) => {
  const buf = await fs.readFile('index.html');
  const html = buf.toString();
  response.send(html);
});

app.use('/static', express.static('static'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
