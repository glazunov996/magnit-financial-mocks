<script>
  import { getUIState } from 'state/ui';
  import FactorsComparison from 'components/factorsComparison/FactorsComparison.svelte';

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
  class="txcm-factorsSectionFooter">
    <FactorsComparison
      {isInverted}
      {data} 
      {baseRatios}
      {minRatios}
      />
</div>
