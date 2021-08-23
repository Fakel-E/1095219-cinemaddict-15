import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import SortMenuView from './view/sort-menu.js';
import FilmTemplateView from './view/film-container.js';
import FilmCardView  from './view/film-card.js';
import NoFilmView  from './view/nofilm.js';
import ButtonMoreView from './view/button-more.js';
import TopRatedView from './view/top-rate.js';
import TopCommentView from './view/top-comment.js';
import StatisticView from './view/statistic.js';
import PopupView from './view/popup.js';
import {generateFilm} from './mock/film.js';
// import {generateComment} from './mock/comment.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition, remove} from './utils/render.js';

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

render(siteHeaderElement, new ProfileView(), BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), BEFOREEND);
render(siteMainElement, new SortMenuView(), BEFOREEND);
render(siteMainElement, new FilmTemplateView(), BEFOREEND);

const filmTemplate = document.querySelector('.films');
const siteFilmContainer = filmTemplate.querySelector('.films-list');
const filmCardContainer = siteFilmContainer.querySelector('.films-list__container');

const renderFilmCard = (container, filmElement) => {
  const filmCardComponent = new FilmCardView(filmElement).getElement();
  const popupView = new PopupView(filmElement);

  const filmCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(popupView.getElement());

    const buttonEscKeydownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        document.body.removeChild(popupView.getElement());
        popupView.removeElement();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', buttonEscKeydownHandler);
      }
    };

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      document.body.removeChild(popupView.getElement());
      popupView.removeElement();
      document.body.classList.remove('hide-overflow');
      buttonClose.removeEventListener('click', filmCardClickHandler);
      document.removeEventListener('keydown', buttonEscKeydownHandler);
    });

    document.addEventListener('keydown', buttonEscKeydownHandler);
  };

  const addClickHandler = (element) => {
    element.querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments')
      .forEach((item) => {
        item.addEventListener('click', filmCardClickHandler);
      });
  };

  addClickHandler(filmCardComponent);

  render(container, filmCardComponent, BEFOREEND);
};

const showMoreFilms = (component) => {
  let renderedTaskCount = FILM_PER_STEP;

  component.setClickHandler(() => {
    films
      .slice(renderedTaskCount, renderedTaskCount + FILM_PER_STEP)
      .forEach((film) => renderFilmCard(filmCardContainer, film));

    renderedTaskCount += FILM_PER_STEP;

    if (renderedTaskCount >= films.length) {
      remove(component);
    }
    component.getElement().removeEventListener('click', showMoreFilms);
  });
};

if (films.length === 0) {
  render(siteMainElement, new NoFilmView(), BEFOREEND);
} else {
  films.slice(0, FILM_PER_STEP).forEach((film) => renderFilmCard(filmCardContainer, film));
  render(filmTemplate, new TopRatedView(), BEFOREEND);
  render(filmTemplate, new TopCommentView(), BEFOREEND);
}

if (films.length > FILM_PER_STEP) {
  const loadMoreButtonComponent = new ButtonMoreView();
  render(siteFilmContainer, loadMoreButtonComponent, BEFOREEND);
  showMoreFilms(loadMoreButtonComponent);
}

const arrTopElement = document.querySelectorAll('.films-list--extra');

arrTopElement.forEach((topElementsContainer) => {
  const topFilmContainer = topElementsContainer.querySelector('.films-list__container');
  for (let k = 0; k < FILM_TOP; k++) {
    renderFilmCard(topFilmContainer, films[k]);
  }
});

render(siteStatisticElement, new StatisticView(FILM_COUNT), BEFOREEND);
