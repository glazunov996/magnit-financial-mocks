<script>
  import { getDashboardState } from 'state/dashboard';
  import FactorColumn from './FactorColumn.svelte';
  import FactorDiagram from './FactorDiagram.svelte';
  import FactorValue from './FactorValue.svelte';
  import formatLabel from 'utilities/formatLabel'

  const units = getDashboardState('units');

  export let data;
  export let graph;
  export let isInverted;

</script>

<div
  class="txcm-factorCell">
  <FactorColumn>
      <FactorValue
        data={formatLabel(data.vsFactPercent.qText, $units)} />
      <FactorDiagram
        {isInverted}
        graph={graph.vsFactPercent}
        data={data.vsFactPercent.qNum} />
    </FactorColumn>
    <FactorColumn>
      <FactorValue
        data={formatLabel(data.vsBudgetPercent.qText, $units)}/>
      <FactorDiagram
        {isInverted}
        graph={graph.vsBudgetPercent}
        data={data.vsBudgetPercent.qNum} />
    </FactorColumn>
        
</div>
