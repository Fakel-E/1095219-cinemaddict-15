import AbstractView from './abstract.js';

const createStatisticTemplate = (film) => (
  `<p>${film} movies inside</p>`
);

export default class Statistic extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatisticTemplate(this._films);
  }
}
