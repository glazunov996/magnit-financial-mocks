let currentRequest;

function dispatchRequestEvent() {
  const event = new CustomEvent('exportrequest', currentRequest);
  window.dispatchEvent(event);
}

function resetRequest() {
  currentRequest = null;
}

function processIndicators(indicators) {
  return indicators.map(indicator => indicator.label);
}

export function requestExport(dashboard, indicators, slices, expressions, filters, units, prevFilters) {
  const promise = new Promise((resolve, reject) => {
    function onExportResponse(response) {
      window.removeEventListener('exportresponse', onExportResponse);
      window.removeEventListener('error', onExportError);
      resetRequest();
      resolve(response.detail);
    }

    function onExportError() {
      window.removeEventListener('exportresponse', onExportResponse);
      window.removeEventListener('error', onExportError);
      resetRequest();
      reject(new Error('an error occured while exporting data'));
    }

    window.addEventListener('exportresponse', onExportResponse);
    window.addEventListener('error', onExportError);
  });

  currentRequest = { detail: { dashboard, indicators: processIndicators(indicators), slices, expressions, filters, units, prevFilters } };
  dispatchRequestEvent();
  return promise;
}
