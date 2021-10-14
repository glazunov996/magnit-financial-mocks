/* eslint no-new: 'off' */

import { initUI, updateUI } from 'state/ui';
import { updateConfig } from 'utilities/config';
import { requestMeta } from 'utilities/meta';
import { initFormatters } from 'utilities/formatters';
import App from 'components/App.svelte';

function calcualteMinDate([ dates ]) {
  const [ date ] = dates;
  return Date.UTC(date.year, (date.month - 1), 1);
}

function calcualteMaxDate([ dates ]) {
  const date = dates[dates.length - 1];
  return Date.UTC(date.year, (date.month - 1), 1);
}

function calculateStartDate([ dates ], dateMax) {
  const picked = dates
    .slice()
    .reverse()
    .find(date => date.picked);
  if (picked) return Date.UTC(picked.year, (picked.month - 1), 1);
  return dateMax;
}

function initApp() {
  initFormatters();
  initUI();
}

function mountApp() {
  window.removeEventListener('proxyready', mountApp);
  initApp();
  new App({ target: document.body });
  requestMeta()
    .then(startApp);
}

function startApp([ templates, dates ]) {
  const dateMin = calcualteMinDate(dates);
  const dateMax = calcualteMaxDate(dates);
  const dateStart = calculateStartDate(dates, dateMax);
  updateConfig({ dateMin, dateMax, dateStart });
  updateUI({ templates, initialized: true });
}

window.addEventListener('proxyready', mountApp);
