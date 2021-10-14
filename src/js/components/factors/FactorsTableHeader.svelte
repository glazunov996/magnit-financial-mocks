<script>
  import { getUIState } from 'state/ui';
  import TableHeaderFinancialFactors from 'components/tableHeader/financial/factors/TableHeaderFinFactors.svelte';
  import TableHeaderOperationalFactors from 'components/tableHeader/operational/factors/TableHeaderOpFactors.svelte';
  import FactorsLabel from './FactorsLabel.svelte'

  const TABLE_HEADERS = {
    financial: TableHeaderFinancialFactors,
    operational: TableHeaderOperationalFactors,
  };

  export let dashboard;
  export let indicator;

  const sectionScrollX = getUIState('sectionScrollX');

  let node;

  $: updateScroll($sectionScrollX);

  function pickHeader() {
    if (TABLE_HEADERS[dashboard]) return TABLE_HEADERS[dashboard];
    return TABLE_HEADERS.financial;
  }

  function updateScroll() {
    if (node) node.scrollLeft = $sectionScrollX;
  }
</script>

<div
  bind:this={node}
  class="txcm-factorsHeader">
    <FactorsLabel {indicator} />
    <svelte:component
      this={pickHeader(dashboard)} />
</div>
