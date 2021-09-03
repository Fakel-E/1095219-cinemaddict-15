import AbstractView from './abstract.js';

export default class MainContent extends AbstractView {
  getTemplate() {
    return '<section class="films">    </section>';
  }
}
