<script>
  /* eslint  unicorn/filename-case: 'off' */

  import { getDashboardState } from 'state/dashboard';
  import { getGraphsState } from 'state/graphs';
  import { 
    filterMonthData,
    filterQuarterData,
    filterYearData,
    fillMonthData, 
    fillQuaterData, 
    fillYearData 
  } from 'utilities/graph';
  import { calculateDatePoP, renderMonthYear } from 'utilities/date'
  import LineGraph from 'components/lineGraph/LineGraph.svelte';
  import BarChart from 'components/barChart/BarChart.svelte';

  export let data;
  export let indicator;
  export let isInverted;

  const date = getDashboardState('date');
  const dynamics = getGraphsState('dynamics');
  const step = getGraphsState('step');
  const count = getGraphsState('count');
  const highlighted = getGraphsState('highlighted');
  const shift = getGraphsState('shift');
  
  let fragment;
  let isExpanded;
  let hasDeviations;
  
  $: datePoP = calculateDatePoP($date, $dynamics);
  $: updateFragments(data);

  function checkDeviation(point, index) {
    return (point.data !== null && !isNaN(point.data));
  }

  function checkDeviations() {
    return (fragment.length > 2 && fragment[2].data.some(checkDeviation)) 
        || (fragment.length > 6 && fragment[6].data.some(checkDeviation));
  }

  function fillData(data) {
    if (!data) return [];
    if ($dynamics === 'graphDetailMonth') return fillMonthData(data, $date);
    if ($dynamics === 'graphDetailQuarter') return fillQuaterData(data, $date);
    if ($dynamics === 'graphDetailYear') return fillYearData(data, $date);
    return data;
  }

  function filterData(data) {
    if (!data) return []    
    if ($dynamics === 'graphDetailMonth') return filterMonthData(data, $date, datePoP);
    if ($dynamics === 'graphDetailQuarter') return filterQuarterData(data, $date, datePoP);
    if ($dynamics === 'graphDetailYear') return filterYearData(data, $date, datePoP);
    return data;
  }

  function updateFragments() {
    fragment = filterData(data.series);    
    fragment = fillData(fragment); 
    hasDeviations = checkDeviations();
  }
  
</script>

<div
  class="txcm-kpiGraph"
  style="--highlightWidth: {100 / $count}%; --highlightPosition: {100 * $highlighted}%; --highlightOpacity: {$highlighted === null ? 0 : 1}; --highlightShift: {$shift}px">
    <div
      class="txcm-kpiGraphHolder"
      class:txcm-kpiGraphHolder-is-expanded={isExpanded}>
        <LineGraph
          {indicator}
          {isInverted}
          data={fragment}
          count={$count}
          step={$step}
          shift={$shift}
          isCompact={hasDeviations} />
        {#if hasDeviations}
          <BarChart
            {isInverted}
            {indicator}
            data={fragment}
            count={$count}
            step={$step} 
            />
        {/if}
    </div>
</div>
