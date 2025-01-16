export default class ApiBackend {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async loadAllFilms() {
    const response = await fetch(this.apiUrl + '/movies');
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const payload = await response.json();
    console.log(payload);
    return payload;
  }
}
