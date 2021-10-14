<script>
  import { getDashboardState } from 'state/dashboard';
  import FactorsTotalValue from './FactorsTotalValue.svelte';
  import FactorsTotalDiagram from './FactorsTotalDiagram.svelte';
  import formatLabel from 'utilities/formatLabel'

  export let value;
  export let diagrams;
  export let baseRatio;
  export let minRatio;
  export let isInverted;

  const units = getDashboardState('units');

</script>

<div
  class="txcm-factorsTotalCell">
    <FactorsTotalValue>
      {formatLabel(value.qText, $units)}
    </FactorsTotalValue>
    {#each diagrams as diagram}
      <FactorsTotalDiagram
        {isInverted}
        data={diagram} 
        {baseRatio}  
        {minRatio}
      />
    {/each}
</div>
