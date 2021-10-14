<script>
  import Int from 'components/core/internationalization/Int.svelte'; 
  import { updateDashboard, getDashboardState } from 'state/dashboard';   
  import formatLabel from 'utilities/formatLabel';

  export let data;

  const units = getDashboardState('units');  

  $: indicator = data.indicator;
  $: factLabel = data.tooltip.factLabel;
  $: vsPpLabel = data.tooltip.vsPpLabel;
  $: year = data.tooltip.year;

</script>

{#if data}
  <table
    class="txcm-graphTooltip">
      <tr
        class="txcm-kpiDataTooltipRow">
        <th
          class="txcm-kpiDataTooltipCollumnHeader"
          scope="row"
        >
        </th>
        <th
          class="txcm-kpiDataTooltipCollumnHeader"
          scope="row">
            <Int key={$units === 0 && indicator != '7498' ? "∆ от выр." : "млн. руб"} />
        </th>
      </tr>
      {#if data.tooltip.deviations !== undefined || data.tooltip.fact !== undefined}
      <tr
        class="txcm-graphTooltipRow">
        {#if data.tooltip.deviations !== undefined}
          <th
            class="txcm-graphTooltipRowHeader txcm-graphTooltipRowHeader-fact"
            class:txcm-graphTooltipRowHeader-fact-normal={!data.tooltip.deviations}>
              <Int key="Факт"/> {factLabel}
          </th>
        {/if}
        {#if data.tooltip.fact !== undefined}
          <td
            class="txcm-graphTooltipRowCell">
              {formatLabel(data.tooltip.fact, indicator != '7498' ? $units : 1, true)}
          </td>
        {/if}
      </tr>
      {/if}
      {#if data.tooltip.vsPp !== undefined}
        <tr
          class="txcm-graphTooltipRow">
          <th
            class="txcm-graphTooltipRowHeader">
              <Int key="Факт"/> {vsPpLabel}
          </th>
          <td
            class="txcm-graphTooltipRowCell">
              {formatLabel(data.tooltip.vsPp, indicator != '7498' ? $units : 1, true)}
          </td>
        </tr>
      {/if}
      <tr
        class="txcm-graphTooltipRow">
        <th
          class="txcm-graphTooltipRowHeader txcm-graphTooltipRowHeader-deltaBudget">
            <Int key="∆ от"/> {vsPpLabel}
        </th>
        <td
          class="txcm-graphTooltipRowCell">
            {formatLabel(data.tooltip.vsPpPercent, $units, true)}
        </td>
      </tr>   
      {#if data.tooltip.vsBudget !== undefined}   
        <tr
          class="txcm-graphTooltipRow">
          <th
            class="txcm-graphTooltipRowHeader">
              <Int key="Бюд."/> {year}
          </th>
          <td
            class="txcm-graphTooltipRowCell">
              {formatLabel(data.tooltip.vsBudget, indicator != '7498' ? $units : 1, true)}
          </td>
        </tr>
      {/if}
      <tr
        class="txcm-graphTooltipRow">
        <th
          class="txcm-graphTooltipRowHeader txcm-graphTooltipRowHeader-deltaPoP">
            <Int key="∆ от бюд."/>
        </th>
        <td
          class="txcm-graphTooltipRowCell">
            {formatLabel(data.tooltip.vsBudgetPercent, $units, true)}
        </td>
      </tr>
  </table>
{/if}
