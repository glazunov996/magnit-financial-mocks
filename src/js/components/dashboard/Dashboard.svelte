<script>
  import { setContext, getContext, onDestroy, tick } from 'svelte';
  import { initFilter, updateFilter, subscribeFilterAll } from 'state/filter';
  import { initIndicators } from 'state/indicators';
  import { initGraphs, getGraphsState } from 'state/graphs';
  import { updateDashboard, getDashboardState } from 'state/dashboard';
  import { updateExport, getExportState } from 'state/export';
  import { getUIState } from 'state/ui';
  import { requestUpdate } from 'utilities/data';
  import Filter from 'components/filter/Filter.svelte';
  import Loader from 'components/loader/Loader.svelte';
  import Reload from 'components/reload/Reload.svelte';
  import Indicators from 'components/indicators/Indicators.svelte';
  import DashboardContent from './DashboardContent.svelte';
  import sortFilterOptions from 'utilities/sortFilterOptions';
  
  import { default as mockData } from 'mocks/mockData.json';
  import { default as mockSlices } from 'mocks/mockSlices.json';
  import { default as mockFactors } from 'mocks/mockFactors.json';
  import { default as mockDataEmpty } from 'mocks/mockDataEmpty.json';
  
  export let dashboard;
  export let indicator;
  export let detail;
  export let location;
  export let filterConfig;
  export let indicatorsConfig;
  export let columnConfig;

  const { graphs: graphConfig } = getContext('app').getAppConfig();

  let initial = true;
  let noUpdate = false;
  let loading = false;
  let reloadNeeded = false;

  initFilter(filterConfig);
  initGraphs(graphConfig, dashboard);
  initIndicators(indicatorsConfig);
  updateDashboard({ column: columnConfig[0].indicators[0].value });

  const updating = getUIState('updating');
  const downloading = getExportState('downloading');
  const dynamics = getGraphsState('dynamics');
  const date = getDashboardState('date');
  const datePoP = getDashboardState('datePoP');
  const datePrecision = getDashboardState('datePrecision');
  const columnPrecision = getDashboardState('columnPrecision');
  const units = getDashboardState('units');
  const templateUpdate = getUIState('templateUpdate');

  let dashboardData = null;
  let dashboardFilterData = null;
  let fetchingData = false;

  let conditions = {};

  setContext('config', {
    getDashboard: () => dashboard,
    getFilterConfig: () => filterConfig,
    getIndicatorsConfig: () => indicatorsConfig,
    getColumnConfig: () => columnConfig,
  });

  const unsubscribeFilter = subscribeFilterAll(onFilterUpdate);

  $: dynamicsOptions = updateDynamicOptions(dashboard);
  $: updateData(location, conditions, $date, $datePoP, $datePrecision, $columnPrecision, $dynamics, $units);
  $: updateDataTemplate($templateUpdate);


  function shouldRenderContent() {
    return dashboardData || indicator === 'export';
  }

  function updateDynamicOptions() {
    if (dashboard === 'financial') return graphConfig.dynamics.slice(2);
    return graphConfig.dynamics;
  }

  function onFilterUpdate(key, update) {
    const shouldUpdate = Object.prototype.hasOwnProperty.call(conditions, key);
    conditions[key] = update;
    if (shouldUpdate) conditions = conditions;
  }

  function unsubscribe() {
    unsubscribeFilter.forEach((unsubscribeKey) => { unsubscribeKey(); });
  }

  function saveUpdate({ data, filter }) {
    if (data) dashboardData = data;
    if (filter) dashboardFilterData = filter;
  }

  function updateExportState({ slices, expressions }) {
  }

  function updateFinancialPrecision(columnPrecisionData, graphPrecisionData, absFlag) {
    $columnPrecision = columnPrecisionData + 1;
    $dynamics = dynamicsOptions[graphPrecisionData - 1].value;
    $units = indicator === 'revenue' ? 1 : absFlag - 1;
  }

  function updateOperationalPrecision(columnPrecisionData, graphPrecisionData) {
    $columnPrecision = columnPrecision - 1;
    $dynamics = dynamicsOptions[graphPrecisionData - 1].value;
  }

  function updatePrecision(update) {
    const { columnPrecision: columnPrecisionData, graphPrecision: graphPrecisionData, absFlag } = update.precision;
    if (dashboard === 'financial') updateFinancialPrecision(columnPrecisionData, graphPrecisionData, absFlag);
    else updateOperationalPrecision(columnPrecisionData, graphPrecisionData);
  }

  function convertFinancialColumnPrecision() {
    return $columnPrecision - 1;
  }

  function convertOperationalColumnPrecision() {
    return $columnPrecision + 1;
  }

  function convertColumnPrecision() {
    if (dashboard === 'financial') return convertFinancialColumnPrecision();
    return convertOperationalColumnPrecision();
  }

  function convertFinancialDatePrecision() {
    return $datePrecision - 1;
  }

  function convertOperationalDatePrecision() {
    return $datePrecision + 1;
  }

  function convertDatePrecision() {
    if (dashboard === 'financial') return convertFinancialDatePrecision();
    return convertOperationalDatePrecision();
  }

  function convertFinancialDynamics() {
    return dynamicsOptions.findIndex(dynamicsOption => dynamicsOption.value === $dynamics) + 1;
  }

  function convertOperationalDynamics() {
    return dynamicsOptions.findIndex(dynamicsOption => dynamicsOption.value === $dynamics) + 1;
  }

  function convertDynamics() {
    if (dashboard === 'financial') return convertFinancialDynamics();
    return convertOperationalDynamics();
  }

  function updateFilterKeyState(update, option) {
    if (option.picked) update.push(option.value);
    return update;
  }

  function updateFilterState(update, option) {
    return {
      ...update,
      [option.key]: option.data.reduce(updateFilterKeyState, []),
    };
  }

  function updateFiltersState() {
    const update = dashboardFilterData.reduce(updateFilterState, {});
    if (initial || noUpdate) updateFilter(update);
  }

  function hydrateDashboard(update) {
    console.log("UPDATE", update)
    if (update) saveUpdate(update);
    if (update.export) updateExportState(update.update);
    if (update.filter) updateFiltersState();
    updatePrecision(update);
    initial = false;
    noUpdate = false;
  }

  function dropData() {
    dashboardData = null;
  }

  function showLoader() {
    loading = true;
  }

  function hideLoader() {
    loading = false;
  }

  function startUpdating() {
    $updating += 1;
  }

  function stopUpdating() {
    $updating -= 1;
  }

  function zipFinancialOverview(data, { filter, precision, dates }) {
    const overviewData = {
      dates,
      filter,
      precision,
      data,
    };
    return overviewData;
  }

  function zipChartsMainTable(data, { formats, regions }, graphs) {
    const data1 = data[0];
    const data2 = data[1];
    const graphsMap = graphs ? graphs : {};
    const [format1Map, format2Map] = formats || [{}, {}, {}, {}];
    const [region1Map, region2Map] = regions || [{}, {}, {}, {}];
    const newData = data1.rows.map((item, index) => {
      return {
        id: item.id,
        name: item.name,
        column1: item && item.column ? item.column : {},
        column2: data2 && data2.rows && data2.rows[index] && data2.rows[index].column ? data2.rows[index].column : {},
        graphs: graphsMap[item.id],
        formatDeviations: {
          id: item.id,
          name: item.name,
          column1: format1Map[item.id] && format1Map[item.id].column ? format1Map[item.id].column : [],
          column2: format2Map[item.id] && format2Map[item.id].column ? format2Map[item.id].column : [],
          countDeviation: format1Map[item.id] ? format1Map[item.id].countDeviation : 0
        },
        regionDeviations: {
          id: item.id,
          name: item.name,
          column1: region1Map[item.id] && region1Map[item.id].column ? region1Map[item.id].column : [],
          column2: region2Map[item.id] && region2Map[item.id].column ? region2Map[item.id].column : [],
          countDeviation: region1Map[item.id] ? region1Map[item.id].countDeviation : 0
        },
      }
    })
    return newData;
  }

  function zipFinancialSlices(columns, formats, regions, graphs) {
    const formatData1 = formats[0] || {};
    const formatData2 = formats[1] || {};
    const regionData1 = regions[0] || {};
    const regionData2 = regions[1] || {};
    const formatGraphs = graphs[0] || {};
    const regionGraphs = graphs[1] || {};
    const newData = {
      indicator: {...columns},
      formats: (formatData1.rows || []).map((item, index) => {
        return {
          name: item.name,
          column1: item && item.column ? item.column : {},
          column2: formatData2.rows && formatData2.rows[index].column ? formatData2.rows[index].column : {},
          graphs: formatGraphs[item.name],
        }
      }),
      regions: (regionData1.rows || []).map((item, index) => {
        return {
          name: item.name,
          column1: item && item.column ? item.column : {},
          column2: regionData2.rows && regionData2.rows[index].column ? regionData2.rows[index].column : {},
          graphs: regionGraphs[item.name],
        }
      })
    }
    return newData;
  }

  function zipFinancialFactors(results, bridges) {
    const resultsBlock1 = results[0] || {};
    const resultsBlock2 = results[1] || {};
    const dataBlock1 = bridges[0] || {};
    const dataBlock2 = bridges[1] || {};
    const newData = {
      results: (resultsBlock1.items || []).map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          column1: item && item.column ? item.column : {},
          column2: resultsBlock2.items && resultsBlock2.items[index] ? resultsBlock2.items[index].column : {}
        }
      }),
      bridges: (dataBlock1.items || []).map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          column1: item && item.column ? item.column : {},
          column2: dataBlock2.items && dataBlock2.items[index] ? dataBlock2.items[index].column : {}
        }
      })
    }
    return newData;
  }

  async function renderDashboard(data, meta) {
    const update = zipFinancialOverview(data, meta);
    console.log("UPDATE", update)
    await hydrateDashboard(update);
    await tick();
  }

  async function renderMainTable(columns, { formats, regions }, graphs, meta) {
    const data = zipChartsMainTable(columns, { formats, regions }, graphs);
    await renderDashboard(data, meta);
  } 

  async function renderSlices(columns, formats, regions, graphs, meta) {
    const data = zipFinancialSlices(columns, formats, regions, graphs);
    await renderDashboard(data, meta);
  }

  async function renderFactors(results, bridges, meta) {
    const data = zipFinancialFactors(results, bridges);
    await renderDashboard(data, meta);
  }

  async function fetchUpdateData(meta) { 
    const filters = getFilters();    
    console.log("DASHBOARD", detail, indicator)
    if (detail === 'factors') {
      await hydrateDashboard(mockFactors);
      await tick();
      return
      
      const results = await requestUpdate(dashboard, indicator, detail, filters, 'results');
      const bridges = await requestUpdate(dashboard, indicator, detail, filters, 'bridges');
      await renderFactors(results, bridges, meta);      
    } else if (indicator) {
      console.log("SLICES")
      await hydrateDashboard(mockSlices);
      await tick();
      return

      const table = await requestUpdate(dashboard, indicator, detail, filters, 'table');
      if (table.length === 2) {  
        const data = zipChartsMainTable(table[0], { formats: null, regions: null }, table[1]);
        await renderSlices(data[0], [], [], [], meta);
        const formats = await requestUpdate(dashboard, indicator, detail, filters, 'formats');
        await renderSlices(data[0], formats, [], [], meta);
        const regions = await requestUpdate(dashboard, indicator, detail, filters, 'regions');
        await renderSlices(data[0], formats, regions, [], meta);
        const graphs = await requestUpdate(dashboard, indicator, detail, filters, 'graphs');
        await renderSlices(data[0], formats, regions, graphs, meta);
      }      
    } else {
      await hydrateDashboard(mockData);
      await tick();
      return;
      
      const columns = await requestUpdate(dashboard, indicator, detail, filters, 'columns');
      if (columns.length === 2) {
        await renderMainTable(columns, { formats: null, regions: null }, null, meta);
        const graphs = await requestUpdate(dashboard, indicator, detail, filters, 'graphs');
        await renderMainTable(columns, { formats: null, regions: null }, graphs, meta);
        const deviations = await requestUpdate(dashboard, indicator, detail, filters, 'deviations');
        await renderMainTable(columns, deviations, graphs, meta);
      }
    }
  }

  async function renderMeta() {
    const filters = getFilters();
    const meta = await requestUpdate(dashboard, indicator, detail, filters, 'meta');
    const FRMT = meta.filter.find(item => item.key === 'FRMT');
    const SUBFRMT = meta.filter.find(item => item.key === 'SUBFRMT');
    if (FRMT) {
      FRMT.data = sortFilterOptions(FRMT.data);
      FRMT.data = FRMT.data.filter(item => item.value !== 'allRetail');
    }
    if (SUBFRMT) SUBFRMT.data = sortFilterOptions(SUBFRMT.data);   
    if (detail !== 'factors')
      await renderDashboard([], meta);
    return meta;
  }

  function getFilters() {
    return {
      initial,
      noUpdate,
      conditions,
      date: $date,
      datePoP: $datePoP,
      columnPrecision: convertColumnPrecision(),
      datePrecision: convertDatePrecision(),
      dynamics: convertDynamics(),
      units: $units + 1
    };
  }

  async function updateData() {
    try {
      if (!fetchingData) {
        fetchingData = true;
        startUpdating();
        showLoader();
        dropData();
        if (initial)
          await renderMeta(); // fetch params
        const meta = await renderMeta() // update params
        if (detail !== 'factors') {
          hideLoader();
          await fetchUpdateData(meta);
        } else {
          await fetchUpdateData(meta);
          hideLoader();
        } 
        stopUpdating();
        fetchingData = false;
      }
    } catch (e) {
      console.log("ERROR", e);
      reloadNeeded = true;
    }
  }

  async function updateDataTemplate() {
    if ($templateUpdate && $templateUpdate > 0) {
      noUpdate = true;
      await updateData();
    }
  }

  onDestroy(unsubscribe);
</script>

<Filter
  disabled={$updating > 0 || $downloading > 0}
  data={dashboardFilterData} />
{#if loading}
  <Loader
    shift="-69" />
{/if}
{#if shouldRenderContent(dashboardData, indicator)}
  {#if !indicator}
    <Indicators />
  {/if}
  <DashboardContent
    data={dashboardData}
    filterData={dashboardFilterData}
    units={$units}
    {dashboard}
    {indicator}
    {detail}
    {conditions} />
{/if}
{#if reloadNeeded}
  <Reload />
{/if}
