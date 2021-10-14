<script>
  import Int from 'components/core/internationalization/Int.svelte';
  import NavLink from 'components/core/navLink/NavLink.svelte';
  import { default as financialIndicators } from 'configs/dashboards/financial/indicators.json';

  const INDICATORS = financialIndicators.reduce((result, group) => [...result, ...group.indicators], []);

  export let dashboard;
  export let indicator;

  $: indicatorId = findIndicator(indicator)

  function findIndicator(indicator) {
    const id = INDICATORS.find(option => option.url === indicator).id;
    return id
  }

</script>

<nav
  class="txcm-headerTabs">
    <NavLink
      linkClass="txcm-headerTab"
      to={`/dashboard/${dashboard}/${indicator}`}>
        <Int
          key="Срезы" />
    </NavLink>
    {#if indicatorId !== '7591' && indicatorId !== '7661' && indicatorId !== '7492' && indicatorId !== '7589'}
      <NavLink
        linkClass="txcm-headerTab"
        to={`/dashboard/${dashboard}/${indicator}/factors`}>
          <Int
            key="Факторы" />
      </NavLink>
    {/if}
</nav>
