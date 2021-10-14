<script>
  /* eslint  unicorn/filename-case: 'off' */

  import { getDashboardState } from 'state/dashboard';
  import { renderYear, renderMonthShort } from 'utilities/date';
  import formatLabel from 'utilities/formatLabel';
  import Int from 'components/core/internationalization/Int.svelte';
  import { getUIState } from 'state/ui';
  import { renderPreciseDate } from 'utilities/date'; 

  export let data;

  const date = getDashboardState('date');
  const datePoP = getDashboardState('datePoP');
  const datePrecision = getDashboardState('datePrecision');

  let factLabel;
  let factPoPlabel;

  const locale = getUIState('locale');

  $: ({ factPercent, fact, vsBudgetPercent, vsBudget, budgetPercent, budget, vsFactPpPercent, vsFactPp, factPpPercent, factPp } = data.tooltip);
  $: indicator = data.indicator;
  $: year = renderYear($date);

  $: updateLabels($date, $datePoP, $datePrecision);

  function updateLabels() {
    if ($datePrecision === 2) {
      factLabel = `${renderMonthShort($date, $locale)} ${renderYear($date)}`
      factPoPlabel = `${renderMonthShort($datePoP, $locale)} ${renderYear($datePoP)}`
    } else {
      factLabel = renderPreciseDate($date, $datePrecision, $locale)
      factPoPlabel = renderPreciseDate($datePoP, $datePrecision, $locale)
    }
  }

</script>

{#if data}
  <table
    class="txcm-kpiDataTooltip">
      <tr
        class="txcm-kpiDataTooltipRow">
          <th
            class="txcm-kpiDataTooltipCollumnHeader"
            scope="row" />
          <th
            class="txcm-kpiDataTooltipCollumnHeader"
            scope="row">
              <Int key="∆ от выр." />
          </th>
          <th
            class="txcm-kpiDataTooltipCollumnHeader"
            scope="row">
              <Int key="млн. руб" />
          </th>
      </tr>
      <tr
        class="txcm-kpiDataTooltipRow">
        <th
          class="txcm-kpiDataTooltipRowHeader">
            <Int key="Факт"/> {factLabel}
        </th>
        <td
          class="txcm-kpiDataTooltipRowCell">
            { indicator.id !== '7498' ? factPercent.qText : '-'}
        </td>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(fact.qText, 1)}
        </td>
      </tr>
      <tr
        class="txcm-kpiDataTooltipRow">
        <th
          class="txcm-kpiDataTooltipRowHeader">
            <Int key="Факт"/> {factPoPlabel}
        </th>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {indicator.id !== '7498' ? factPpPercent.qText : '-'}
        </td>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(factPp.qText, 1)}
        </td>
      </tr>
      <tr
        class="txcm-kpiDataTooltipRow">
        <th
          class="txcm-kpiDataTooltipRowHeader">
            <Int key="∆ от"/> {factPoPlabel}
        </th>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(vsFactPpPercent ?  vsFactPpPercent.qText : '', 0, indicator.id == '7498')}
        </td>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(vsFactPp.qText, 1)}
        </td>
      </tr>
      <tr
        class="txcm-kpiDataTooltipRow">
        <th
          class="txcm-kpiDataTooltipRowHeader">
            <Int key="Бюд."/> {year}
        </th>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {indicator.id !== '7498' ? budgetPercent.qText : '-'}
        </td>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(budget.qText, 1)}
        </td>
      </tr>
      <tr
        class="txcm-kpiDataTooltipRow">
        <th
          class="txcm-kpiDataTooltipRowHeader">
            <Int key="∆ от бюд." />
        </th>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(vsBudgetPercent ? vsBudgetPercent.qText : '', 0, indicator.id == '7498')}
        </td>
        <td
          class="txcm-kpiDataTooltipRowCell">
            {formatLabel(vsBudget.qText, 1)}
        </td>
      </tr>
  </table>
{/if}
