import {createElement} from '../utils';

const templateSiteMenu = (filters, isChecked) => {
  const {name, count} = filters;

  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">
    ${name === 'all' ? 'All movies' : ''}
    ${name === 'watchlist' ? 'Watchlist ' : ''}
    ${name === 'history' ? 'History ' : ''}
    ${name === 'favorites' ? 'Favorites ' : ''}
    ${name === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => templateSiteMenu(filter, index === 0))
    .join('');

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
