<script>
  import { checkArrowDynamics, compareDynamics } from 'utilities/indicator';
  import { getDashboardState } from 'state/dashboard'
  import SliceColumn from './SliceColumn.svelte';
  import SliceValue from './SliceValue.svelte';  
  import formatLabel from 'utilities/formatLabel';

  export let data;
  export let isInverted;

  const units = getDashboardState('units');

  $: factPercent = data.factPercent;
  $: vsBudgetPercent = data.vsBudgetPercent;
  $: vsPpPercent = data.vsPpPercent;
  $: arrow = data.arrow;

</script>

<div
  class="txcm-sliceCell">
    <SliceColumn>
      <SliceValue
        dynamics={arrow ? arrow.qNum : -1}
        status={true}>
          {formatLabel(factPercent ? factPercent.qText : '', $units, false )}
      </SliceValue>
    </SliceColumn>
    <SliceColumn>
      <SliceValue
        dynamics={vsPpPercent ? checkArrowDynamics(isInverted, vsPpPercent.qNum, !arrow ? -1 : arrow.qNum) : 0}>
          {formatLabel(vsPpPercent ? vsPpPercent.qText : '', $units, false )}
      </SliceValue>
    </SliceColumn>
    <SliceColumn>
      <SliceValue
        dynamics={vsBudgetPercent ? checkArrowDynamics(isInverted, vsBudgetPercent.qNum, !arrow ? -1 : arrow.qNum) : 0}>
          {formatLabel(vsBudgetPercent ? vsBudgetPercent.qText : '', $units, false )}
      </SliceValue>
    </SliceColumn>
</div>
