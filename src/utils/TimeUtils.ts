import moment, {Moment, MomentInput, unitOfTime} from 'moment';

export enum ITimeFormat {
  DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm',
  TIME_FORMAT = 'HH:mm',
  DATE_FORMAT = 'DD/MM/YYYY',
}

const {DATE_TIME_FORMAT, TIME_FORMAT, DATE_FORMAT} = ITimeFormat;
// react-datepicker format
const DATE_TIME_INPUT_FORMAT = 'dd/MM/yyyy HH:mm';
const DATE_INPUT_FORMAT = 'dd/MM/yyyy';
const MONTH_INPUT_FORMAT = 'mm/yyyy';
const YEAR_INPUT_FORMAT = 'yyyy';
// ant design date picker format
const ANT_DATE_TIME_INPUT_FORMAT = 'DD/MM/YYYY HH:mm';
const ANT_DATE_INPUT_FORMAT = 'DD/MM/YYYY';
const ANT_MONTH_INPUT_FORMAT = 'MM/YYYY';
const ANT_YEAR_INPUT_FORMAT = 'YYYY';

const MONTH_MILLISECOND = 30 * 24 * 60 * 60 * 1000;
const WEEK_MILLISECOND = 7 * 24 * 60 * 60 * 1000;
const DAY_MILLISECOND = 24 * 60 * 60 * 1000;

const defaultInputFormat = (time: any) => {
  return format(time, 'YYYY-MM-DDTHH:mm');
};

const convertMiliToDateTime = (timeInMillis: any, lang: string = 'en') => {
  const date = new Date(timeInMillis);
  if (lang === 'th') {
    return date ? moment(date).add('years', 543).format(DATE_TIME_FORMAT) : '';
  }
  return date ? moment(date).format(DATE_TIME_FORMAT) : '';
};

function calculateMonthDifferent(d1: number, d2: number) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  let months;
  months = (date1.getFullYear() - date2.getFullYear()) * 12;
  months += date1.getMonth();
  months -= date2.getMonth();
  return months <= 0 ? 0 : months;
}

function calculateWeekDifferent(d1: number, d2: number) {
  let diff = (d1 - d2) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}

function calculateDayDifferent(d1: number, d2: number) {
  let diff = (d1 - d2) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff));
}

function calculateTimeDifferent(
  moment1: MomentInput,
  moment2: MomentInput,
  type: unitOfTime.Diff = 'day',
) {
  // type accept : years, months, weeks, days, hours, minutes, and seconds
  const start = moment(moment1);
  const end = moment(moment2);
  return end.diff(start, type);
}

function convertRangeDateToArray(date1: MomentInput, date2: MomentInput) {
  let start = moment(date1);
  const end = moment(date2);
  const dates = [];
  while (start <= end) {
    dates.push(start.toString());
    start = start.add(1, 'days');
  }
  return dates;
}

function getFirstDayOf(
  date: any,
  timeUnit: unitOfTime.Base,
  format: ITimeFormat = ITimeFormat.DATE_TIME_FORMAT,
) {
  return moment(date).startOf(timeUnit).format(format);
}

function getLastDayOf(
  date: any,
  timeUnit: unitOfTime.Base,
  format: ITimeFormat = ITimeFormat.DATE_TIME_FORMAT,
) {
  return moment(date).endOf(timeUnit).format(format);
}

const checkTimeIsBetweenRangeDate = (
  date: any,
  start: Moment,
  end: Moment,
  unit: unitOfTime.Base = 'd',
): boolean => {
  return (
    moment(date).isBetween(start, end, unit) ||
    moment(date).isSame(start, unit) ||
    moment(date).isSame(end, unit)
  );
};

function calculatePreciseDifferentTime({
  from,
  to,
}: {
  from: string | Moment;
  to: string | Moment;
}): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const daysDiff = calculateTimeDifferent(from, to, 'day');
  const hoursDiff = calculateTimeDifferent(from, to, 'hour');
  const minutesDiff = calculateTimeDifferent(from, to, 'minute');
  const secondsDiff = calculateTimeDifferent(from, to, 'seconds');
  const days = daysDiff;
  let hours = hoursDiff;
  let minutes = minutesDiff;
  let seconds = secondsDiff;

  if (hoursDiff >= 24 && daysDiff >= 1) {
    hours = hoursDiff - days * 24;
  }
  if (minutes >= 60) {
    minutes = minutesDiff - 60 * hoursDiff;
  }
  if (seconds >= 60) {
    seconds = secondsDiff - 60 * minutesDiff;
  }
  return {days, hours, minutes, seconds};
}

/** ****
 * VERSION 2.0 for shorter name
 */

const toDateTime = (timeInMillis: any, lang: string = 'en') => {
  const date = new Date(timeInMillis);
  if (lang === 'th') {
    return date ? moment(date).add('years', 543).format(DATE_TIME_FORMAT) : '';
  }
  return date ? moment(date).format(DATE_TIME_FORMAT) : '';
};

const toMillisecond = (dateTime: any) => {
  const date = new Date(dateTime);
  return date.getTime();
};

const toDate = (timeInMillis: any, lang: string = 'en') => {
  const date = new Date(timeInMillis);
  if (lang === 'th') {
    return date ? moment(date).add('years', 543).format(DATE_FORMAT) : '';
  }
  return date ? moment(date).format(DATE_FORMAT) : '';
};

const toTime = (timeInMillis: any) => {
  const date = new Date(timeInMillis);
  return date ? moment(date).format(TIME_FORMAT) : '';
};

const format = (timeInMillis: any, FORMAT: string) => {
  const date = new Date(timeInMillis);
  return date ? moment(date).format(FORMAT) : '';
};

/**
 * return a date that far from the dateParam a period of time
 * period: default 0 day.
 * dateParam: can be millisecond or moment or date
 */
const getDateFarFrom = (period = 0, dateParam?: any) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  date.setDate(date.getDate() + period);
  return date;
};

const tomorrow = (dateParam?: any) => {
  return getDateFarFrom(1, dateParam);
};

const yesterday = (dateParam?: any) => {
  return getDateFarFrom(-1, dateParam);
};

export default {
  calculateMonthDifferent,
  calculateWeekDifferent,
  calculateDayDifferent,
  calculateTimeDifferent,
  convertRangeDateToArray,
  calculatePreciseDifferentTime,
  MONTH_MILLISECOND,
  WEEK_MILLISECOND,
  DAY_MILLISECOND,

  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_INPUT_FORMAT,
  DATE_TIME_INPUT_FORMAT,
  MONTH_INPUT_FORMAT,
  YEAR_INPUT_FORMAT,
  ANT_DATE_TIME_INPUT_FORMAT,
  ANT_DATE_INPUT_FORMAT,
  ANT_MONTH_INPUT_FORMAT,
  ANT_YEAR_INPUT_FORMAT,

  getFirstDayOf,
  getLastDayOf,
  checkTimeIsBetweenRangeDate,
  convertMiliToDateTime,
  toDateTime,
  toMillisecond,
  toDate,
  toTime,
  format,
  defaultInputFormat,

  getDateFarFrom,
  tomorrow,
  yesterday,
};
