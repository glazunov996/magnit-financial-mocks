// запрос по фильтру магазин
export async function requestFilterShop(app, areaConfig) {
  const qTop = areaConfig && areaConfig.qTop || 0;
  const qLeft = areaConfig && areaConfig.qLeft || 0;
  return new Promise(resolve => {
      app.createCube({ 
          "qInitialDataFetch": [
              {
                  "qHeight": 10000 / 2,
                  "qWidth": 2,
                  "qTop": qTop || 0 ,
                  "qLeft": qLeft || 0,
              }
          ],
          "qDimensions": [
              {
                  "qDef": {
                      "qFieldDefs": [
                          "Магазин"
                      ],
                      //СОРТИРОВКА
                      "qSortCriterias": [{
                          "qSortByAscii": 1,
                      }],
                  },
                  "qNullSuppression": true,
              }
          ],
          "qMeasures": [
              {
                  "qLabel": "МераДляСправочника",
                  "qLibraryId": "amxknB",
              }
          ],
          "qSuppressZero": false,
          "qSuppressMissing": false,
          "qMode": "S",
          "qInterColumnSortOrder": [],
          "qStateName": "$"
          }, reply => resolve({reply, name}))
          .then(model => model.close());
  })
}

// обработка ответа фильтра магазинов
export function processFilterShop(reply){
  const matrix = reply.qHyperCube.qDataPages[0].qMatrix;
  const items = [];
  matrix.forEach( row => {
      let item = {
          label: row[0].qText,
          value: row[0].qText,
          picked: row[0].qState == 'S' ? true : false ,
          disable: row[0].qState == 'X' ? true: false ,
      }
      items.push(item)
  })
  return items;
}

//запрос на оставшие магазины
export async function requestGetRemainingShops(app, countRowsInCube, countRowsInFilter ){
  console.info(countRowsInCube, countRowsInFilter );
  // кол-во запросов
  const countRequests = Math.ceil( (countRowsInFilter - countRowsInCube) / countRowsInCube);
  console.log('count request for remaining shops: ', countRequests);
  // массив запросов
  const requests = [];
  for(let i=1; i<=6; i++  ){
      const areaConfig = {
          qTop: countRowsInCube * i
      }
      requests.push(requestFilterShop(app, areaConfig))
  }
  return Promise.all(requests)
}

// запрашиваем все магазины 
