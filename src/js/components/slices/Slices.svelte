<script>
  import { getContext } from 'svelte';
  import { sectionScroll } from 'utilities/sectionScroll';
  import KPIRow from 'components/kpi/KPIRow.svelte';
  import SlicesTableHeader from './SlicesTableHeader.svelte';
  import SlicesCategories from './SlicesCategories.svelte';

  export let data = null;
  export let dashboard;
  export let indicator;
  export let units = 0;

  const tab = null;
  const config = getContext('config').getIndicatorsConfig();
  const indicators = Object.values(config).reduce(flattenCategories, {});

  let slicesData;
  let isInverted = false;

  $: updateData(data);
  $: checkInverted(indicator);

  function checkInverted() {
    const id = findIndicator(indicator).id;
    isInverted = false; //(id == '7369' || id == '7487' || id == '7492' || id == '7494' || id == '7575' || id == '7591');
  }

  function flattenIndicators(results, option) {
    return {
      ...results,
      [option.id]: option,
    };
  }

  function flattenCategories(results, group) {
    return {
      ...results,
      ...group.indicators.reduce(flattenIndicators, {}),
    };
  }

  function findIndicator() {
    return Object.values(indicators).find(option => option.url === indicator);
  }

  function updateData() {
    slicesData = data || null;
  }
</script>

<section
  class="txcm-slicesSection">
    <SlicesTableHeader
      {dashboard} />
    {#if slicesData}
      <div
        class="txcm-slicesRows"
        use:sectionScroll={true}>
          {#if slicesData.indicator}
            <KPIRow
              {isInverted}
              {units}
              indicator={findIndicator(indicator)}
              data={slicesData.indicator} />
          {/if}
          <SlicesCategories
            {isInverted}
            data={slicesData}
            indicator={findIndicator(indicator)}
            {tab} />
      </div>
    {/if}
</section>
