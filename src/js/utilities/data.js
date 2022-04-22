import { default as mockOverview } from '../mocks/mockOverview.json';
import { default as mockSlices } from '../mocks/mockSlices.json';

let currentRequest;

function resetRequest() {
  currentRequest = null;
}

export function requestUpdate(dashboard, indicator, detail, filters, type) {
  console.log("RESULT", indicator, detail, filters, type)
  const promise = new Promise((resolve, reject) => {
    function onDataResponse(response) {
      console.log("RESPONSE OK")
      window.removeEventListener('dataresponse', onDataResponse);
      window.removeEventListener('error', onDataError);
      resetRequest();   
      resolve(mockOverview);
    }

    function onDataError() {
      console.log("RESPONSE FAILED")
      window.removeEventListener('dataresponse', onDataResponse);
      window.removeEventListener('error', onDataError);
      resetRequest();
      reject(new Error('an error occured while fetching data'));
    }

    window.addEventListener('dataresponse', onDataResponse);
    window.addEventListener('error', onDataError);
  });
  currentRequest = { detail: { dashboard, indicator, detail, filters, type } };
  const event = new CustomEvent('datarequest', currentRequest);
  window.dispatchEvent(event);
  return promise;
}
