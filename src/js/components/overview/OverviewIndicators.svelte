<script>
  import { getContext } from 'svelte';
  import { getActiveIndicatorsState } from 'state/indicators';
  import { sectionScroll } from 'utilities/sectionScroll';
  import KPIRow from 'components/kpi/KPIRow.svelte';

  export let data;
  export let units = null;

  const config = getContext('config').getIndicatorsConfig();
  const indicators = Object.values(config).reduce(flattenCategories, {});
  const activeIndicators = getActiveIndicatorsState();

  let active = [];

  $: updateActive($activeIndicators, data);

  function flattenIndicators(results, indicator) {
    return {
      ...results,
      [indicator.id]: indicator,
    };
  }

  function flattenCategories(results, group) {
    return {
      ...results,
      ...group.indicators.reduce(flattenIndicators, {}),
    };
  }

  function findActiveIndicator(option) {
    return $activeIndicators.find(id => `${option.id}` === `${id}`);
  }

  function sortOrder(option1, option2) {
    const order1 = indicators[option1.id].order;
    const order2 = indicators[option2.id].order;
    return order1 - order2;
  }

  function updateActive() {
    if (data && data.length) {
      active = data
        .filter(findActiveIndicator)
        .sort(sortOrder);
    }
  }
</script>

<div
  class="txcm-overviewRows"
  use:sectionScroll={true}>
    {#each active as activeIndicator (activeIndicator.id)}
      <KPIRow
        {units}
        indicator={indicators[activeIndicator.id]}
        data={activeIndicator} />
    {/each}
</div>
