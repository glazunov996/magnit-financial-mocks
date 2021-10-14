<script>
  import { getDashboardState } from 'state/dashboard';
  import { checkDynamics } from 'utilities/indicator';
  import DeviationColumn from './DeviationColumn.svelte';
  import DeviationValue from './DeviationValue.svelte';
  import formatLabel from 'utilities/formatLabel';

  export let data;

  const units = getDashboardState('units');

  $: vsPpPercent = data ? data.vsPpPercent : null;
  $: budgetPercent = data ? data.budgetPercent : null;
</script>

<div
  class="txcm-deviationCell">
    <DeviationColumn>
      <DeviationValue
        dynamics={checkDynamics(vsPpPercent ? vsPpPercent.qNum : 0)}>
          {formatLabel(vsPpPercent ? vsPpPercent.qText : '', $units, false)}
      </DeviationValue>
    </DeviationColumn>
    <DeviationColumn>
      <DeviationValue
        dynamics={checkDynamics(budgetPercent ? budgetPercent.qNum : 0)}>
          {formatLabel(budgetPercent ? budgetPercent.qText : '', $units, false)}
      </DeviationValue>
    </DeviationColumn>    
</div>
