<script>
  import Int from 'components/core/internationalization/Int.svelte';

  export let isExpanded;
</script>

<ul
  class="txcm-consolidatedGraphLegend"
  class:txcm-consolidatedGraphLegend-is-expanded={isExpanded}>
    <li
      class="txcm-consolidatedGraphLegendItem">
        <Int
          key="Товарно-Ценовой MIX’a" />
    </li>
    <li
      class="txcm-consolidatedGraphLegendItem">
        <Int
          key="Инфляция регулярных цен" />
    </li>
    <li
      class="txcm-consolidatedGraphLegendItem">
        <Int
          key="Влияние комплексность" />
    </li>
    <li
      class="txcm-consolidatedGraphLegendItem">
        <Int
          key="Дининамика не рег. цен" />
    </li>
</ul>
