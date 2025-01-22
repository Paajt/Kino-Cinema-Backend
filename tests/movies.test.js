import { expect, test } from '@jest/globals';
import request from 'supertest';

import initApp from '../static/js/app.js';

test('Movie page shows list of movies', async () => {
  const app = initApp();
  await request(app).get('/').expect('Content-Type', /html/).expect(200);
});

test('Specific Movie page shows correct title', async () => {
  const app = initApp();
  const response = await request(app).get('/movies/1').expect('Content-Type', /html/).expect(200);

  expect(response.text).toMatch(`<title>Kino Uppsala - Isle of dogs</title>`);
});
