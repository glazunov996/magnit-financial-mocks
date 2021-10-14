<script>
  import { getDashboardState } from 'state/dashboard';
  import { renderPreciseCellDate } from 'utilities/date';
  import TableHeaderCell from 'components/tableHeader/TableHeaderCell.svelte';

  const datePoP = getDashboardState('datePoP');
  const datePrecision = getDashboardState('datePrecision');

  $: label = renderPreciseCellDate($datePoP, $datePrecision);
</script>

<TableHeaderCell>
  <slot />
  <div
    class="txcm-tableHeaderCellColumn">
      % от выр.<br>
      млн. руб
  </div>
  <div
    class="txcm-tableHeaderCellColumn">
      ∆ (ppt)<br>
      {label}
  </div>
  <div
    class="txcm-tableHeaderCellColumn">
      ∆ (ppt)<br>
      от бюд.
  </div>
</TableHeaderCell>
