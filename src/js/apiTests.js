/* eslint no-restricted-syntax: 'off' */

import { qlikClientStart, qlikRequest, qlikRequestMeta, qlikRequestExport } from 'client/client';

const API_TESTS = [
  'meta',
  { dashboard: 'financial' },
  { dashboard: 'financial', indicator: 'ebitda' },
  { dashboard: 'financial', indicator: 'cost-of-sales', detail: 'factors' },
  { dashboard: 'financial', indicator: 'export' },
  { dashboard: 'financial', indicators: ['CM', 'EBITDA'], slices: '10000010001', filters: { FRMT: ['МА', 'МК', 'СИА'], SUBFRMT: [], Округ: [], Филиал: [] }, prevFilters: { FRMT: [] } },
];

const tests = {
  [Symbol.asyncIterator]() {
    return {
      current: 0,
      last: API_TESTS.length - 1,
      async next() {
        if (this.current <= this.last) {
          let response;
          console.log(API_TESTS[this.current]);
          if (isMeta(API_TESTS[this.current])) response = await qlikRequestMeta();
          else if (isExport(API_TESTS[this.current])) response = await qlikRequestExport(API_TESTS[this.current]);
          else response = await qlikRequest(API_TESTS[this.current]);
          this.current += 1;
          return { done: false, value: response };
        } return { done: true };
      },
    };
  },
};

function isMeta(value) {
  return value === 'meta';
}

function isExport(value) {
  return value && value.indicators;
}

async function runTests() {
  console.clear();
  for await (const value of tests) {
    console.log(value);
    console.log(JSON.stringify(value));
    console.log('---');
  }
}

qlikClientStart()
  .then(runTests);
