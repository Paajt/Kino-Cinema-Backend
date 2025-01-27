import LoadLiveEvents from './_frontpage_load_live_events.js';
import LiveEventDOMHandler from './_live_event_DOM_handler.js';

export default async function initLiveEvents() {
  const apiPath = './static/json/liveEvents.json';
  const LiveEvents = new LoadLiveEvents(apiPath);
  const domHandler = new LiveEventDOMHandler('.live__list');

  try {
    const liveEventData = await LiveEvents.fetchData();
    domHandler.renderLiveEvents(liveEventData);
  } catch (error) {
    console.error('Error initializing live events:', error);
  }
}
