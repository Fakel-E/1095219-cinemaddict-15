import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
//import SortMenuView from './view/sort-menu.js';
import StatisticView from './view/statistic.js';
import FilmListPresenter from './presenter/film-list.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const {BEFOREEND} = RenderPosition;

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView(), BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), BEFOREEND);
//render(siteMainElement, new SortMenuView(), BEFOREEND);
const filmPresenter = new FilmListPresenter(siteMainElement);
filmPresenter.init(films);

render(siteStatisticElement, new StatisticView(FILM_COUNT), BEFOREEND);


