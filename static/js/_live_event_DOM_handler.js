export default class LiveEventDOMHandler {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  createLiveEvent({ title, description, image }) {
    const listItem = document.createElement('li');
    listItem.classList.add('live__list-item');

    listItem.innerHTML = `
        <div class="live__list-item-image-wrapper">
                <img src="${image}" class="live__list-item-image" alt="${title}" />
            </div>
            <div class="live__list-item-title">
                <h3>${title}</h3>
                <button class="live__list-item-btn" aria-label="Book ticket to live event">BOKA</button>
            </div>
            <div class="live__list-item-description">
                <p>${description}</p>
            </div>
            `;
    return listItem;
  }

  renderLiveEvents(liveEventData) {
    if (!this.container) {
      console.error('Container element not found');
      return;
    }

    if (!Array.isArray(liveEventData) || liveEventData.length === 0) {
      this.container.innerHTML = '<p> No live events founds.</p>';
      return;
    }

    this.container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    liveEventData.forEach((liveEventData) => {
      const liveEventCard = this.createLiveEvent(liveEventData);
      fragment.appendChild(liveEventCard);
    });
    this.container.appendChild(fragment);
  }
}
