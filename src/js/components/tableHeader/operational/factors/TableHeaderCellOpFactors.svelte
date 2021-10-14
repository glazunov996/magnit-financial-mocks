<script>
  import { getContext } from 'svelte';
  import { getDashboardState } from 'state/dashboard';
  import { renderPreciseCellDate } from 'utilities/date';
  import TableHeaderCell from 'components/tableHeader/TableHeaderCell.svelte';
  import Int from 'components/core/internationalization/Int.svelte';
  import { getUIState } from 'state/ui';

  const appConfig = getContext('app').getAppConfig();
  const { dateMax } = appConfig;
  const datePoP = getDashboardState('datePoP');
  const datePrecision = getDashboardState('datePrecision');
  const locale = getUIState('locale');

  $: label = renderPreciseCellDate($datePoP, $datePrecision, dateMax, $locale);
</script>

<TableHeaderCell>
  <slot />
  <div
    class="txcm-tableHeaderCellWideColumn">
      ∆ (ppt)<br>
      <Int key="от бюд."/>
  </div>
  <div
    class="txcm-tableHeaderCellWideColumn">
      ∆ (ppt)<br>
      {label}
  </div>
</TableHeaderCell>
