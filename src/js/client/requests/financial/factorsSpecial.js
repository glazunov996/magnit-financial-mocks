export async function requestFactorsDataEBITDABlock1(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7_EBITDA",
              "qLibraryId": "qyyUp",
              "qNullSuppression": true,
          },
          {
              "qLabel": "DESCRIPTION7_EBITDA",
              "qLibraryId": "Ztdm",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "Мосты.Факт % от выр. месяц_EBITDA",
              "qLibraryId": "d29dd7b7-71e6-4d6f-bfaf-755f507043d9",
          },
          {
              "qLabel": "Мосты.Бюджет % от выр. месяц_EBITDA",
              "qLibraryId": "33612147-e1f9-40a6-976d-297677cdba2a",
          }        
      ],
      "qSuppressZero": true,
      "qSuppressMissing": true,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve(reply))
      .then(model => model.close());
  })
}

export async function requestFactorsDataEBITDABlock2(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7_EBITDA",
              "qLibraryId": "qyyUp",
              "qNullSuppression": true,
          },
          {
              "qLabel": "DESCRIPTION7_EBITDA",
              "qLibraryId": "Ztdm",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "Мосты.Факт % от выр._EBITDA",
              "qLibraryId": "aa35b095-cb42-492a-a49e-96cc5ceef187",
          },
          {
              "qLabel": "Мосты.Бюджет % от выр._EBITDA",
              "qLibraryId": "98a66aa4-2863-4ba8-bfb3-526cebc28283",
          }
      ],
      "qSuppressZero": true,
      "qSuppressMissing": true,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve(reply))
      .then(model => model.close());
  })
}

export async function requestFactorsDataNetProfitBlock1(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qDef": {
                  "qFieldDefs": [
                      "PNL_ITEM_ID7_NET_PROFIT"
                  ]
              },
              "qNullSuppression": true,
          },
          {
              "qDef": {
                  "qFieldDefs": [
                      "DESCRIPTION7_NET_PROFIT"
                  ]
              },
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "Мосты.Факт % от выр. месяц_ЧистаяПрибыль",
              "qLibraryId": "ead3f90f-ed64-44f0-8890-47e68cdc9a59",
          },
          {
              "qLabel": "Мосты.Бюджет % от выр. месяц_ЧистаяПрибыл",
              "qLibraryId": "69f917ad-b451-409d-b95a-a3afd00d2d3c",
          }
      ],
      "qSuppressZero": true,
      "qSuppressMissing": true,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve(reply))
      .then(model => model.close());
  })
}

export async function requestFactorsDataNetProfitBlock2(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qDef": {
                  "qFieldDefs": [
                      "PNL_ITEM_ID7_NET_PROFIT"
                  ]
              },
              "qNullSuppression": true,
          },
          {
              "qDef": {
                  "qFieldDefs": [
                      "DESCRIPTION7_NET_PROFIT"
                  ]
              },
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "Мосты.Факт % от выр._ЧистаяПрибыль",
              "qLibraryId": "aff3181f-9f83-4b9f-8905-2e81adc88538",
          },
          {
              "qLabel": "Мосты.Бюджет % от выр._ЧистаяПрибыл",
              "qLibraryId": "10e2617e-80a9-419f-9c7b-f0beca9cc397",
          }
      ],
      "qSuppressZero": true,
      "qSuppressMissing": true,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve(reply))
      .then(model => model.close());
  })
}

export async function requestFactorsDataGrossRevenueBlock1(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qDef": {
                  "qFieldDefs": [
                      "PNL_ITEM_ID7_GROSS_REVENUE"
                  ]
              },
              "qNullSuppression": true,
          },
          {
              "qDef": {
                  "qFieldDefs": [
                      "DESCRIPTION7_GROSS_REVENUE"
                  ]
              },
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "Мосты.Факт % от выр. месяц_ВаловыйДоход",
              "qLibraryId": "17e3c022-8740-4e93-a16f-f66d470d8df3",
          },
          {
              "qLabel": "Мосты.Бюджет % от выр. месяц_ВаловыйДоход",
              "qLibraryId": "4c211a97-39b8-4d28-9740-474ad262dcae",
          }        
      ],
      "qSuppressZero": true,
      "qSuppressMissing": true,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve(reply))
      .then(model => model.close());
  })
}
  
export async function requestFactorsDataGrossRevenueBlock2(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qDef": {
                  "qFieldDefs": [
                      "PNL_ITEM_ID7_GROSS_REVENUE"
                  ]
              },
              "qNullSuppression": true,
          },
          {
              "qDef": {
                  "qFieldDefs": [
                      "DESCRIPTION7_GROSS_REVENUE"
                  ]
              },
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "Мосты.Факт % от выр._ВаловыйДоход",
              "qLibraryId": "0d921a6d-2c2a-4627-8b9d-3a0da96b5c17",
          },
          {
              "qLabel": "Мосты.Бюджет % от выр._ВаловыйДоход",
              "qLibraryId": "91ff3efb-f836-4038-912c-9d1b2c188e99",
          }
      ],
      "qSuppressZero": true,
      "qSuppressMissing": true,
      "qMode": "S",
      "qInterColumnSortOrder": [],
      "qStateName": "$"
      }, reply => resolve(reply))
      .then(model => model.close());
  })
}