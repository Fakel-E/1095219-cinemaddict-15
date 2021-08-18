import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
import SortMenuView from './view/sort-menu.js';
import FilmTemplateView from './view/film-container.js';
import FilmCardView  from './view/film-card.js';
import ButtonMoreView from './view/button-more.js';
import TopRatedView from './view/top-rate.js';
import TopCommentView from './view/top-comment.js';
import StatisticView from './view/statistic.js';
import PopupView from './view/popup.js';
import {generateFilm} from './mock/film.js';
// import {generateComment} from './mock/comment.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const {BEFOREEND} = RenderPosition;

const FILM_COUNT = 20;
const FILM_TOP = 2;
const FILM_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
//const siteFooterElement = document.querySelector('.footer');
const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView().getElement(), BEFOREEND);
render(siteMainElement, new SiteMenuView(filters).getElement(), BEFOREEND);
render(siteMainElement, new SortMenuView().getElement(), BEFOREEND);
render(siteMainElement, new FilmTemplateView().getElement(), BEFOREEND);

const filmTemplate = document.querySelector('.films');
const siteFilmContainer = filmTemplate.querySelector('.films-list');
const filmCardContainer = siteFilmContainer.querySelector('.films-list__container');

const renderFilmCard = (container, filmElements) => {
  const filmCardComponent = new FilmCardView(filmElements).getElement();
  const popupView = new PopupView(filmElements);

  const filmCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(popupView.getElement());

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      document.body.removeChild(popupView.getElement());
      popupView.removeElement();
      document.body.classList.remove('hide-overflow');
      buttonClose.removeEventListener('click', filmCardClickHandler);
    });
  };

  filmCardComponent.querySelector('.film-card__poster').addEventListener('click', filmCardClickHandler);
  filmCardComponent.querySelector('.film-card__title').addEventListener('click', filmCardClickHandler);
  filmCardComponent.querySelector('.film-card__comments').addEventListener('click', filmCardClickHandler);

  render(container, filmCardComponent, BEFOREEND);
};

films.slice(0, FILM_PER_STEP).forEach((film) => renderFilmCard(filmCardContainer, film));

const moreBtnListner = (component) => {
  let renderedTaskCount = FILM_PER_STEP;

  component.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedTaskCount, renderedTaskCount + FILM_PER_STEP)
      .forEach((film) => renderFilmCard(filmCardContainer, film));

    renderedTaskCount += FILM_PER_STEP;

    if (renderedTaskCount >= films.length) {
      component.getElement().remove();
      component.removeElement();
    }
    component.getElement().removeEventListener('click', moreBtnListner);
  });
};

if (films.length > FILM_PER_STEP) {

  const loadMoreButtonComponent = new ButtonMoreView();
  render(siteFilmContainer, loadMoreButtonComponent.getElement(), BEFOREEND);

  moreBtnListner(loadMoreButtonComponent);
}

render(filmTemplate, new TopRatedView().getElement(), BEFOREEND);
render(filmTemplate, new TopCommentView().getElement(), BEFOREEND);
const arrTopElement = document.querySelectorAll('.films-list--extra');

arrTopElement.forEach((topElementsContainer) => {
  for (let k = 0; k < FILM_TOP; k++) {
    render(topElementsContainer.querySelector('.films-list__container'), new FilmCardView(films[k]).getElement(), BEFOREEND);
  }
});

render(siteStatisticElement, new StatisticView().getElement(), BEFOREEND);
