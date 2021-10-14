import { default as config } from 'configs/client.json';
import { default as financialIndicators } from 'configs/dashboards/financial/indicators.json';
import { default as formatSlicesBlock1 } from 'configs/requests/financial/slices/formatSlicesBlock1.json';
import { default as formatSlicesBlock2 } from 'configs/requests/financial/slices/formatSlicesBlock2.json';
import { default as regionSlicesBlock1 } from 'configs/requests/financial/slices/regionSlicesBlock1.json';
import { default as regionSlicesBlock2 } from 'configs/requests/financial/slices/regionSlicesBlock2.json';
import { default as chartRegionSlices } from 'configs/requests/financial/slices/chartRegionSlices.json';
import { default as chartFormatSlices } from 'configs/requests/financial/slices/chartFormatSlices.json';
import { default as chartSliceFromMainTable } from 'configs/requests/financial/slices/chartSliceFromMainTable.json';
import { default as chartsMainTable } from 'configs/requests/financial/overview/chartsMainTable.json';
import { qlikRequestMainTableBlock, qlickRequestChartsMainTable, processChartsMainTable} from './overview';
import { qlikRequestDates, qlikRequestDatesUpdate } from './dates';
import { qlikRequestFilterState, qlikRequestFiltersUpdate } from './filter';
import { qlikRequestPrecisions, qlikRequestPrecisionsUpdate } from './precision';
import callApi from 'utilities/callApi'
import * as _ from 'lodash';

const INDICATORS = financialIndicators.reduce((result, group) => [...result, ...group.indicators], []);

function findIndicator(indicator) {
  return INDICATORS.find(option => option.url === indicator);
}

function processSlicesBlock(reply) {
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
  const DATA = { rows: []};
  for(let i=0; i < matrix.length; i++){
    let row = matrix[i];
    let item = {
      name: row[0].qText,
      column:{
        factPercent: row[1],
        vsPpPercent: row[2],
        vsBudgetPercent: row[3],
        arrow: row[4],
      },
    }
    DATA.rows.push(item);
  }
  return DATA
}

function parseRowsDeviationDetailForCharts(headers, rows, seriesSettings){
  let DATA = { groups: [], labels: []};
  let currGroup;
  let lastGroupName = '';
  let lastLabel = "";
  
  for(let i=0; i < rows.length; i++){
    if(rows[i][0].qText != lastGroupName){
      lastGroupName = rows[i][0].qText;
      currGroup = { name : lastGroupName, series: [] };
      DATA.groups.push(currGroup);
    }
    //пропускаем второй столбец, 
    let seria;
    for(let j=2; j < rows[i].length; j++){
      seria = currGroup.series.find(function(s){ return s.name == headers[j]});
      if(!seria && rows[i][j].qState == "L"){ //не измерение
        seria = { name: headers[j], data: [] };
        currGroup.series.push(seria);
      }
      
      if(rows[i][j].qState != "L"){
        if(DATA.labels.indexOf(rows[i][1].qText) == -1){
          DATA.labels.push(rows[i][1].qText);
        }
        lastLabel = rows[i][1].qText;

      }else if(rows[i][j].qState == "L"){ //мера
        //приведение к числу
        seria.data.push({
          name: lastLabel,
          data: +rows[i][j].qNum,
          text: rows[i][j].qText
        });
      }
    }
  }
  return DATA;
}

function processChartsSlices(reply) {
  let coppyedHeaders = [];
  reply.qHyperCube.qDimensionInfo.forEach( (dim) =>  coppyedHeaders.push(dim.qFallbackTitle) )
  reply.qHyperCube.qMeasureInfo.forEach((measureName)=> coppyedHeaders.push(measureName.qFallbackTitle));

  let coppyedRows = _.cloneDeep(reply.qHyperCube.qDataPages[0].qMatrix);

  let seriesSettings = [
      { type: 'bar', color: '#1536ad', axisY: 'left'},
      { type: 'bar', color: '#48369d', axisY: 'left'}
  ];
  let DATA = parseRowsDeviationDetailForCharts(coppyedHeaders, coppyedRows, seriesSettings);
  return DATA
}

async function requestChartSliceFromMainTable(app){
  const response = await new Promise(resolve => {      
      app.createCube(chartSliceFromMainTable, resolve).then(e => e.close());
  })
  console.log("requestChartSliceFromMainTable RESPONSE", response)
  return processChartsMainTable(response)
}

async function requestFormatSlicesBlock1(app) {
  const response = await new Promise(resolve => {
    app.createCube(formatSlicesBlock1, resolve).then(e => e.close());
  })
  return processSlicesBlock(response)
}

async function requestFormatSlicesBlock2(app) {
  const response = await new Promise(resolve => {
    app.createCube(formatSlicesBlock2, resolve).then(e => e.close());
  })
  return processSlicesBlock(response)
}

async function requestRegionSlicesBlock1(app) {
  const response = await new Promise(resolve => {
    app.createCube(regionSlicesBlock1, resolve).then(e => e.close());
  })
  return processSlicesBlock(response)
}

async function requestRegionSlicesBlock2(app) {
  const response = await new Promise(resolve => {
    app.createCube(regionSlicesBlock2, resolve).then(e => e.close());
  })
  return processSlicesBlock(response)
}

async function requestChartRegionSlices(app) {
  const response = await new Promise(resolve => {
    app.createCube(chartRegionSlices, resolve).then(e => e.close());
  })
  return processChartsSlices(response)
}

async function requestChartFormatSlices(app) {
  const response = await new Promise(resolve => {
    app.createCube(chartFormatSlices, resolve).then(e => e.close());
  })
  return processChartsSlices(response)
}

async function qlikRequestRegions(app) {
  const tasks = [
    requestRegionSlicesBlock1(app),
    requestRegionSlicesBlock2(app),
  ]
  const results = await Promise.all(tasks);
  return results;
}

async function qlikRequestFormats(app) {
  const tasks = [
    requestFormatSlicesBlock1(app),
    requestFormatSlicesBlock2(app),
  ]
  const results = await Promise.all(tasks);  
  return results;
}

async function qlikRequestCharts(app) {
  const tasks = [
    requestChartFormatSlices(app),
    requestChartRegionSlices(app),
  ]
  const results = await Promise.all(tasks);
  const result1 = Object.assign({}, ...results[0].groups.map(item => ({ [item.name] : {...item}})))
  const result2 = Object.assign({}, ...results[1].groups.map(item => ({ [item.name] : {...item}})))
  return [result1, result2];;
}

async function qlikRequestChartsSliceFromMainTable(app) {
  const graphs = await requestChartSliceFromMainTable(app);
  return Object.assign({}, ...graphs.groups.map(item => ({ [item.id] : {...item}})))
}

async function qlikUpdateFilters(app, { conditions, date, datePoP, columnPrecision, datePrecision, dynamics, units }) {
  console.log("UNITS", units)
  await qlikRequestDatesUpdate(app, date, datePoP, datePrecision);
  await qlikRequestFiltersUpdate(app, conditions);
  await qlikRequestPrecisionsUpdate(app, [columnPrecision, dynamics, units, datePrecision]);
  return Promise.resolve();
}

export async function qlikRequestFinancialOverviewData(app, filters, id, type) {
  if (type === 'meta') {
    const tasks = [
      callApi(qlikRequestDates(app), "qlikRequestDates"),
      callApi(qlikRequestFilterState(app), "qlikRequestFilterState"),
      callApi(qlikRequestPrecisions(app), "qlikRequestPrecisions")
    ]
    const results = await Promise.all(tasks);
    return { dates: results[0], filter: results[1], precision: results[2] }
  } else if (type === 'table') {
    const block = await qlikRequestMainTableBlock(app);
    const graph = id == '7369' || id == '7487' || id == '7492' || id == '7494' || id == '7575' || id == '7591' ?
      await qlikRequestChartsSliceFromMainTable(app) :
      await qlickRequestChartsMainTable(app);
    return [block, graph];
  } else if (type === 'formats') {
    return await qlikRequestFormats(app);
  } else if (type === 'regions') {
    return await qlikRequestRegions(app);
  } else if (type === 'graphs') {
    return await qlikRequestCharts(app);
  }
  return null;
}

function qlikSelectIndicator(app, value) {
  return app.field(config.indicators).clear().then(() => app.field(config.indicators).selectValues([value], true, true));
}

export async function qlikRequestFinancialSlices(app, indicator, filters, type) {
  const foundIndicator = findIndicator(indicator);
  const { label, id } = foundIndicator;
  console.log("SLICES STARTED", type, label, id, foundIndicator)
  if (type === 'meta') {
    if (filters && !filters.fetch) await callApi(qlikSelectIndicator(app, label), "qlikSelectIndicator");
    if (filters && !filters.initial && !filters.noUpdate) await callApi(qlikUpdateFilters(app, filters), "qlikUpdateFilters");
  }
  const slices = await qlikRequestFinancialOverviewData(app, filters, id, type);
  console.log("SLICES FINISHED", type)
  return slices;
}
