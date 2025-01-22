import initApp from './static/js/app.js';

const app = initApp();
const port = 5080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
