import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import initApp from '../src/js/server/app.js';

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

describe('Successfully serves static files', () => {
  test('Serves styles.css successfully', async () => {
    const app = initApp();
    const response = await request(app).get('/src/styles/styles.css').expect(200);

    expect(response.text).toMatch(/body/);
  });

  test('Serves main.js successfully', async () => {
    const app = initApp();
    const response = await request(app).get('/src/js/main.js').expect(200);

    expect(response.text).toMatch('initLiveEvents');
  });
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

describe('Handles empty list and missing title on movie page', () => {
  test('Empty movie list returns: No movies message', async () => {
    const app = initApp({
      loadAllMovies: async () => [], // Returns empty list
    });

    const response = await request(app).get('/movies').expect('Content-Type', /html/).expect(200);

    expect(response.text).toMatch(/No movies found/);
  });

  test('Handles movie list with missing title value', async () => {
    const app = initApp({
      loadAllMovies: async () => [
        {
          id: 1,
          // No title
          intro: 'A Colombian teenage girl',
        },
        {
          id: 2,
          title: 'Training Day',
          intro: 'A rookie cop',
        },
      ],
    });

    const response = await request(app).get('/movies').expect('Content-Type', /html/).expect(200);

    expect(response.text).toMatch(/Movie title missing/);
    expect(response.text).toMatch('Training Day');
  });
});

describe('Handles single movie/id pages with missing different values', () => {
  test('Handles single movie with missing title value', async () => {
    const app = initApp({
      loadSingleMovie: async () => ({
        id: 1,
        title: null, // Missing title
        intro: 'A Colombian teenage girl',
      }),
    });

    const response = await request(app).get('/movies/1').expect('Content-Type', /html/).expect(200);

    expect(response.text).toMatch(/Movie title missing/);
    expect(response.text).toMatch('A Colombian teenage girl');
  });

  test('Handles single movie with missing intro value', async () => {
    const app = initApp({
      loadSingleMovie: async () => ({
        id: 1,
        title: 'Encanto',
        intro: null, // Missing intro
      }),
    });

    const response = await request(app).get('/movies/1').expect('Content-Type', /html/).expect(200);

    expect(response.text).toMatch('Encanto');
    expect(response.text).toMatch(/Description missing/);
  });

  test('Handles single movie with missing image value', async () => {
    const app = initApp({
      loadSingleMovie: async () => ({
        id: 1,
        title: 'Encanto',
        intro: 'A Colombian teenage girl',
        image: null, // Missing image
      }),
    });

    const response = await request(app).get('/movies/1').expect('Content-Type', /html/).expect(200);

    expect(response.text).toMatch('Encanto');
    expect(response.text).toMatch('A Colombian teenage girl');
    expect(response.text).toMatch(/No image available/);
  });
});
