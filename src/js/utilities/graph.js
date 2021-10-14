import { calculateQuarter, addMonths } from 'utilities/date';


export function renderPointX(pointIndex, pointCount) {
  return `${(((pointIndex + 0.5) / pointCount) * 100)}%`;
}

export function renderPointY(point, min, max, height, padding) {
  const paddedHeight = height - (padding * 2);
  const base = max - min;
  const fraction = base ? 1 - ((point - min) / (max - min)) : 0;
  return (paddedHeight * fraction) + padding + 0.5;
}

function generateMonthName(index) {
  if (index === 0) return 'Jan';
  if (index === 1) return 'Feb';
  if (index === 2) return 'Mar';
  if (index === 3) return 'Apr';
  if (index === 4) return 'May';
  if (index === 5) return 'Jun';
  if (index === 6) return 'Jul';
  if (index === 7) return 'Aug';
  if (index === 8) return 'Sep';
  if (index === 9) return 'Oct';
  if (index === 10) return 'Nov';
  return 'Dec';
}

export function fillMonthData(series, timestamp) {
  const fillData = data => {
    const seriesMap = data.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {})
    const newData = [];
    for (let i = 0; i < 13; ++i) {
      const date = new Date(timestamp);
      date.setDate(1)
      date.setMonth(date.getMonth() + i- 12);
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const name = `${year}${month}`;
      newData.push(seriesMap[name] ? seriesMap[name] : { name, data: null, text: '-' })
    }
    return newData;
  }
  return series.map(seriesData => ({
    name: seriesData.name,
    data: fillData(seriesData.data.slice())
  }));
}

export function fillQuaterData(series, timestamp) {
  const fillData = data => {
    const seriesMap = data.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {})
    const newData = [];
    for (let i = 0; i < 5; ++i) {
      const date = new Date(addMonths(timestamp, i * 3 - 12));
      const year = date.getFullYear();
      const quarter = `${calculateQuarter(date)}`.padStart(2, 0);
      const name = `${year}${quarter}`;
      newData.push(seriesMap[name] ? seriesMap[name] : { name, data: null, text: '-' })
    }
    return newData;
  }
  return series.map(seriesData => ({
    name: seriesData.name,
    data: fillData(seriesData.data.slice())
  }));
}

export function fillYearData(series, timestamp) {
  const fillData = data => {
    const seriesMap = data.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {})
    const newData = [];
    for (let i = 0; i < 3; ++i) {
      const date = new Date(timestamp);
      const year = date.getFullYear() + i - 2;
      const name = `${year}`;
      newData.push(seriesMap[name] ? seriesMap[name] : { name, data: null, text: '-' });
    }
    return newData;
  }
  return series.map(seriesData => ({
    name: seriesData.name,
    data: fillData(seriesData.data.slice())
  }));
}

function filterPeriodData(series, startPeriod, endPeriod, timestamp, timestampPoP) {
  const startDate = new Date(timestampPoP);
  const startYear = startDate.getFullYear();
  const startName = `${startYear}${`${startPeriod}`.padStart(2, '0')}`;
  const startIndex = series[0].data.findIndex(point => point.name === startName);
  const endDate = new Date(timestamp);
  const endYear = endDate.getFullYear();
  const endName = `${endYear}${`${endPeriod}`.padStart(2, '0')}`;
  const endIndex = series[0].data.findIndex(point => point.name === endName);
  return series.map(seriesData => ({
    name: seriesData.name,
    data: endIndex < 0 ? seriesData.data.slice(Math.max(startIndex, 0)) 
                       : seriesData.data.slice(Math.max(startIndex, 0), endIndex + 1),
  }));
}

export function filterPeriodMonthData(series, startPeriod, endPeriod, timestamp, timestampPoP) {
  const startDate = new Date(timestampPoP);
  const startYear = startDate.getFullYear();
  const startName = `${generateMonthName(startPeriod)} ${startYear}`;
  const startIndex = series[0].data.findIndex(point => point.name === startName);
  const endDate = new Date(timestamp);
  const endYear = endDate.getFullYear();
  const endName = `${generateMonthName(endPeriod)} ${endYear}`;
  const endIndex = series[0].data.findIndex(point => point.name === endName) + 1;
  return series.map(seriesData => ({
    name: seriesData.name,
    data: endIndex < 0 ? seriesData.data.slice(Math.max(startIndex, 0)) 
                       : seriesData.data.slice(Math.max(startIndex, 0), endIndex + 1),
  }));
}

export function filterMonthData(series, timestamp, timestampPoP) {
  const startMonth = (new Date(timestampPoP)).getMonth() + 1;
  const endMonth = (new Date(timestamp)).getMonth() + 1;
  return filterPeriodData(series, startMonth, endMonth, timestamp, timestampPoP);
}

export function filterPeriodQuarterData(series, startPeriod, endPeriod, timestamp, timestampPoP) {
  const startDate = new Date(timestampPoP);
  const startYear = startDate.getFullYear();
  const startName = `${startYear}${startPeriod}`;
  const startIndex = series[0].data.findIndex(point => point.name === startName);
  const endDate = new Date(timestamp);
  const endYear = endDate.getFullYear();
  const endName = `${endYear}${endPeriod}`;
  const endIndex = series[0].data.findIndex(point => point.name === endName) + 1;
  return series.map(seriesData => ({
    name: seriesData.name,
    data: endIndex < 0 ? seriesData.data.slice(Math.max(startIndex, 0)) 
                       : seriesData.data.slice(Math.max(startIndex, 0), endIndex + 1),
  }));
}

export function filterQuarterData(series, timestamp, timestampPoP) {
  const startQuarter = calculateQuarter(timestampPoP);
  const endQuarter = calculateQuarter(timestamp);
  return filterPeriodData(series, startQuarter, endQuarter, timestamp, timestampPoP);
}

export function filterYearData(series) {
  return series;
}
