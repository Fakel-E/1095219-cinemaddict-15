import AbstractView from './abstract.js';

const createFilmTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    </section>`
);
export default class FilmTemplate extends AbstractView {

  getTemplate() {
    return createFilmTemplate();
  }
}
