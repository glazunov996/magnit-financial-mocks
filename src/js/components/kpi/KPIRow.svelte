<script context="module">
  /* eslint  unicorn/filename-case: 'off' */

  const BASE_HEIGHT = 110;
  const DEVIATION_HEIGHT = 32;

  function calculateHeight(data) {
    let height = BASE_HEIGHT;
    height += data.formatDeviations ? DEVIATION_HEIGHT : 0;
    height += data.regionDeviations ? DEVIATION_HEIGHT : 0;
    return height;
  }
</script>

<script>
  import { shiftVertical } from 'utilities/transitions';
  import KPILabel from './KPILabel.svelte';
  import KPICell from './KPICell.svelte';
  import KPIDeviations from './KPIDeviations.svelte';
  import KPIGraph from './KPIGraph.svelte';

  export let data;
  export let indicator;
  export let units = 0;
  export let isInverted = false;

  $: height = calculateHeight(data);
  $: hasGraph = !!data.graphs;

  function hasDeviations() {
    return (data.regionDeviations && data.regionDeviations.countDeviation > 0) || (data.formatDeviation && data.formatDeviation.countDeviation > 0);
  }
</script>

<div
  class="txcm-kpiRow"
  class:txcm-kpiRow-has-deviations={false}
  class:txcm-kpiRow-has-graph={hasGraph}
  transition:shiftVertical|local={{ height }}>
    <KPILabel
      {data}
      {indicator} />
    {#if data}
      <KPICell
        {isInverted}
        {units}
        data={data.column1} 
        indicator={indicator}
        />
      <KPICell
        {isInverted}
        {units}
        data={data.column2}
        indicator={indicator}
        />
      {#if hasGraph}
        <KPIGraph
          {isInverted}
          {indicator}
          data={data.graphs} />
      {/if}
      <!--KPIDeviations
        {indicator}
        {data} /-->
    {/if}
</div>
