import dayjs from 'dayjs';

const MAX_DAYS_GAP = 7;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const mixArray = function (massive) {
  massive = massive.slice();

  for (let i = massive.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = massive[i];
    massive[i] = massive[j];
    massive[j] = temp;
  }
  massive.splice(0, getRandomInteger(0, massive.length - 1));
  return massive;
};

export const generateRandom = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

export const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
export const humanizeDateComment = (dueDate) => dayjs(dueDate).format('YYYY/MM/D/H:MM');
