<script>
  import { getUIState } from 'state/ui';
  import FactorsTotalFact from 'components/factorsTotal/fact/FactorsTotalFact.svelte';
  import FactorsTotalBudget from 'components/factorsTotal/budget/FactorsTotalBudget.svelte';

  export let data;
  export let baseRatios;
  export let minRatios;
  export let isInverted;

  const sectionScrollX = getUIState('sectionScrollX');

  let node;

  $: updateScroll($sectionScrollX);
  
  function updateScroll() {
    if (node) node.scrollLeft = $sectionScrollX;
  }
</script>

<div
  bind:this={node}
  class="txcm-factorsSectionHeader">
    <FactorsTotalFact
      {isInverted}
      {data} 
      {baseRatios}
      {minRatios}
      />
    <FactorsTotalBudget
      {isInverted}
      {data} 
      {baseRatios}
      {minRatios}
      />
</div>
