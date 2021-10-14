import moment from 'moment';

const DEFAULT_OPTIONS = {
  timeZone: 'Europe/Moscow',
};

const DATE_OPTIONS = {
  ...DEFAULT_OPTIONS,
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const DATE_NUMERIC_OPTIONS = {
  ...DEFAULT_OPTIONS,
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
};

const DATE_NUMERIC_LONG_OPTIONS = {
  ...DEFAULT_OPTIONS,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const DATE_SHORT_OPTIONS = {
  ...DEFAULT_OPTIONS,
  month: 'short',
  day: 'numeric',
};

const MONTH_SHORT_OPTIONS = {
  ...DEFAULT_OPTIONS,
  month: 'short',
};

const MONTH_LONG_OPTIONS = {
  ...DEFAULT_OPTIONS,
  month: 'long',
};

const MONTH_YEAR_OPTIONS = {
  ...DEFAULT_OPTIONS,
  year: 'numeric',
  month: 'long',
};

const MONTH_YEAR_SHORT_OPTIONS = {
  ...DEFAULT_OPTIONS,
  year: '2-digit',
  month: 'short',
};

export const DAY = 86400000;
export const WEEK = DAY * 7;

function generateCurrentMonthDayOption(count, month, year, dayOptions) {
  for (let index = 1; index <= count; index += 1) {
    const option = {
      day: index,
      month,
      year,
    };
    dayOptions.push(option);
  }
}

export function calculateDatePoP(timestamp, dynamics) {
  const date = new Date(timestamp);
  date.setDate(1)
  if (dynamics === 'graphDetailMonth' || dynamics === 'graphDetailQuarter')
    date.setMonth(date.getMonth() - 12);
  else
    date.setMonth(date.getMonth() - 24);
  return Math.floor(date);
}

export function calculateDateForPrecision(date, precision) {
  if (precision === 2) // месяц
    return moment([date.getFullYear(), date.getMonth()]).endOf('month').toDate();
  else if (precision === 3) // квартал
    return moment([date.getFullYear(), date.getMonth()]).endOf('quarter').toDate();
  return moment([date.getFullYear()]).endOf('year').toDate();
}

function generateBeginningPadding(month, year, dayOptions) {
  const firstDay = (new Date(year, month, 1)).getDay();
  if (firstDay > 1) {
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevYear = prevMonth === 11 ? year - 1 : year;
    const prevMonthLastDate = (new Date(year, month, 0)).getDate();
    for (let index = 0; index < (firstDay - 1); index += 1) {
      const option = {
        day: prevMonthLastDate - index,
        month: prevMonth,
        year: prevYear,
      };
      dayOptions.unshift(option);
    }
  }
}

function generateEndPadding(month, year, maxYear, dayOptions) {
  const lastDay = (new Date(year, month, dayOptions[dayOptions.length - 1].day)).getDay();
  if (lastDay > 0) {
    const paddingCount = 7 - lastDay;
    const nextMonth = month + 1 > 11 ? 0 : month + 1;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    if (nextYear <= maxYear) {
      for (let index = 1; index <= paddingCount; index += 1) {
        const option = {
          day: index,
          month: nextMonth,
          year: nextYear,
        };
        dayOptions.push(option);
      }
    }
  }
}

export function generateDayOptions(month, year, maxYear) {
  const dayOptions = [];
  const count = (new Date(year, (month + 1), 0)).getDate();
  generateCurrentMonthDayOption(count, month, year, dayOptions);
  generateBeginningPadding(month, year, dayOptions);
  generateEndPadding(month, year, maxYear, dayOptions);
  return dayOptions;
}

export function addDays(timestamp, count = 1) {
  return timestamp + (DAY * count);
}

export function subtractDays(timestamp, count = 1) {
  return timestamp - (DAY * (count - 1));
}

export function addWeeks(timestamp, count = 1) {
  return timestamp + (WEEK * count);
}

export function subtractWeeks(timestamp, count = 1) {
  return timestamp - (WEEK * (count - 1));
}

export function addMonths(timestamp, count = 1) {
  const date = new Date(timestamp);
  return date.setMonth(date.getMonth() + count);
}

export function subtractMonths(timestamp, count = 1) {
  const date = new Date(timestamp);
  return date.setMonth(date.getMonth() - (count - 1));
}


export function addYear(timestamp) {
  const date = new Date(timestamp);
  return date.setFullYear(date.getFullYear() + 1);
}

export function subtractYear(timestamp) {
  const date = new Date(timestamp);
  return date.setFullYear(date.getFullYear() - 1);
}

export function calculateYearWeekCount(year) {
  return calculateWeekNumber(31, 11, year);
}

export function calculateWeekNumber(day, month, year) {
  const date = new Date(Date.UTC(year, month, day));
  date.setUTCDate((date.getUTCDate() + 4) - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(year, 0, 1));
  return Math.ceil((((date - yearStart) / DAY) + 1) / 7);
}

export function generateWeekNumbers(day, month, year) {
  const weekNumbers = [];
  const monthFirstWeek = calculateWeekNumber(1, month, year);
  const lastDay = (new Date(year, (month + 1), 0)).getDate();
  const monthLasttWeek = calculateWeekNumber(lastDay, month, year);
  const monthLength = monthLasttWeek - monthFirstWeek;
  for (let index = 0; index <= monthLength; index += 1) weekNumbers.push(monthFirstWeek + index);
  return weekNumbers;
}

export function renderDate(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', DATE_OPTIONS);
  return formatter.format(date);
}

export function renderMonthLong(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', MONTH_LONG_OPTIONS);
  return formatter.format(date);
}

export function renderMonthShort(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', MONTH_SHORT_OPTIONS);
  return formatter.format(date);
}

export function renderMonthYear(timestamp, locale) {  
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', MONTH_YEAR_OPTIONS);
  return formatter.format(date);
}

export function renderMonthYearShort(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', MONTH_YEAR_SHORT_OPTIONS);
  return formatter.format(date);
}

export function renderDateNumeric(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', DATE_NUMERIC_OPTIONS);
  return formatter.format(date);
}

export function renderDateNumericLong(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', DATE_NUMERIC_LONG_OPTIONS);
  return formatter.format(date);
}

export function renderWeekYearShort(timestamp, locale) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const week = calculateWeekNumber(day, month, year);
  return locale === 'ru' ? `${week} н ${year % 100}` : `${week} n ${year % 100}`;
}

export function renderQuarterYearShort(timestamp, locale) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  const year = date.getFullYear();
  return locale === 'ru' ? `${quarter} кв. ${year % 100}` : `${quarter} qu. ${year % 100}`;
}

export function renderDateShort(timestamp, locale) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-US', DATE_SHORT_OPTIONS);
  return formatter.format(date);
}

export function renderWeekShort(timestamp, locale) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const week = calculateWeekNumber(day, month, year);
  return locale === 'ru' ? `${week}-я нед` : `${week} week`;
}

export function renderQuarterShort(timestamp, locale) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  return locale === 'ru' ? `${quarter} кв.` : `${quarter} qu.`;
}

function renderWeekYear(timestamp, locale) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const week = calculateWeekNumber(day, month, year);
  return locale === 'ru' ? `${week}-я неделя ${year}` : `${week} week ${year}`;
}

function renderQuarterYear(timestamp, locale) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const quarter = Math.ceil(month / 3);
  return locale === 'ru' ? `${quarter} квартал ${year}` : `${quarter} quarter ${year}`;
}

export function renderYear(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  return `${year}`;
}

export function renderPreciseCellDate(timestamp, precision, locale) {
  if (precision === 0) return renderDateNumeric(timestamp, locale);
  if (precision === 1) return renderWeekYearShort(timestamp, locale);
  if (precision === 2) return renderMonthYearShort(timestamp, locale);
  if (precision === 3) return renderQuarterYearShort(timestamp, locale);
  return renderYear(timestamp);
}

export function renderPreciseCellMonth(timestamp, precision, maxTimestamp, locale) {
  if (precision >= 0 && precision <= 2) return renderMonthYearShort(timestamp, locale);
  const dateMax = new Date(maxTimestamp);
  const yearMax = dateMax.getFullYear();
  const monthMax = dateMax.getMonth();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  if (precision === 3) {
    const quarter = calculateQuarter(timestamp);
    const month = (quarter * 3) - 1;
    const monthFinal = year === yearMax && month > monthMax ? monthMax : month;
    const monthTimestamp = Date.UTC(year, monthFinal, 1);
    return renderMonthYearShort(monthTimestamp, locale);
  }
  const month = year === yearMax && monthMax < 11 ? monthMax : 11;
  const yearTimestamp = Date.UTC(year, month, 1);
  return renderMonthYearShort(yearTimestamp, locale);
}

export function renderPreciseTableDate(timestamp, precision, locale) {
  if (precision === 0) return renderDateShort(timestamp, locale);
  if (precision === 1) return renderWeekShort(timestamp, locale);
  if (precision === 2) return renderMonthShort(timestamp, locale);
  if (precision === 3) return renderQuarterShort(timestamp, locale);
  return renderYear(timestamp);
}

export function renderPreciseTableMonth(timestamp, precision, maxTimestamp, locale) {
  if (precision >= 0 && precision <= 2) return renderMonthShort(timestamp, locale);
  const dateMax = new Date(maxTimestamp);
  const yearMax = dateMax.getFullYear();
  const monthMax = dateMax.getMonth();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  if (precision === 3) {
    const quarter = calculateQuarter(timestamp);
    const month = (quarter * 3) - 1;
    const monthFinal = year === yearMax && month > monthMax ? monthMax : month;
    const monthTimestamp = Date.UTC(year, monthFinal, 1);
    return renderMonthShort(monthTimestamp, locale);
  }
  const month = year === yearMax && monthMax < 11 ? monthMax : 11;
  const yearTimestamp = Date.UTC(year, month, 1);
  return renderMonthShort(yearTimestamp, locale);
}

export function renderPreciseDate(timestamp, precision, locale) {
  if (precision === 0) return renderDateNumericLong(timestamp, locale);
  if (precision === 1) return renderWeekYear(timestamp, locale);
  if (precision === 2) return renderMonthYear(timestamp, locale);
  if (precision === 3) return renderQuarterYear(timestamp, locale);
  return renderYear(timestamp);
}

export function checkLeapYear(year) {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

export function calculateDatesDaysCount(firstDate, lastDate) {
  const count = Math.ceil((lastDate - firstDate) / DAY) + 1;
  return count;
}

export function calcuateMonthDayCount(timestamp) {
  return new Date(timestamp).getDate();
}

export function calculateDatesWeeksCount(firstTimestamp, lastTimestamp) {
  const yearCount = calculateDatesYearsCount(firstTimestamp, lastTimestamp);
  const firstDate = new Date(firstTimestamp);
  const firstYear = firstDate.getFullYear();
  const firstMonth = firstDate.getMonth();
  const firstDay = firstDate.getDate();
  const lastDate = new Date(lastTimestamp);
  const lastYear = lastDate.getFullYear();
  const lastMonth = lastDate.getMonth();
  const lastDay = lastDate.getDate();
  if (yearCount > 1) {
    const firstYearWeeks = calculateWeekNumber(31, 11, firstYear) - calculateWeekNumber(firstDay, firstMonth, firstYear);
    const lastYearWeeks = calculateWeekNumber(lastDay, lastMonth, lastYear);
    let result = firstYearWeeks + lastYearWeeks;
    if (yearCount > 2) {
      const fulYears = yearCount - 2;
      for (let yearShift = 1; yearShift < fulYears; yearShift += 1) {
        const year = firstYear + yearShift;
        const yearEnd = Date.UTC(year, 11, 31);
        const dateEnd = new Date(yearEnd);
        const dateEndMonth = dateEnd.getMonth();
        const dateEndDate = dateEnd.getDate();
        const lastWeek = calculateWeekNumber(dateEndDate, dateEndMonth, year);
        result += lastWeek;
      }
    }
    return result;
  }
  const firstDateWeeks = calculateWeekNumber(firstDay, firstMonth, firstYear);
  const lastDateWeeks = calculateWeekNumber(lastDay, lastMonth, lastYear);
  const result = lastDateWeeks - firstDateWeeks;
  return result;
}

export function calculateDatesMonthsCount(firstTimestamp, lastTimestamp) {
  const yearCount = calculateDatesYearsCount(firstTimestamp, lastTimestamp);
  const firstDate = new Date(firstTimestamp);
  const firstMonth = firstDate.getMonth() + 1;
  const lastDate = new Date(lastTimestamp);
  const lastMonth = lastDate.getMonth() + 1;
  if (yearCount > 1) {
    const firstYearMonths = (12 - firstMonth) + 1;
    const lastYearMonths = lastMonth;
    const fullYearsMonths = yearCount > 2 ? (yearCount - 2) * 12 : 0;
    const count = firstYearMonths + lastYearMonths + fullYearsMonths;
    return count;
  }
  return (lastMonth - firstMonth) + 1;
}

export function calculateDatesQuartersCount(firstTimestamp, lastTimestamp) {
  const yearCount = calculateDatesYearsCount(firstTimestamp, lastTimestamp) - 1;
  const firstDate = new Date(firstTimestamp);
  const firstYearMonth = firstDate.getMonth() + 1;
  const lastDate = new Date(lastTimestamp);
  const lastYearMonths = lastDate.getMonth() + 1;
  const firstYearQuarters = (4 - Math.ceil(firstYearMonth / 3)) + 1;
  const lastYearQuarters = Math.ceil(lastYearMonths / 3);
  const fullYearsQuarters = yearCount > 2 ? (yearCount - 2) * 4 : 0;
  const count = firstYearQuarters + lastYearQuarters + fullYearsQuarters;
  return count;
}

export function calculateQuartersRestCount(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const count = (4 - Math.ceil(month / 3)) + 1;
  return count;
}

export function calculateQuarter(timestamp) {
  const date = new Date(timestamp);
  const months = date.getMonth() + 1;
  const quarter = Math.ceil(months / 3);
  return quarter;
}

export function calculateDatesYearsCount(firstDate, lastDate) {
  const firstYear = (new Date(firstDate)).getFullYear();
  const lastYear = (new Date(lastDate)).getFullYear();
  return (lastYear - firstYear) + 1;
}

export function generateYearsWeekCache(dateMin, dateMax) {
  const yearMin = new Date(dateMin).getFullYear();
  const yearCount = calculateDatesYearsCount(dateMin, dateMax);
  const weeks = [];
  for (let yearShift = 0; yearShift < yearCount; yearShift += 1) {
    const year = yearMin + yearShift;
    const yearEnd = Date.UTC(year, 11, 31);
    const dateEnd = new Date(dateMax < yearEnd ? dateMax : yearEnd);
    const dateEndMonth = dateEnd.getMonth();
    const dateEndDate = dateEnd.getDate();
    const weekCount = calculateWeekNumber(dateEndDate, dateEndMonth, year);
    weeks.push(weekCount);
  }
  return weeks;
}

export function generateYearsWeekRangeCache(dateMin, dateMax, weeksCache) {
  const yearMin = (new Date(dateMin)).getFullYear();
  const yearCount = calculateDatesYearsCount(dateMin, dateMax);
  const ranges = {};
  for (let yearShift = 0; yearShift < yearCount; yearShift += 1) {
    const year = yearMin + yearShift;
    const min = yearShift === 0 ? 1 : weeksCache.slice(0, yearShift).reduce((result, weekCache) => result + weekCache, 0) + 1;
    const max = yearShift === 0 ? weeksCache[0] : (min - 1) + weeksCache[yearShift];
    ranges[year] = { min, max };
  }
  return ranges;
}
