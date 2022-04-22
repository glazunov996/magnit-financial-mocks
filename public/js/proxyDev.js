(function () {
  'use strict';

  function processResponse(response) {
    return {};
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function fetchRequest(url) {
    return delay(1000)
      .then(processResponse);
  }

  function requestOverviewData(dashboard) {
    return fetchRequest();
  }

  function requestIndicatorData(dashboard) {
    return fetchRequest();
  }

  function requestIndicatorFactorsData(dashboard) {
    return fetchRequest();
  }

  function requestIndicatorComparisonssData(dashboard) {
    return fetchRequest();
  }

  function requestExportData(dashboard) {
    return fetchRequest();
  }

  function requestData(request) {
    if (request.detail) {
      if (request.detail === 'comparisons') return requestIndicatorComparisonssData(request.dashboard);
      return requestIndicatorFactorsData(request.dashboard);
    } else if (request.indicator) {
      if (request.indicator === 'export') return requestExportData(request.dashboard);
      return requestIndicatorData(request.dashboard);
    }
    return requestOverviewData(request.dashboard);
  }

  function processDataRequest({ detail }) {
    return requestData(detail);
  }

  function dispatchResponseEvent(data, name) {
    const event = new CustomEvent(name, { detail: data });
    window.dispatchEvent(event);
  }

  function dispatchErrorEvent(error) {
    const event = new CustomEvent('error', { detail: error });
    window.dispatchEvent(event);
  }

  function dispatchReadyEvent() {
    const event = new CustomEvent('proxyready');
    window.dispatchEvent(event);
  }

  function sendResponse(data, name = 'dataresponse') {
    dispatchResponseEvent(data, name);
  }

  function sendDataResponse(data) {
    sendResponse(data);
  }

  function sendMetaResponse(data) {
    sendResponse(data, 'metaresponse');
  }

  function sendExportResponse(data) {
    sendResponse(data, 'exportresponse');
  }

  function sendTemplateAtionResponse(data) {
    sendResponse(data, 'templateactionresponse');
  }

  function sendError(error) {
    dispatchErrorEvent(error);
    console.error(error);
  }

  function onDataRequest(event) {
    processDataRequest(event)
      .then(sendDataResponse)
      .catch(sendError);
  }

  function onMetaRequest(event) {
    sendMetaResponse(event);
  }

  function onExportRequest(event) {
    sendExportResponse(event);
  }

  function onTemplateActionRequest(event) {
    sendTemplateAtionResponse(event);
  }

  function subscribeRequests() {
    window.addEventListener('datarequest', onDataRequest);
    window.addEventListener('metarequest', onMetaRequest);
    window.addEventListener('exportrequest', onExportRequest);
    window.addEventListener('templateactionrequest', onTemplateActionRequest);
  }

  function initProxy() {
    subscribeRequests();
    dispatchReadyEvent();
  }

  initProxy();

}());
//# sourceMappingURL=proxyDev.js.map
