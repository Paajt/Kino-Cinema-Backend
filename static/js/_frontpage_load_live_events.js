export default class LoadLiveEvents {
  constructor(apiPath) {
    this.apiPath = apiPath;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiPath);
      const data = await response.json();
      return data.liveEvents;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
