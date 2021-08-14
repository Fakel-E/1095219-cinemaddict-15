import {getRandomInteger} from '../util';
import {mixArray} from '../util';
import {generateRandom} from '../util';
import {generateDate} from '../util';
import {generateComment} from '../mock/comment';

const FILM_NAME = [
  'Begin',
  'Back to the Future',
  'Dark Knight',
  'Avengers',
  'Legend № 17',
];
const FILM_POSTER = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
];

const FILM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus',
];

const FILM_DIRECTORS = [
  'Anthony Mann',
  'Jason Mamoa',
  'Harisson Ford',
];

const FILM_WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];

const FILM_ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
];

const FILM_COUNTRY = [
  'USA',
  'Russia',
  'Finland',
];

const FILM_GENRES = [
  'Drama',
  'Film-Noir',
  'Mystery',
  'Fantastic',
];

const generateDescription = () => mixArray(FILM_DESCRIPTIONS);

export const generateFilm = () => ({
  name: generateRandom(FILM_NAME),
  originalName: generateRandom(FILM_NAME),
  poster: generateRandom(FILM_POSTER),
  director: generateRandom(FILM_DIRECTORS),
  writers: mixArray(FILM_WRITERS),
  actors: mixArray(FILM_ACTORS),
  country: generateRandom(FILM_COUNTRY),
  description: generateDescription(),
  rate: getRandomInteger(5, 10),
  date: generateDate(),
  runtime: getRandomInteger(60, 260),
  genre: mixArray(FILM_GENRES),
  ageLimit: getRandomInteger(0, 18),
  comments: new Array(getRandomInteger(1, 5)).fill('').map(generateComment),
  all: true,
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
