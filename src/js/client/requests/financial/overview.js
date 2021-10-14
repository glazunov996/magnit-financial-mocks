/* eslint prefer-destructuring: 'off' */

import { default as config } from 'configs/client.json';
import { default as mainTableBlock1 } from 'configs/requests/financial/overview/mainTableBlock1.json';
import { default as mainTableBlock2 } from 'configs/requests/financial/overview/mainTableBlock2.json';
import { default as formatDeviationsCountBlock1 } from 'configs/requests/financial/overview/formatDeviationsCountBlock1.json';
import { default as formatDeviationsCountBlock2 } from 'configs/requests/financial/overview/formatDeviationsCountBlock2.json';
import { default as regionDeviationsCountBlock1 } from 'configs/requests/financial/overview/regionDeviationsCountBlock1.json';
import { default as regionDeviationsCountBlock2 } from 'configs/requests/financial/overview/regionDeviationsCountBlock2.json';
import { default as regionDeviationsCountAbsoluteBlock1 } from 'configs/requests/financial/overview/regionDeviationsCountAbsoluteBlock1.json';
import { default as regionDeviationsCountAbsoluteBlock2 } from 'configs/requests/financial/overview/regionDeviationsCountAbsoluteBlock2.json';
import { default as chartsMainTable } from 'configs/requests/financial/overview/chartsMainTable.json';
import { qlikRequestDates, qlikRequestDatesUpdate } from './dates';
import { qlikRequestFilterState, qlikRequestFiltersUpdate, qlikRequestFilterShop } from './filter';
import { qlikRequestPrecisions, qlikRequestPrecisionsUpdate } from './precision';
import {
  requestFormatDeviationsCountBlock1_Month,
  requestFormatDeviationsCountBlock1_Quarter,
  requestFormatDeviationsCountBlock1_Year,
  requestFormatDeviationsCountBlock1_Month_Absolute,
  requestFormatDeviationsCountBlock1_Quarter_Absolute,
  requestFormatDeviationsCountBlock1_Year_Absolute,
  requestFormatDeviationsCountBlock2_Quarter,
  requestFormatDeviationsCountBlock2_Year,
  requestFormatDeviationsCountBlock2_Quarter_Absolute,
  requestFormatDeviationsCountBlock2_Year_Absolute,
  requestRegionDeviationsCountBlock1_Month,
  requestRegionDeviationsCountBlock1_Quarter,
  requestRegionDeviationsCountBlock1_Year,
  requestRegionDeviationsCountBlock1_Month_Absolute,
  requestRegionDeviationsCountBlock1_Quarter_Absolute,
  requestRegionDeviationsCountBlock1_Year_Absolute,
  requestRegionDeviationsCountBlock2_Quarter,
  requestRegionDeviationsCountBlock2_Year,
  requestRegionDeviationsCountBlock2_Quarter_Absolute,
  requestRegionDeviationsCountBlock2_Year_Absolute,
} from './deviations';

import callApi from 'utilities/callApi'

import * as _ from 'lodash';

const FormatDeviationsRequestMap = {
  block1_1_1: requestFormatDeviationsCountBlock1_Month,
  block1_1_2: requestFormatDeviationsCountBlock1_Month_Absolute,
  block1_2_1: requestFormatDeviationsCountBlock1_Quarter,
  block1_2_2: requestFormatDeviationsCountBlock1_Quarter_Absolute,
  block1_3_1: requestFormatDeviationsCountBlock1_Year,
  block1_3_2: requestFormatDeviationsCountBlock1_Year_Absolute,
  block2_2_1: requestFormatDeviationsCountBlock2_Quarter,
  block2_2_2: requestFormatDeviationsCountBlock2_Quarter_Absolute,
  block2_3_1: requestFormatDeviationsCountBlock2_Year,
  block2_3_2: requestFormatDeviationsCountBlock2_Year_Absolute,
}

const RegionDeviationsRequestMap = {
  block1_1_1: requestRegionDeviationsCountBlock1_Month,
  block1_1_2: requestRegionDeviationsCountBlock1_Month_Absolute,
  block1_2_1: requestRegionDeviationsCountBlock1_Quarter,
  block1_2_2: requestRegionDeviationsCountBlock1_Quarter_Absolute,
  block1_3_1: requestRegionDeviationsCountBlock1_Year,
  block1_3_2: requestRegionDeviationsCountBlock1_Year_Absolute,
  block2_2_1: requestRegionDeviationsCountBlock2_Quarter,
  block2_2_2: requestRegionDeviationsCountBlock2_Quarter_Absolute,
  block2_3_1: requestRegionDeviationsCountBlock2_Year,
  block2_3_2: requestRegionDeviationsCountBlock2_Year_Absolute,
}

function processMainTableBlock(reply) {
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
  const DATA = { rows: []};
  for(let i=0; i < matrix.length; i++){
    const row = matrix[i];
    const dataRow = { column: {}, tooltip: {} };
    DATA.rows.push(dataRow);
    dataRow.id = row[0].qNum;
    dataRow.name = row[1].qText;
    dataRow.column.fact = row[2];
    dataRow.column.factPercent = row[3];
    dataRow.column.vsPpPercent = row[4];
    dataRow.column.vsPp = row[5];
    dataRow.column.vsBudgetPercent = row[6];
    dataRow.column.vsBudget = row[7];
    
    dataRow.column.tooltip = {
      factPercent: dataRow.column.factPercent,
      fact: dataRow.column.fact,
      vsBudgetPercent: dataRow.column.vsBudgetPercent,
      vsBudget: dataRow.column.vsBudget,
      budgetPercent: row[8],
      budget: row[9],
      vsFactPpPercent: dataRow.column.vsPpPercent,
      vsFactPp: dataRow.column.vsPp,
      factPpPercent: row[10],
      factPp: row[11],
    }
    dataRow.column.arrow = row[12];
  }
  return DATA;
}

async function requestMainTableBlock1(app) {
  const response = await new Promise(resolve => {
    app.createCube(mainTableBlock1, resolve).then(e => e.close());
  })
  return processMainTableBlock(response);
}

async function requestMainTableBlock2(app) {
  const response = await new Promise(resolve => {
    app.createCube(mainTableBlock2, resolve).then(e => e.close());
  })
  return processMainTableBlock(response);
}

function processDeviationsCountBlock1(reply) {
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
		let DATA = { rows: []};
		for(let i=0; i < matrix.length; i++){
			let row = matrix[i];
			let item = {
				id: row[0].qNum,
				countDeviation: +row[1].qNum,
				column: {
					budgetPercent: row[2],
          vsPpPercent: row[3]				
				}
			}
			DATA.rows.push(item);
		}
		return DATA;
}

function processDeviationsCountBlock2(reply) {
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
  let DATA = { rows: []};
  for(let i=0; i < matrix.length; i++){
    let row = matrix[i];
    let item = {
      id: row[0].qNum,
      column: {
        budgetPercent: row[1],
        vsPpPercent: row[2]
        
      }
    }
    DATA.rows.push(item);
  }
  return DATA;
}

async function requestFormatDeviationsCountBlock1(app, name) {
  const func = FormatDeviationsRequestMap[name];
  const response = await func(app);
  return processDeviationsCountBlock1(response);
}

async function requestFormatDeviationsCountBlock2(app, name) {
  const func = FormatDeviationsRequestMap[name];
  const response = await func(app);
  return processDeviationsCountBlock2(response);
}

async function requestRegionDeviationsCountBlock1(app, name) {
  const func = RegionDeviationsRequestMap[name];  
  const response = await func(app);
  return processDeviationsCountBlock1(response);
}

async function requestRegionDeviationsCountBlock2(app, name) {
  const func = RegionDeviationsRequestMap[name];  
  const response = await func(app);
  return processDeviationsCountBlock2(response);
}

export async function qlikRequestMainTableBlock(app) {
  const data = await Promise.all([
    requestMainTableBlock1(app), 
    requestMainTableBlock2(app)
  ])  
  return data; 
}

export async function qlickRequestChartsMainTable(app) {
  const graphs = await requestChartsMainTable(app);
  return Object.assign({}, ...graphs.groups.map(item => ({ [item.id] : {...item}})))
}

function parseRowsForFinancialTableCharts(headers, rows, seriesSettings ){
  let DATA = { groups: [], labels: []};
  let currGroup;

  let lastGroupName = '';
  let lastLabel = "";

  for(let i=0; i < rows.length; i++){
      //if(rows[i][1].qText != lastGroupName){
    let id = rows[i][0].qText;
    lastGroupName = id;//rows[i][1].qText;

    currGroup = DATA.groups.find( function(g){ return g.name == lastGroupName})
    if(!currGroup){
      currGroup = { id: id, name : lastGroupName, series: [] };
      DATA.groups.push(currGroup);
    }
      
    let seria;
    for(let j=2; j < rows[i].length; j++){
        //поиск units среди столбцов данных
      if(j > 2 && seriesSettings[j-3].type == 'units'){
        currGroup.units = currGroup.units || { axisYLeft: rows[i][j].qText};
        continue;
      }
      seria = currGroup.series.find(function(s){ return s.name == headers[j]});
      if(!seria && rows[i][j].qState == "L"){ //не измерение
        seria = { name: headers[j], data: [] };
        currGroup.series.push(seria);
      }
      if(rows[i][j].qState != "L"){
        //console.info('is dimenstion', rows[i][j].qText, "j", j)
        if(DATA.labels.indexOf(rows[i][1].qText) == -1){
          DATA.labels.push(rows[i][1].qText); //
        }
        lastLabel = rows[i][1].qText;

      } else if(rows[i][j].qState == "L"){ //мера
        //console.info('j', j)
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

export function processChartsMainTable(reply) {
  let coppyedHeaders = [];
  reply.qHyperCube.qDimensionInfo.forEach( (dim) =>  coppyedHeaders.push(dim.qFallbackTitle) )
  reply.qHyperCube.qMeasureInfo.forEach(( measureName)=> coppyedHeaders.push(measureName.qFallbackTitle));

  let coppyedRows = _.cloneDeep(reply.qHyperCube.qDataPages[0].qMatrix);

  let seriesSettings = [
    { type: 'line', color: '#34d800', axisY: 'left'},
    { type: 'none', color: '#ffd700', axisY: 'left'},
    { type: 'none', color: '#ff2300', axisY: 'left'},
    { type: 'none', color: '#f0d700', axisY: 'left'},
    { type: 'none', color: '#1536ad', axisY: 'left'},
    { type: 'bar', color: '#8f06f9', axisY: 'rightDown'},
    { type: 'bar', color: '#8506a9', axisY: 'rightDown'},
    { type: 'units'}
  ];
  const DATA = parseRowsForFinancialTableCharts(coppyedHeaders, coppyedRows, seriesSettings);	
  return DATA;
}

async function requestChartsMainTable(app) {
  const response = await new Promise(resolve => {
    app.createCube(chartsMainTable, resolve).then(e => e.close());
  })
  return processChartsMainTable(response);
}

function getDeviationName(block, precision, units) {
  return `${block}_${precision}_${units}`;
}

async function qlikRequestFormatAndRegionDeviations(app, { columnPrecision, datePrecision, units }) {
  const tasks = [];
  console.log("qlikRequestFormatAndRegionDeviations", columnPrecision, datePrecision, units)
  tasks.push(requestFormatDeviationsCountBlock1(app, getDeviationName("block1", datePrecision, units)));
  tasks.push(requestFormatDeviationsCountBlock2(app, getDeviationName("block2", columnPrecision, units)));
  tasks.push(requestRegionDeviationsCountBlock1(app, getDeviationName("block1", datePrecision, units)));
  tasks.push(requestRegionDeviationsCountBlock2(app, getDeviationName("block2", columnPrecision, units)));
  const results = await Promise.all(tasks);
  const format1Map = Object.assign({}, ...results[0].rows.map(item => ({ [item.id] : {...item}})))
  const format2Map = Object.assign({}, ...results[1].rows.map(item => ({ [item.id] : {...item}})))
  const region1Map = Object.assign({}, ...results[2].rows.map(item => ({ [item.id] : {...item}})))
  const region2Map = Object.assign({}, ...results[3].rows.map(item => ({ [item.id] : {...item}})))
  return {
    formats: [ format1Map, format2Map],
    regions: [ region1Map, region2Map]
  } 
}

async function qlikUpdateFilters(app, { conditions, date, datePoP, columnPrecision, datePrecision, dynamics, units }) {
  console.log("qlikUpdateFilters", conditions, date, datePoP, columnPrecision, datePrecision, dynamics, units);
  await qlikRequestDatesUpdate(app, date, datePoP, datePrecision);
  await qlikRequestFiltersUpdate(app, conditions);
  await qlikRequestPrecisionsUpdate(app, [columnPrecision, dynamics, units, datePrecision]);
  return Promise.resolve();
}

export async function qlikRequestFinancialOverviewData(app, filters, type) {  
  console.log("OVERVIEW STARTED ", type)
  if (type === 'meta') {
    const tasks = [
      callApi(qlikRequestDates(app), "qlikRequestDates"),
      callApi(qlikRequestFilterState(app), "qlikRequestFilterState"),
      callApi(qlikRequestPrecisions(app), "qlikRequestPrecisions")
    ]
    const results = await Promise.all(tasks);
    return { dates: results[0], filter: results[1], precision: results[2], shop: results[3] }
  } else if (type === 'columns') {
    return await qlikRequestMainTableBlock(app);
  } else if (type === 'graphs') {
    return await qlickRequestChartsMainTable(app);
  } else if (type === 'deviations') {
    return await qlikRequestFormatAndRegionDeviations(app, filters);
  } 
  return null;
}

function qlikResetIndicators(app) {
  return app.field(config.indicators).clear();
}

export async function qlikRequestFinancialOverview(app, filters, type) {
  if (type === 'meta') {
    await qlikResetIndicators(app);
    console.log("FILTERS", filters);
    if (filters && !filters.initial && !filters.noUpdate) await qlikUpdateFilters(app, filters);
  }
  const overview = await callApi(qlikRequestFinancialOverviewData(app, filters, type), "qlikRequestFinancialOverviewData");
  return overview;
}
