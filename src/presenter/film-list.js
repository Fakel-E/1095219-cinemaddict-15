import MainContentView from '../view/main-content.js';
import FilmTemplateView from '../view/film-container.js';
import FilmListTemplateView from '../view/film-list.js';
import NoFilmView  from '../view/nofilm.js';
import ButtonMoreView from '../view/button-more.js';
import FilmCardPresenter from '../presenter/film-card.js';
import TopRatedView from '../view/top-rate.js';
import TopCommentView from '../view/top-comment.js';
import {render, remove, selectRatedFilms, selectCommentFilm} from '../utils/render.js';
import { updateItemById } from '../utils/comon.js';

const FILM_PER_STEP = 5;
const FILM_TOP = 2;

export default class FilmList {
  constructor(container) {
    this._container = container;
    this._renderedFilmCount = FILM_PER_STEP;
    this._allFilmsView = new FilmTemplateView();
    this._allFilmsListView = new FilmListTemplateView();
    this._noFilmsView = new NoFilmView();
    this._showMoreButtonView = new ButtonMoreView();
    this._mainContentView = new MainContentView();
    this._topRatedView = new TopRatedView();
    this._topCommentView = new TopCommentView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmCardPresenterStorage  = {};
    this._topRateFilmPresenterStorage = {};
    this._topCommentFilmPresenterStorage = {};
  }

  init(films) {
    this._films = films.slice();

    this._renderAllFilms();
    render(this._container, this._mainContentView);
    render(this._mainContentView, this._allFilmsView);
    render(this._mainContentView, this._topRatedView);
    render(this._mainContentView, this._topCommentView);
  }

  _handleModeChange() {
    [
      ...Object.values(this._filmCardPresenterStorage),
      ...Object.values(this._topRateFilmPresenterStorage),
      ...Object.values(this._topCommentFilmPresenterStorage),
    ]
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmCard(film, templateElement, typePresenter) {
    const filmCardPresenter = new FilmCardPresenter(templateElement, this._handleFilmChange, this._handleModeChange);

    filmCardPresenter.init(film);
    typePresenter[film.id] = filmCardPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film, this._allFilmsListView, this._filmCardPresenterStorage));
  }

  _renderTopFilms(from, to) {

    selectRatedFilms(this._films)
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film, this._topRatedView.getContainer(), this._topRateFilmPresenterStorage));
  }

  _renderCommentFilms(from, to) {

    selectCommentFilm(this._films)
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film, this._topCommentView.getContainer(), this._topCommentFilmPresenterStorage));
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsView);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_PER_STEP);
    this._renderedFilmCount += FILM_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    render(this._allFilmsView, this._showMoreButtonView);

    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderAllFilms() {
    this._renderFilms(0, FILM_PER_STEP);
    render(this._allFilmsView, this._allFilmsListView);

    if (this._films.length > FILM_PER_STEP) {
      this._renderShowMoreButton();
    }

    this._renderTopFilms(0, FILM_TOP);
    this._renderCommentFilms(0, FILM_TOP);
  }

  _render() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderAllFilms();
  }

  _clear() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmCount = FILM_PER_STEP;
    remove(this._showMoreButtonView);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItemById(this._films, updatedFilm);
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }
}
