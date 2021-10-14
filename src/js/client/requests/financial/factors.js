import { default as config } from 'configs/client.json';
import { default as financialIndicators } from 'configs/dashboards/financial/indicators.json';
import { default as factorsDataBlock1 } from 'configs/requests/financial/factors/factorsDataBlock1.json';
import { default as factorsDataBlock2 } from 'configs/requests/financial/factors/factorsDataBlock2.json';
import { default as factorsResultsBlock1 } from 'configs/requests/financial/factors/factorsResultsBlock1.json';
import { default as factorsResultsBlock2 } from 'configs/requests/financial/factors/factorsResultsBlock2.json';
import { qlikRequestDates, qlikRequestDatesUpdate } from './dates';
import { qlikRequestFilterState, qlikRequestFiltersUpdate } from './filter';
import { qlikRequestPrecisions, qlikRequestPrecisionsUpdate } from './precision';
import {
  requestFactorsDataEBITDABlock1,
  requestFactorsDataEBITDABlock2,
  requestFactorsDataNetProfitBlock1,
  requestFactorsDataNetProfitBlock2,
  requestFactorsDataGrossRevenueBlock1,
  requestFactorsDataGrossRevenueBlock2
} from './factorsSpecial';
import callApi from 'utilities/callApi'

const INDICATORS = financialIndicators.reduce((result, group) => [...result, ...group.indicators], []);

const FactorsSpecialRequestMap = {
  block1_7493: requestFactorsDataEBITDABlock1,
  block2_7493: requestFactorsDataEBITDABlock2,
  block1_7594: requestFactorsDataNetProfitBlock1,
  block2_7594: requestFactorsDataNetProfitBlock2,
  block1_7558: requestFactorsDataGrossRevenueBlock1,
  block2_7558: requestFactorsDataGrossRevenueBlock2
}

function findIndicator(indicator) {
  return INDICATORS.find(option => option.url === indicator);
}

function processFactorsResultsBlock(reply) {
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
  const DATA = { items: []};
  for(let i=0; i < matrix.length; i++){
      const row = matrix[i];
      const item = {
          id: row[0].qNum,
          name: row[1].qText,
          column: {
              factPrevYearPrecent: row[1],
              budgetPercent: row[2],
              factCurrYearPercent: row[3],
              bridgeResultBudgetPercent: row[4],
              bridgeResultPrevYearPercent: row[5]
          }
      }
      DATA.items.push(item);
  }
  return DATA
}

function processFactorsDataBlock(reply) {
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
  const DATA = { items: []};
  for (let i=0; i < matrix.length; i++){
    let row = matrix[i];
    let item = {
      id: row[0].qText,
      name: row[1].qText,
      column: {
        vsBudgetPercent: row[3],
        vsFactPercent: row[2],
      }
    }
    DATA.items.push(item);
  }
  return DATA;
}

async function requestFactorsResultsBlock1(app) {
  const response = await new Promise(resolve => {
    app.createCube(factorsResultsBlock1, resolve).then(e => e.close());
  })
  return processFactorsResultsBlock(response)
}

async function requestFactorsResultsBlock2(app) {
  const response = await new Promise(resolve => {
    app.createCube(factorsResultsBlock2, resolve).then(e => e.close());
  })
  return processFactorsResultsBlock(response)
}

async function requestFactorsDataBlock1(app, name) {
  let response;
  const func = FactorsSpecialRequestMap[name];
  if (func) {
    console.log("LOADING SPECIAL FACTORS", name)
    response = await func(app)
  } else {
    response = await new Promise(resolve => {
      app.createCube(factorsDataBlock1, resolve).then(e => e.close());
    })
  }
  return processFactorsDataBlock(response)
}

async function requestFactorsDataBlock2(app, name) {
  let response;
  const func = FactorsSpecialRequestMap[name];
  if (func) {
    console.log("LOADING SPECIAL FACTORS", name)
    response = await func(app)
  } else {
    response = await new Promise(resolve => {
      app.createCube(factorsDataBlock2, resolve).then(e => e.close());
    })
  }
  return processFactorsDataBlock(response)
}

async function qlikRequestResultsAndBridges(app) {
  const tasks = [
    requestFactorsResultsBlock1(app),
    requestFactorsResultsBlock2(app),
    requestFactorsDataBlock1(app),
    requestFactorsDataBlock2(app)
  ]
  const taskResults = await Promise.all(tasks);
  const resultsBlock1 = taskResults[0];
  const resultsBlock2 = taskResults[1];
  const dataBlock1 = taskResults[2];
  const dataBlock2 = taskResults[3];
  const results = resultsBlock1.items.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      column1: item.column,
      column2: resultsBlock2.items[index].column
    }
  })
  const bridges = dataBlock1.items.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      column1: item.column,
      column2: dataBlock2.items[index].column
    }
  })
  return { results, bridges };
}

async function qlikRequestResults(app) {
  const tasks = [
    requestFactorsResultsBlock1(app),
    requestFactorsResultsBlock2(app)
  ]
  const results = await Promise.all(tasks)
  console.log("qlikRequestResults RESULTS", results)
  return results;
}

function getFactorsDataName(block, id) {
  return `${block}_${id}`;
}

async function qlikRequestBridges(app, id) {
  const tasks = [
    requestFactorsDataBlock1(app, getFactorsDataName("block1", id)),
    requestFactorsDataBlock2(app, getFactorsDataName("block2", id))
  ]
  const results = await Promise.all(tasks)
  console.log("qlikRequestResults BRIDGES", results)
  return results;
}

async function qlikUpdateFilters(app, { conditions, date, datePoP, columnPrecision, datePrecision, dynamics, units }) {
  await qlikRequestDatesUpdate(app, date, datePoP, datePrecision);
  await qlikRequestFiltersUpdate(app, conditions);
  await qlikRequestPrecisionsUpdate(app, [columnPrecision, dynamics, units, datePrecision]);
  return Promise.resolve();
}

export async function qlikRequestFinancialFactorsData(app, id, type) {
  if (type === 'meta') {
    const tasks = [
      callApi(qlikRequestDates(app), "qlikRequestDates"),
      callApi(qlikRequestFilterState(app), "qlikRequestFilterState"),
      callApi(qlikRequestPrecisions(app), "qlikRequestPrecisions")
    ]
    const results = await Promise.all(tasks);
    return { dates: results[0], filter: results[1], precision: results[2] }
  } else if (type === 'results') {
    return await qlikRequestResults(app)
  } else if (type === 'bridges') {
    return await qlikRequestBridges(app, id);
  }
  return null;
}

function qlikSelectIndicator(app, value) {
  return app.field(config.indicators).clear().then(() => app.field(config.indicators).selectValues([value], true, true));
}

export async function qlikRequestFinancialFactors(app, indicator, filters, type) {
  const foundIndicator = findIndicator(indicator);
  const { label, id } = foundIndicator;
  console.log("FACTORS STARTED", label, id, foundIndicator)
  if (type === 'meta') {
    if (filters && !filters.fetch) await callApi(qlikSelectIndicator(app, label), "qlikSelectIndicator");
    if (filters && !filters.initial && !filters.noUpdate) await callApi(qlikUpdateFilters(app, filters), "qlikUpdateFilters");
  }
  const factors = await qlikRequestFinancialFactorsData(app, id, type);
  console.log("FACTORS FINISHED")
  return factors;
}
