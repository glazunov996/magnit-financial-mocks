<script>
  import { compareDynamics } from 'utilities/indicator';
  import { getDashboardState } from 'state/dashboard';
  import FactorsComparisonValue from './FactorsComparisonValue.svelte';
  import FactorsComparisonDiagram from './FactorsComparisonDiagram.svelte';
  import formatLabel from 'utilities/formatLabel'

  const units = getDashboardState('units');

  export let value;
  export let comparison;
  export let bridges;
  export let diagrams;
  export let baseRatios;
  export let minRatios;
  export let isInverted;


</script>

<div
  class="txcm-factorsTotalCell">
    <FactorsComparisonValue
      dynamics={compareDynamics(value.qNum, comparison.qNum, $units)}>
        {formatLabel(value.qText, $units)}
    </FactorsComparisonValue>
    {#each diagrams as diagram, index}
      <FactorsComparisonDiagram
        {isInverted}
        data={diagram}
        bridge={bridges[index]} 
        baseRatio={baseRatios[index]}  
        minRatio={minRatios[index]}
      />
    {/each}
</div>
