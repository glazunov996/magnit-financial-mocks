export async function requestFormatDeviationsCountBlock1_Month(app){
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
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.Кол-во отклонений, месяц",
              "qLibraryId": "c19f6bd1-2655-42df-8d47-7b3121d94333",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от бюджета % месяц",
              "qLibraryId": "5b1287bb-7204-4364-9ea8-77351158cc35",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от п.п. % месяц",
              "qLibraryId": "a42faf21-0086-4f35-93da-db90bc040b9e",
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

export async function requestFormatDeviationsCountBlock1_Quarter(app){
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
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.Кол-во отклонений, месяц_квартал",
              "qLibraryId": "5f86e6f8-ebfb-4074-b1d1-29e535dbaa0c",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от бюджета % месяц_квартал",
              "qLibraryId": "7ac1261f-0932-49b4-9668-67d57039a750",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от п.п. % месяц_квартал",
              "qLibraryId": "3e240c18-2525-4698-a0ae-46adad8dc8b9",
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

export async function requestFormatDeviationsCountBlock1_Year(app){
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
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.Кол-во отклонений, месяц_год",
              "qLibraryId": "b0106164-b0cf-4456-bbf5-563e6f35aa16",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от бюджета % месяц_год",
              "qLibraryId": "1fff4e3a-0876-4c51-9ba2-266b01dd671b",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от п.п. % месяц_год",
              "qLibraryId": "6e9b07ae-fa16-4988-80b6-e6ee723be6ad",
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

export async function requestFormatDeviationsCountBlock1_Month_Absolute(app){
  return new Promise( ( resolve, reject) => {
    app.createCube({
        "qInitialDataFetch": [
            {
                "qHeight": 200,
                "qWidth": 11
            }
        ],
        "qDimensions": [
            {
                "qLabel": "PNL_ITEM_ID7",
                "qLibraryId": "fJjkWPP",
                "qNullSuppression": true,
            }
        ],
        "qMeasures": [
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_Кол-во отклонений, месяц",
                "qLibraryId": "4509e826-d3ec-4251-ab5a-13286a85dfbd",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от бюджета % месяц",
                "qLibraryId": "174f2855-f8fa-42f3-9240-a581b74a06f7",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от п.п. % месяц",
                "qLibraryId": "2099d171-20e2-476f-8c9b-9c89caf08045",
            }
        ],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qInterColumnSortOrder": [],
        "qStateName": "$"
        }, reply => resolve(reply))
        .then(model => model.close())
    })
}

export async function requestFormatDeviationsCountBlock1_Quarter_Absolute(app){
  return new Promise( ( resolve, reject) => {
    app.createCube({
        "qInitialDataFetch": [
            {
                "qHeight": 200,
                "qWidth": 11
            }
        ],
        "qDimensions": [
            {
                "qLabel": "PNL_ITEM_ID7",
                "qLibraryId": "fJjkWPP",
                "qNullSuppression": true,
            }
        ],
        "qMeasures": [
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_Кол-во отклонений, месяц_квартал",
                "qLibraryId": "41892336-15a9-4ad1-a7e2-0a5c8a4bd76f",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от бюджета % месяц_квартал",
                "qLibraryId": "5cb367eb-3833-45f5-b5d3-76d8cd78a2b8",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от п.п. % месяц_квартал",
                "qLibraryId": "74f09862-4296-4be2-b839-e150a43995da",
            }
        ],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qInterColumnSortOrder": [],
        "qStateName": "$"
        }, reply => resolve(reply))
        .then(model => model.close())
    })
}

export async function requestFormatDeviationsCountBlock1_Year_Absolute(app){
  return new Promise( ( resolve, reject) => {
    app.createCube({
        "qInitialDataFetch": [
            {
                "qHeight": 200,
                "qWidth": 11
            }
        ],
        "qDimensions": [
            {
                "qLabel": "PNL_ITEM_ID7",
                "qLibraryId": "fJjkWPP",
                "qNullSuppression": true,
            }
        ],
        "qMeasures": [
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_Кол-во отклонений, месяц_год",
                "qLibraryId": "a5cc5bf7-d6ec-43cc-843d-e4b5f063ea5d",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от бюджета % месяц_год",
                "qLibraryId": "bed4b304-f9dc-4bc4-abaa-7baacfc857dc",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от п.п. % месяц_год",
                "qLibraryId": "182a0be5-0d6d-4ddf-9d7e-9262b3bbaac8",
            }
        ],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qInterColumnSortOrder": [],
        "qStateName": "$"
        }, reply => resolve(reply))
        .then(model => model.close())
    })
}
  
export async function requestFormatDeviationsCountBlock2_Quarter(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
    "qInitialDataFetch": [
        {
            "qHeight": 200,
            "qWidth": 3
        }
    ],
    "qDimensions": [
        {
            "qLabel": "PNL_ITEM_ID7",
            "qLibraryId": "fJjkWPP",
            "qNullSuppression": true,
        }
    ],
    "qMeasures": [
        {
            "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от бюджета %_квартал",
            "qLibraryId": "3a18f190-096a-4ec0-bacc-6ea0b3834e70",
        },
        {
            "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от п.п. %_квартал",
            "qLibraryId": "1bed3047-2419-4d42-8f77-6562d4cfa8df",
        },
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

export async function requestFormatDeviationsCountBlock2_Year(app){
  return new Promise( (resolve, reject) => {
    app.createCube({
    "qInitialDataFetch": [
        {
            "qHeight": 200,
            "qWidth": 3
        }
    ],
    "qDimensions": [
        {
            "qLabel": "PNL_ITEM_ID7",
            "qLibraryId": "fJjkWPP",
            "qNullSuppression": true,
        }
    ],
    "qMeasures": [
        {
            "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от бюджета %_год",
            "qLibraryId": "8a880033-a7ef-48b0-b002-3baf87a1b17d",
        },
        {
            "qLabel": "ТаблКоличОтклоненийПоФорматам.По округу от п.п. %_год",
            "qLibraryId": "4351834c-cc35-4028-ace0-2a6223631688",
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

export async function requestFormatDeviationsCountBlock2_Quarter_Absolute(app){
  return new Promise( ( resolve, reject) => {
    app.createCube({
        "qInitialDataFetch": [
            {
                "qHeight": 200,
                "qWidth": 11
            }
        ],
        "qDimensions": [
            {
                "qLabel": "PNL_ITEM_ID7",
                "qLibraryId": "fJjkWPP",
                "qNullSuppression": true,
            }
        ],
        "qMeasures": [
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от бюджета %_квартал",
                "qLibraryId": "1fe61490-0d21-4f6c-b22f-777fa9b60e0a",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от п.п. %_квартал",
                "qLibraryId": "69147293-1521-4861-8b97-9781f544cdda",
            }
        ],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qInterColumnSortOrder": [],
        "qStateName": "$"
        }, reply => resolve(reply))
        .then(model => model.close())
    })
}

export async function requestFormatDeviationsCountBlock2_Year_Absolute(app){
  return new Promise( ( resolve, reject) => {
    app.createCube({
        "qInitialDataFetch": [
            {
                "qHeight": 200,
                "qWidth": 11
            }
        ],
        "qDimensions": [
            {
                "qLabel": "PNL_ITEM_ID7",
                "qLibraryId": "fJjkWPP",
                "qNullSuppression": true,
            }
        ],
        "qMeasures": [
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от бюджета %_год",
                "qLibraryId": "dfe30a86-9189-461f-87ff-7b58afab1455",
            },
            {
                "qLabel": "ТаблКоличОтклоненийПоФорматам.абс_По округу от п.п. %_год",
                "qLibraryId": "5d2246e2-e183-4605-965b-278d9a51c2c5",
            }
        ],
        "qSuppressZero": true,
        "qSuppressMissing": true,
        "qMode": "S",
        "qInterColumnSortOrder": [],
        "qStateName": "$"
        }, reply => resolve(reply))
        .then(model => model.close())
    })
}

export async function requestRegionDeviationsCountBlock1_Month(app){
  return new Promise( ( resolve, reject) => {
    app.createCube({
    "qInitialDataFetch": [
        {
            "qHeight": 200,
            "qWidth": 4
        }
    ],
    "qDimensions": [
        {
            "qLabel": "PNL_ITEM_ID7",
            "qLibraryId": "fJjkWPP",
            "qNullSuppression": true,
        }
    ],
    "qMeasures": [
        {
            "qLabel": "ТаблКоличОтклоненийПоОкругам.Кол-во отклонений, месяц",
            "qLibraryId": "jhTjk",
        },
        {
            "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от бюджета % месяц",
            "qLibraryId": "PCqN",
        },
        {
            "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от п.п. % месяц",
            "qLibraryId": "HBBRb",
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

export async function requestRegionDeviationsCountBlock1_Quarter(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.Кол-во отклонений, месяц_квартал",
              "qLibraryId": "ce404ff0-3d19-40a3-a47b-f6a64d2a7509",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от бюджета % месяц_квартал",
              "qLibraryId": "1571a12e-f918-45d3-9407-f379b451a4ac",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от п.п. % месяц_квартал",
              "qLibraryId": "9c26444e-1f4a-4f4d-b64d-d462ac75b67b",
          },
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

export async function requestRegionDeviationsCountBlock1_Year(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.Кол-во отклонений, месяц_год",
              "qLibraryId": "1c435dd2-9cd4-4644-ba30-d6d1000fbd80",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от бюджета % месяц_год",
              "qLibraryId": "823529d3-fd37-49fe-965e-d8b65da68ae3",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от п.п. % месяц_год",
              "qLibraryId": "4021e7ec-7145-49d0-8616-8a1daa5d78a7",
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

export async function requestRegionDeviationsCountBlock1_Month_Absolute(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_Кол-во отклонений, месяц",
              "qLibraryId": "478aad21-712c-43d3-ab50-d3748ade3867",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от бюджета % месяц",
              "qLibraryId": "c51d6e6f-65b4-483b-8390-6e10485800cb",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от п.п. % месяц",
              "qLibraryId": "66710b71-1f2c-4dd2-adda-42f8284a8dd8",
          },
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
  
export async function requestRegionDeviationsCountBlock1_Quarter_Absolute(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_Кол-во отклонений, месяц_квартал",
              "qLibraryId": "f09ec1ad-075e-4ddb-a774-76227f7e7c07",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от бюджета % месяц_квартал",
              "qLibraryId": "e86481e6-e878-4398-8541-4d6aa289eb6a",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от п.п. % месяц_квартал",
              "qLibraryId": "5d177f25-c5c8-4507-a94e-ed0f6b3911ed",
          },
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

export async function requestRegionDeviationsCountBlock1_Year_Absolute(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_Кол-во отклонений, месяц_год",
              "qLibraryId": "fb45d100-926d-47b0-9f32-5e23f5d7a13e",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от бюджета % месяц_год",
              "qLibraryId": "77ddef0a-383c-41fb-98c6-e0b8baee27be",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от п.п. % месяц_год",
              "qLibraryId": "8d528975-69e0-4d70-84cf-b56ea6940c8d",
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

export async function requestRegionDeviationsCountBlock2_Quarter(app){
  return new Promise( (resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 3
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от бюджета %_квартал",
              "qLibraryId": "f4e15dad-5b0f-4ef2-af18-e1c1c087bb72",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от п.п. %_квартал",
              "qLibraryId": "67386be7-c1b2-46f0-a072-b27bfcf5f074",
          },
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

export async function requestRegionDeviationsCountBlock2_Year(app){
  return new Promise( (resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 3
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от бюджета %_год",
              "qLibraryId": "d23e0468-4b14-4f7f-a379-e36e61a21b9a",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.По округу от п.п. %_год",
              "qLibraryId": "bd21a2fc-166a-447b-84ea-db84cea5884f",
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

export async function requestRegionDeviationsCountBlock2_Quarter_Absolute(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от бюджета %_квартал",
              "qLibraryId": "18da3e96-b83d-4a1b-a6a0-dd682af6044d",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от п.п. %_квартал",
              "qLibraryId": "417b6ecd-58dc-4d18-985b-c13cd7cd4af7",
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

export async function requestRegionDeviationsCountBlock2_Year_Absolute(app){
  return new Promise( ( resolve, reject) => {
      app.createCube({
      "qInitialDataFetch": [
          {
              "qHeight": 200,
              "qWidth": 4
          }
      ],
      "qDimensions": [
          {
              "qLabel": "PNL_ITEM_ID7",
              "qLibraryId": "fJjkWPP",
              "qNullSuppression": true,
          }
      ],
      "qMeasures": [
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от бюджета %_год",
              "qLibraryId": "b1680268-a0b7-46ed-83ad-3d508bfbf240",
          },
          {
              "qLabel": "ТаблКоличОтклоненийПоОкругам.абс_По округу от п.п. %_год",
              "qLibraryId": "404305a2-bffd-418e-a136-cee674107e70",
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
