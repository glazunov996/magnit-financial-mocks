<script>
  /* eslint  unicorn/filename-case: 'off' */

  import { onMount } from 'svelte';
  import { tooltip } from 'utilities/tooltip';
  import { checkArrowDynamics, compareDynamics } from 'utilities/indicator';
  import KPIColumn from './KPIColumn.svelte';
  import KPIValue from './KPIValue.svelte';
  import KPITooltip from './KPITooltip.svelte';
  import formatLabel from 'utilities/formatLabel';

  export let data;
  export let units;
  export let indicator;
  export let isInverted;

  const tooltipOptions = {
    content: {
      component: KPITooltip,
      data: {
        tooltip: data.tooltip,
        indicator: indicator
      } 
    },
    side: 'right',
  };

  $: ({ fact, factPercent, vsPp, vsPpPercent, vsBudget, vsBudgetPercent, arrow } = data);
  
</script>

<div
  class="txcm-kpiCell"
  use:tooltip={tooltipOptions}>
  <KPIColumn>
    <KPIValue
      {units}
      status={true}
      dynamics={arrow ? arrow.qNum : -1} >
        {indicator.id === '7498' ? '' : factPercent ? formatLabel(factPercent.qText, 0, true) : ''}
    </KPIValue>
    <KPIValue
      {units}
      valueUnits={1}
      status={true}
      dynamics={arrow ? arrow.qNum : -1}>
        {formatLabel(fact ? fact.qText : '', 1, false)}
    </KPIValue>
  </KPIColumn> 
  <KPIColumn>
    <KPIValue
      {units}
      dynamics={checkArrowDynamics(isInverted, vsPpPercent ? vsPpPercent.qNum : 0, !arrow ? -1 : arrow.qNum)}>
        {formatLabel(vsPpPercent ? vsPpPercent.qText : '', 0, indicator.id === '7498')}
    </KPIValue>
    <KPIValue
      {units}
      dynamics={checkArrowDynamics(isInverted, vsPp ? vsPp.qNum : 0, !arrow ? -1 : arrow.qNum)}>
        {formatLabel(vsPp ? vsPp.qText : '', 1, false)}
    </KPIValue>
  </KPIColumn>
  <KPIColumn>
    <KPIValue
      {units}
      dynamics={checkArrowDynamics(isInverted, vsBudgetPercent ? vsBudgetPercent.qNum : 0, !arrow ? -1 : arrow.qNum)}>
        {formatLabel(vsBudgetPercent ? vsBudgetPercent.qText : '', 0, indicator.id === '7498')}
    </KPIValue>
    <KPIValue
      {units}
      dynamics={checkArrowDynamics(isInverted, vsBudget ? vsBudget.qNum : 0, !arrow ? -1 : arrow.qNum)}>
        {formatLabel(vsBudget ? vsBudget.qText : '', 1, false)}
    </KPIValue>
  </KPIColumn>
</div>
