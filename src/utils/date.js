import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';

const MAX_DAYS_GAP = 7;

export const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

export const humanizeDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
export const humanizeDateComment = (dueDate) => dayjs(dueDate).format('YYYY/MM/D/H:MM');
