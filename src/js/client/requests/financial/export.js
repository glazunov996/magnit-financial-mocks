import { default as config } from 'configs/client.json';
import { default as exportRequestConfig } from 'configs/requests/financial/export.json';
import { qlikRequestDates } from './dates';
import { qlikRequestFilterState, qlikRequestFiltersUpdate } from './filter';
import { qlikRequestPrecisions } from './precision';

function processExportRawData(response) {
  const matrix = response.qHyperCube.qDataPages[0].qMatrix;
  const slices = matrix[0][0].qText;
  const expressions = matrix[0][1].qText;
  const data = { slices, expressions };
  return data;
}

function qlikRequestExportData(app) {
  return new Promise((resolve) => { app.createCube(exportRequestConfig, resolve); });
}

function zipFinancialExport(data, filter, precision, dates) {
  const exportData = {
    dates,
    filter,
    precision,
    export: data,
  };
  return exportData;
}

export async function qlikRequestFinancialExportData(app) {
  const dates = await qlikRequestDates(app);
  const filter = await qlikRequestFilterState(app);
  const precision = await qlikRequestPrecisions(app);
  const data = await qlikRequestExportData(app)
    .then(processExportRawData);
  const exportData = zipFinancialExport(data, filter, precision, dates);
  return exportData;
}

function qlikSelectIndicators(app, indicators) {
  return app.field(config.indicators).clear().then(() => app.field(config.indicators).selectValues(indicators, true, true));
}

async function qlikSelectExportSettings(app, slices, expressions) {
  console.log("SET vSetDimension", slices)
  await app.variable.setStringValue('vSetDimension', slices);
  console.log("SET vSetExpression", expressions)
  await app.variable.setStringValue('vSetExpression', expressions);
  return Promise.resolve()
}

function qlikExportData(app) {
  return new Promise((resolve) => {
    app.getObject('QV01', 'GLnNmC').then(model => model.exportData().then((response) => { resolve(response.qUrl); }));
  });
}

function qlikSetUnits(app, units) {
  app.variable.setStringValue('vAbsFlag', `${units}`);
}

export async function qlikRequestFinancialExport(app, indicators, slices, expressions, filters, units, prevFilters) {
  await qlikSetUnits(app, units);
  await qlikSelectIndicators(app, indicators);
  await qlikRequestFiltersUpdate(app, filters);
  await qlikSelectExportSettings(app, slices, expressions);
  const data = await qlikExportData(app);
  await qlikRequestFiltersUpdate(app, prevFilters);
  return Promise.resolve(data);
}
