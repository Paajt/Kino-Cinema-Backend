export default class SearchFilter extends EventTarget {
  constructor(searchString) {
    super();
    this.searchString = searchString;
  }

  doesFilmMatch(films) {
    if (!this.searchString) {
      return true;
    }

    const title = films?.data?.title?.toLowerCase() || '';
    const desc = films?.data?.description?.toLowerCase() || '';
    const searchString = this.searchString.toLowerCase();

    return title.includes(searchString) || desc.includes(searchString);
  }

  render() {
    const searchBar = document.createElement('div');
    searchBar.className = 'moviesSecond__search';

    const searchBarInput = document.createElement('input');
    searchBarInput.placeholder = 'Sök film';
    searchBarInput.addEventListener('keyup', () => {
      this.searchString = searchBarInput.value;
      this.dispatchEvent(new Event('change'));
    });

    searchBar.append(searchBarInput);

    return searchBar;
  }
}
