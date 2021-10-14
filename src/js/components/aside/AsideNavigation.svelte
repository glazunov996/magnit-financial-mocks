<script>
  import Int from 'components/core/internationalization/Int.svelte';
  import ListFilter from 'components/list/ListFilter.svelte';
  import AsideNavigationFinancial from 'components/aside/financial/AsideNavigationFinancial.svelte';

  let filter = '';
</script>

<nav
  class="txcm-asideNavigation">
    <div
      class="txcm-asideNavigationHeader">
        <Int
          key="Перейти в показатель" />
    </div>
    <ListFilter
      bind:value={filter} />
    <div
      class="txcm-asideNavigationGroups">
        <AsideNavigationFinancial
          {filter} />
    </div>
</nav>
