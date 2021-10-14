/* global require */
/* eslint global-require: 'off' */

import { default as config } from 'configs/client.json';
import { qlikRequestFinancialOverview } from './requests/financial/overview';
import { qlikRequestFinancialSlices } from './requests/financial/slices';
import { qlikRequestFinancialFactors } from './requests/financial/factors';
import { qlikRequestFinancialExportData, qlikRequestFinancialExport } from './requests/financial/export';
import { qlikRequestDates } from './requests/financial/dates';
import { qlikRequestTemplates, qlikRequestApplyTemplate, qlikRequestCreateTemplate, qlikRequestRemoveTemplate } from './requests/financial/templates';
import { qlikRequestOperationalComparisons } from './requests/operational/comparisons';
import { qlikRequestOperationalExport } from './requests/operational/export';

let app;

function qlikRequestSlices(dashboard, indicator, filters, type) {
  return qlikRequestFinancialSlices(app, indicator, filters, type);
}

function qlikRequestFactors(dashboard, indicator, filters, type) {
  return qlikRequestFinancialFactors(app, indicator, filters, type);
}

function qlikRequestComparisons(indicator, filters) {
  return qlikRequestOperationalComparisons(app, indicator, filters);
}

function qlikRequestDetail(dashboard, indicator, detail, filters, type) {
  if (detail === 'factors') return qlikRequestFactors(dashboard, indicator, filters, type);
  else if (detail === 'comparisons') return qlikRequestComparisons(indicator, filters);
  return qlikRequestSlices(dashboard, indicator, filters, type);
}

function qlikRequestOverview(dashboard, filters, type) {
  return qlikRequestFinancialOverview(app, filters, type);
}

function qlikRequestExportData(dashboard) {
  return qlikRequestFinancialExportData(app);
}

export function qlikRequest({ dashboard, indicator, detail, filters, type }) {
  if (detail) return qlikRequestDetail(dashboard, indicator, detail, filters, type);
  else if (indicator && indicator === 'export') return qlikRequestExportData(dashboard);
  else if (indicator) return qlikRequestSlices(dashboard, indicator, filters, type);
  return qlikRequestOverview(dashboard, filters, type);
}

export function qlikRequestMeta() {
  return Promise.all([
    qlikRequestTemplates(app),
    qlikRequestDates(app),
  ]);
}

export function qlikRequestTemplateAction({ action, data }) {
  if (action === 'add') return qlikRequestCreateTemplate(app, data);
  else if (action === 'remove') return qlikRequestRemoveTemplate(app, data);
  return qlikRequestApplyTemplate(app, data);
}

export function qlikRequestExport({ dashboard, indicators, slices, expressions, filters, units, prevFilters }) {
  if (dashboard === 'financial') return qlikRequestFinancialExport(app, indicators, slices, expressions, filters, units, prevFilters);
  return qlikRequestOperationalExport(app, indicators, slices, filters, units, prevFilters);
}

export function qlikClientStart() {
  return new Promise((resolve) => {
    let prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions" ) + 1)
    if (prefix.length === 0) prefix = '/';    
    const hostname = window.location.hostname;
    const host = hostname.includes('corp.tander.ru') ? hostname : "qsense.corp.tander.ru";    
    const connection = { 
      host: host,      
      prefix: prefix,
      port: 443,
      isSecure: window.location.protocol === "https:",
    }
    const port = `:${connection.port}`;
    const baseUrl = `https://${host}${port}${prefix}resources/`;
    require.config({ baseUrl });
    console.log("CONNECTION", connection)
    require(['js/qlik'], (qlik) => {
      qlik.setOnError(error => console.log(error))
      app = qlik.openApp(config.id, connection);
      resolve();
    });
  });
}
