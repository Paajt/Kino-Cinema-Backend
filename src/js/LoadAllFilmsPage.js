import SearchFilter from './SearchFilter.js';

export default class LoadAllFilmsPage extends EventTarget {
  constructor(backend) {
    super();
    this.backend = backend;
  }

  async start(listContainer) {
    const filmsFromApi = await this.backend.loadAllFilms();

    this.filter = new SearchFilter('');
    this.filter.addEventListener('change', () => {
      this.update();
    });

    const filterElem = this.filter.render();
    listContainer.append(filterElem);

    const listElem = document.createElement('ul');
    listElem.className = 'moviesSecond__list';
    listContainer.append(listElem);

    this.films = filmsFromApi.map((filmData) => {
      const filmElem = this.renderFilm(filmData);
      listElem.append(filmElem);
      return { data: filmData, elem: filmElem };
    });
  }

  update() {
    this.films.forEach(({ data, elem }) => {
      const doesMatch = this.filter.doesFilmMatch({ data });
      elem.style.display = doesMatch ? 'block' : 'none';
    });
  }

  renderFilm(data) {
    const movieCard = document.createElement('li');
    movieCard.classList.add('moviesSecond__list__elem');

    movieCard.innerHTML = `
        <img src="${data.image}" class="moviesSecond__list__elem__image"  alt="${data.title}">
        <h3 class="moviesSecond__list__elem__title">${data.title}</h3>
        <p class="moviesSecond__list__elem__desc">${data.desc} <strong>(${data.year})</strong></p>
        <p class="moviesSecond__list__elem__rating">Rating: ${data.rating}</p>
        <p class="moviesSecond__list__elem__date">Datum: ${data.date}</p>
        <p class="moviesSecond__list__elem__price">Pris: ${data.price}SEK</p>
        <p class="moviesSecond__list__elem__seat">Platser: ${data.seatsAvailable}</p>
    `;
    return movieCard;
  }
}
