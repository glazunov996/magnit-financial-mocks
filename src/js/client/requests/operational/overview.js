import { default as indicatorsMainTable } from 'configs/requests/operational/overview/indicatorsMainTable.json';
import { over } from 'lodash';
import { qlikRequestDates, qlikRequestDatesUpdate } from '../financial/dates';
import { qlikRequestFilterState, qlikRequestFiltersUpdate } from '../financial/filter';
import { qlikRequestPrecisions, qlikRequestPrecisionsUpdate } from '../financial/precision';

function processRTOMainTableBlock(name, row){
	return {
		id: row[0].qNum,
		name, 
		block: {
			arrow: row[1],
			fact: row[2],
			factPp: row[3],
			factVsPp: row[4],
			factVsPpPercent: row[5],
			budget: row[6],
			factVsBudget: row[7],
			factVsBudgetPercent: row[8]
		}
	}
}

function processDeviationRTO(name, row){
	return {
		id: row[0],
		name,
		count: row[1],
		block1: {
			factVsPp: row[2],
			factVsBudget: row[3]
		},
		block2: {
			factVsPp: row[4],
			factVsBudget: row[5]
		}
	}
}

async function requestWithCube(app, name, dimensions, measures){
  return new Promise( ( resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
        {
          "qHeight": 20,
          "qWidth": dimensions.length + measures.length
        }
      ],
      "qDimensions": dimensions,
      "qMeasures": measures,
      "qSuppressZero": false,
      "qSuppressMissing": false,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve( { reply, name } ) );
    }
  )
}

async function requestRTOMainTableBlock(app, blockNumber) {
	const rtoIndicator = indicatorsMainTable.find( it => it.id === 1)
	if(!rtoIndicator) throw new Error('indicator RTO by id 1 not found');
	const blockData = rtoIndicator['block'+ blockNumber];
	if(!blockData) throw new Error('block'+ blockNumber + ' not found in rto');
	
	return requestWithCube(app, 
						rtoIndicator.name,
						[rtoIndicator.dimension], 
						[blockData.arrow, blockData.fact, blockData.factPp, blockData.factVsPp, blockData.factVsPpPercent, blockData.budget, blockData.factVsBudget, blockData.factVsBudgetPercent])
}

async function requestRTOMainTableBlock1(app) {
  return requestRTOMainTableBlock(app, 1).then( ( { reply, name } ) => {
    const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
    if(matrix.length == 0) throw new Error('empty reply for RTO main table')
    const rtoData = processRTOMainTableBlock(name, matrix[0]);
    return rtoData;
  })
  .catch(e => console.error('Error while load results for main table RTO',e))
}

async function requestRTOMainTableBlock2(app) {
  return requestRTOMainTableBlock(app, 2).then( ( { reply, name } ) => {
    const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
    if(matrix.length == 0) throw new Error('empty reply for RTO main table')
    const rtoData = processRTOMainTableBlock(name, matrix[0]);
    return rtoData;
  })
  .catch(e => console.error('Error while load results for main table RTO',e))
}

async function requestIndicatorForMainTableBlock(app, idIndicator, blockNumber){
	const indicator = indicatorsMainTable.find( it => it.id == idIndicator);
	if(!indicator) throw new Error('not found indicator for main table by id ', idIndicator );
	const blockData = indicator['block' + blockNumber];
	if(!blockData) throw new Error('blockData not found for number ', blockNumber);
	return requestWithCube(app, 
						indicator.name,
						[indicator.dimension],
						[blockData.arrow, blockData.fact, blockData.factPp, blockData.factVsPp, blockData.factVsPpPercent])
}

async function requestsDataForMainTableBlock1(app){
	const promisesBlock1 = indicatorsMainTable.filter(it=> it.id !== 1)
					.map( indicator => requestIndicatorForMainTableBlock(app, indicator.id, 1)); 
  return Promise.all(promisesBlock1).then(results => {
      const allIndicatorsData = [];
      results.forEach( ({reply, name} ) => {
          const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
          const blockData1 = processRTOMainTableBlock(name, matrix[0]);
          allIndicatorsData.push(blockData1);
      })
      return allIndicatorsData;
  })
  .catch(e => console.error('Error while load results for main table block 1',e));
}

async function requestsDataForMainTableBlock2(app){
	const promisesBlock1 = indicatorsMainTable.filter(it=> it.id !== 1)
					.map( indicator => requestIndicatorForMainTableBlock(app, indicator.id, 2)); 
  return Promise.all(promisesBlock1).then(results => {
    const allIndicatorsData = [];
    results.forEach( ({reply, name} ) => {
        const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
        const blockData1 = processRTOMainTableBlock(name, matrix[0]);
        allIndicatorsData.push(blockData1);
    })
    return allIndicatorsData;
  })
  .catch(e => console.error('Error while load results for main table block 2',e));
}

async function requestDeviationRegionsRTO(app){
	const rtoIndicator = indicatorsMainTable.find( it => it.id === 1);
	if(!rtoIndicator) throw new Error('indicator RTO by id 1 not found');
  return requestWithCube(app,
							rtoIndicator.name,
							[rtoIndicator.dimension],
							[rtoIndicator.block1.deviationRegions.count, rtoIndicator.block1.deviationRegions.factVsPp, rtoIndicator.block1.deviationRegions.factVsBudget,
               rtoIndicator.block2.deviationRegions.factVsPp, rtoIndicator.block2.deviationRegions.factVsBudget ])
    .then( ({reply, name}) => {
      const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
      if(matrix.length == 0) throw new Error('empty reply for RTO main table deviation regions')
      const rtoDeviationRegions = processDeviationRTO(name, matrix[0])
      return rtoDeviationRegions;
    })  
}

async function requestDeviationFormatsRTO(app){
	const rtoIndicator = indicatorsMainTable.find( it => it.id === 1);
	if(!rtoIndicator) throw new Error('indicator RTO by id 1 not found');
	return requestWithCube(app,
							rtoIndicator.name,
							[rtoIndicator.dimension],
							[rtoIndicator.block1.deviationFormats.count, rtoIndicator.block1.deviationFormats.factVsPp, rtoIndicator.block1.deviationFormats.factVsBudget,
               rtoIndicator.block2.deviationFormats.factVsPp, rtoIndicator.block2.deviationFormats.factVsBudget ])
    .then( ({reply, name}) => {
      const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
      if(matrix.length == 0) throw new Error('empty reply for RTO main table deviation formats')
      const rtoDeviationFormats = processDeviationRTO(name, matrix[0])
      return rtoDeviationFormats;
    })
}

async function requestDeviationRegionsIndicator(app, idIndicator){
	const indicator = indicatorsMainTable.find( it => it.id == idIndicator);
	if(!indicator) throw new Error('indicator by id '+ idIndicator +' not found');
	return requestWithCube(app,
							indicator.name,
							[indicator.dimension],
							[indicator.block1.deviationRegions.count, indicator.block1.deviationRegions.factVsPp,
							 indicator.block2.deviationRegions.factVsPp ])
}

async function requestDeviationFormatsIndicator(app, idIndicator){
	const indicator = indicatorsMainTable.find( it => it.id == idIndicator);
	if(!indicator) throw new Error('indicator by id '+ idIndicator +' not found');
	return requestWithCube(app,
							indicator.name,
							[indicator.dimension],
							[indicator.block1.deviationFormats.count, indicator.block1.deviationFormats.factVsPp,
							 indicator.block2.deviationFormats.factVsPp ])
}

async function requestDeviationRegionsAllIndicators(app){
	const promisesDeviation = indicatorsMainTable.filter( it => it.id != 1)
						.map(it => requestDeviationRegionsIndicator(app, it.id));
  return Promise.all(promisesDeviation).then(results => {
      const allIndicatorsDeviationRegions = [];
      results.forEach( ({reply, name}) => {
          const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
          if(matrix.length == 0) throw new Error('empty reply for main table deviation regions')
          const data = processDeviationRTO(name, matrix[0]);
          allIndicatorsDeviationRegions.push(data)
      })
      
      return allIndicatorsDeviationRegions;
  });
}

async function requestDeviationFormatsAllIndicators(app){
	const promisesDeviation = indicatorsMainTable.filter( it => it.id != 1)
						.map(it => requestDeviationFormatsIndicator(app, it.id));
  return Promise.all(promisesDeviation).then(results => {
    const allIndicatorsDeviationFormats = [];
    results.forEach( ({reply, name}) => {
        const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
        if(matrix.length == 0) throw new Error('empty reply for main table deviation regions')
        const data = processDeviationRTO(name, matrix[0]);
        allIndicatorsDeviationFormats.push(data)
    })
    
    return allIndicatorsDeviationFormats;
});
}

async function qlikRequestOperationalOverviewTableData(app) {
  const mainTableBlock1 = await requestsDataForMainTableBlock1(app);
  console.log("main table block1", mainTableBlock1);
  const mainTableBlock2 = await requestsDataForMainTableBlock2(app);
  console.log("main table block2", mainTableBlock2);
  //const deviationRegionsAll = await requestDeviationRegionsAllIndicators(app);
  //console.log('deviation Regions all', deviationRegionsAll);
  //const deviationFormatsAll = await requestDeviationFormatsAllIndicators(app);
  //console.log('deviation Formats all', deviationFormatsAll);
  const newData = mainTableBlock1.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
      column1: item.block,
      column2: mainTableBlock2[index].block
    }
  })
  return newData;
}

function zipOperationalOverview(data, filter, precision, dates) {
  const overviewData = {
    dates,
    filter,
    precision,
    data,
  };
  return overviewData;
}

export async function qlikRequestOperationalOverviewData(app, app2, filters) {
  console.log("OVERVIEW STARTED")
  const dates = await qlikRequestDates(app);
  const filter = await qlikRequestFilterState(app);
  const precision = await qlikRequestPrecisions(app);
  let data = []
  if (filters && !filters.initial && !filters.noUpdate) {
    data = await qlikRequestOperationalOverviewTableData(app2);
  }
  const overview = zipOperationalOverview(data, filter, precision, dates);
  console.log("OVERVIEW FINISHED", overview);
  return overview;
}

export async function qlikRequestOperationalOverview(app, app2, filters) {
  const overview = await qlikRequestOperationalOverviewData(app, app2, filters);
  return overview;
}
