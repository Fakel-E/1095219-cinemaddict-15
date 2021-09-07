import AbstractView from './abstract.js';
import {SortType} from '../utils/comon';

const createSortItemTemplate = (sortType, isChecked) => `
  <li>
    <a href="#${sortType}" class="sort__button ${isChecked ? 'sort__button--active' : ''}" data-sort-type="${sortType}">
      Sort by ${sortType}
    </a>
  </li>
`;

const createSortMenuTemplate = (activeSortType) => {
  const sortItemsTemplate = Object
    .values(SortType)
    .map((sortType) => createSortItemTemplate(sortType, sortType === activeSortType)).join('');
  return `<ul class="sort">${sortItemsTemplate}</ul>`;
};

export default class SortMenu extends AbstractView {
  constructor(activeSortType) {
    super();

    this._activeSortType = activeSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortMenuTemplate(this._activeSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

}
