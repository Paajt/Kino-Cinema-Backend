import { expect, test } from '@jest/globals';
import request from 'supertest';

import initApp from '../static/js/app.js';

import { marked } from 'marked';

test('Movie page shows list of movies', async () => {
  const app = initApp({
    loadAllMovies: async () => [
      {
        id: 1,
        title: 'Encanto',
      },
      {
        id: 2,
        title: 'Training day',
      },
      {
        id: 3,
        title: 'Forrest Gump',
      },
    ],
  });
  const response = await request(app).get('/movies').expect('Content-Type', /html/).expect(200);

  expect(response.text).toMatch('Encanto');
  expect(response.text).toMatch('Training day');
});

test('Single movie page with ID shows correct title', async () => {
  const app = initApp({
    loadSingleMovie: async (id) => {
      const movies = {
        1: {
          id: 1,
          title: 'Encanto',
        },
        2: {
          id: 2,
          title: 'Training Day',
        },
        3: {
          id: 3,
          title: 'Forrest Gump',
        },
      };
      return movies[id];
    },
  });

  let response = await request(app).get('/movies/1').expect('Content-Type', /html/).expect(200);

  expect(response.text).toMatch('Encanto');

  response = await request(app).get('/movies/2').expect('Content-Type', /html/).expect(200);

  expect(response.text).toMatch('Training Day');

  response = await request(app).get('/movies/3').expect('Content-Type', /html/).expect(200);

  expect(response.text).toMatch('Forrest Gump');
});

test('Show 404 page if movie ID does not exist', async () => {
  const app = initApp({
    loadSingleMovie: async (id) => {
      if (id === '999') return null;
    },
  });

  const response = await request(app).get('/movies/999').expect('Content-Type', /html/).expect(404);

  expect(response.text).toMatch(/404/);
  expect(response.text).toMatch(/Page not found/);
});

test('Static files serves correctly', async () => {
  const app = initApp();
  const response = await request(app).get('/static/styles/styles.css').expect(200);

  expect(response.text).toMatch(/body/);
});

test('Converts markdown to HTML on intro text', async () => {
  const app = initApp({
    loadSingleMovie: async () => {
      return {
        id: 1,
        title: 'Encanto',
        intro: marked('\nThis is a _test_ using **marked**\n'),
      };
    },
  });

  const response = await request(app).get('/movies/1').expect('Content-Type', /html/).expect(200);

  expect(response.text).toMatch('Encanto');
  expect(response.text).toMatch('<p>This is a <em>test</em> using <strong>marked</strong></p>');
});
