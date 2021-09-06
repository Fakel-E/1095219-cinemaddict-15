import {generateRandom} from '../utils/comon';
import {generateDate} from '../utils/date';

const EMOJIS = [
  'images/emoji/smile.png',
  'images/emoji/angry.png',
  'images/emoji/puke.png',
];

const TEXTS = [
  'new text comment',
  'bad film',
  'good film',
];

const AUTHORS = [
  'Carl',
  'Norman',
  'Flin',
];

export const generateComment = () => ({
  emoji: generateRandom(EMOJIS),
  text: generateRandom(TEXTS),
  author: generateRandom(AUTHORS),
  date: generateDate(),
});
