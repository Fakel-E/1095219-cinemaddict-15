import AbstractView from './abstract.js';

const createTopCommentTemplate = () => (
  `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
  </section>`
);
export default class TopComment extends AbstractView {

  getTemplate() {
    return createTopCommentTemplate();
  }

  getContainer() {
    return this.getElement().querySelector('.films-list__container');
  }
}
