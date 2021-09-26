import {humanizeDate} from '../utils/date';
import {humanizeDateComment} from '../utils/date';
import SmartView from './smart.js';

const Emotion = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const renderComment = ({emoji, text, author, date}) => (
  `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src=${emoji} width="55" height="55" alt="emoji-smile">
      </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeDateComment(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
    </li>`
);

const createCommentTitleCount = (commentsCount, isCommentsCount) => isCommentsCount ? `
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}
    </span></h3>` : '';

const renderFilmControlsTemplate = (list, history, favorite) => (
  `<button type="button" class="film-details__control-button ${list ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${history ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>`
);

const createPopupTemplate = (film, emotionComment) => {
  const {
    name,
    poster,
    description,
    rate,
    date,
    runtime,
    genre,
    originalName,
    director,
    writers,
    actors,
    country,
    ageLimit,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
    isCommentsCount,
    commentsCount,
  } = film;

  const templateComment = comments.map((comment) => renderComment(comment)).join('');
  const templateGenre = genre.map((genres) => `<span class="film-details__genre">${(genres)}</span>`).join('');

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster}>
            <p class="film-details__age">${ageLimit}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${originalName}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rate}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDate(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${templateGenre}
                </td>
              </tr>
            </table>
            <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
        ${renderFilmControlsTemplate(isWatchlist, isWatched, isFavorite)}
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
        ${createCommentTitleCount(commentsCount, isCommentsCount)}
          <ul class="film-details__comments-list">
          ${templateComment}
          </ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
            ${emotionComment.emotion}
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input"
              placeholder="Select reaction below and write comment here"
              name="comment"> </textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden"
              name="comment-emoji" type="radio" id="emoji-smile" value="${Emotion.SMILE}">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
                    </label>
            <input class="film-details__emoji-item visually-hidden"
            name="comment-emoji" type="radio" id="emoji-sleeping" value="${Emotion.SLEEPING}">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
                    </label>
                  <input class="film-details__emoji-item visually-hidden"
                  name="comment-emoji" type="radio" id="emoji-puke" value="${Emotion.PUKE}">
                    <label class="film-details__emoji-label" for="emoji-puke">
                      <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
                    </label>
                <input class="film-details__emoji-item visually-hidden"
                name="comment-emoji" type="radio" id="emoji-angry" value="${Emotion.ANGRY}">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" alt="emoji" width="30" height="30">
                    </label>
                  </div>
                </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class Popup extends SmartView {
  constructor(films) {
    super();
    this._films = films;

    this._data = {
      emotion: '',
      textComment: '',
    };

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);

    this._emotionInputHandler = this._emotionInputHandler.bind(this);
    //this._textTextareaHandler = this._textTextareaHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._films, this._data);
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseButtonClickHandler);
  }

  _watchlistClickHandler() {
    this._callback.clickWatchlist();
  }

  _favoriteClickHandler() {
    this._callback.clickFavorite();
  }

  _watchedClickHandler() {
    this._callback.clickWatched();
  }

  _popupCloseButtonClickHandler() {
    this._callback.clickCloseButton();
  }

  /*_textTextareaHandler(evt) {
    evt.preventDefault();
    this.updateData({
      textComment: evt.target.value,
    }, true);
  }*/

  _emotionInputHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.target.checked = true;

    this.getElement().querySelector('.film-details__add-emoji-label').innerHTML = `<img src="./images/emoji/${evt.target.value}.png" alt="emoji-${evt.target.value}" width="55" height="55">`;
    this._data.emotion = `<img src="./images/emoji/${evt.target.value}.png" alt="emoji-${evt.target.value}" width="55" height="55">`;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setPresenterHandlers();
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._watchlistClickHandler);
    this.getElement()
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._watchedClickHandler);
    this.getElement()
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._favoriteClickHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._textTextareaHandler);
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._emotionInputHandler);
  }

  _setPresenterHandlers() {
    this.setCloseButtonClickHandler(this._callback.clickCloseButton);
    this.setWatchlistClickHandler(this._callback.clickWatchlist);
    this.setWatchedClickHandler(this._callback.clickWatched);
    this.setFavoriteClickHandler(this._callback.clickFavorite);
  }

  /*static parseMovieToData(films) {
    return Object.assign(
      {},
      films,
      {
        isCommentsCount: films.commentsCount !== 0,
        isSmileEmotion: false,
        isSleepingEmotion: false,
        isPukeEmotion: false,
        isAngryEmotion: false,
      },
    );
  }*/
}
