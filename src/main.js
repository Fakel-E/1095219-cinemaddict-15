import {createProfileTemplate} from './view/profile';
import {createSiteMenuTemplate} from './view/site-menu';
import {createSortMenuTemplate} from './view/sort-menu';
import {createFilmTemplate} from './view/film-container';
import {createFilmCard} from './view/film-card';
import {createButtonShowMoreTemplate} from './view/button-more';
import {createTopRatedTemplate} from './view/top-rate';
import {createTopCommentTemplate} from './view/top-comment';
import {createStatisticTemplate} from './view/statistic';
import {createPopupTemplate} from './view/popup';

const FILM_COUNT = 5;
const FILM_TOP = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmTemplate(), 'beforeend');

const filmTemplate = document.querySelector('.films');
const siteFilmContainer = filmTemplate.querySelector('.films-list');
const filmCardContainer = siteFilmContainer.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmCardContainer, createFilmCard(), 'beforeend');
}
render(siteFilmContainer, createButtonShowMoreTemplate(), 'beforeend');

render(filmTemplate, createTopRatedTemplate(), 'beforeend');
render(filmTemplate, createTopCommentTemplate(), 'beforeend');
const arrTopElement = document.querySelectorAll('.films-list--extra');

arrTopElement.forEach((topElementsContainer) => {
  for (let k = 0; k < FILM_TOP; k++) {
    render(topElementsContainer.querySelector('.films-list__container'), createFilmCard(), 'beforeend');
  }
});

render(siteStatisticElement, createStatisticTemplate(), 'beforeend');
render(siteFooterElement, createPopupTemplate(), 'afterend');
