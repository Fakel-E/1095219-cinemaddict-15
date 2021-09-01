import AbstractView from './abstract.js';

const createMainContentTemplate = () => (
  `<section class="films">
    </section>`
);

export default class MainContent extends AbstractView {
  getTemplate() {
    return createMainContentTemplate();
  }
}
