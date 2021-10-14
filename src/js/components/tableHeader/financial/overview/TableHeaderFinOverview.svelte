<script>
  import { getContext } from 'svelte';
  import { getDashboardState } from 'state/dashboard';
  import { renderPreciseTableDate, renderPreciseCellDate, renderPreciseCellMonth } from 'utilities/date';
  import ColumnOptions from 'components/columnOptions/ColumnOptions.svelte';
  import GraphOptions from 'components/graphOptions/GraphOptions.svelte';
  import GraphHeader from 'components/graphHeader/GraphHeader.svelte';
  import TableHeader from 'components/tableHeader/TableHeader.svelte';
  import TableHeaderGraph from 'components/tableHeader/TableHeaderGraph.svelte';
  import TableHeaderCellFinancialOverview from './TableHeaderCellFinOverview.svelte';
  import { getUIState } from 'state/ui';

  const locale = getUIState('locale');
  const appConfig = getContext('app').getAppConfig();
  const { dateMax } = appConfig;
  const date = getDashboardState('date');
  const datePoP = getDashboardState('datePoP');
  const datePrecision = getDashboardState('datePrecision');

  let column1DateLabel;
  let column2DateLabel;

  $: label = renderPreciseTableDate($date, $datePrecision, $locale);

  $: updateLabels($datePoP, $datePrecision, dateMax, $locale);

  function updateLabels() {
    column1DateLabel = renderPreciseCellDate($datePoP, $datePrecision, $locale);
    column2DateLabel = renderPreciseCellDate($datePoP, $datePrecision, $locale);
  }
</script>

<TableHeader>
  <TableHeaderCellFinancialOverview
    date={column1DateLabel}>
      <div
        class="txcm-tableHeaderCellLabel">
          {label}
      </div>
  </TableHeaderCellFinancialOverview>
  <TableHeaderCellFinancialOverview
    date={column2DateLabel}>
      <div
        class="txcm-tableHeaderCellLabel">
          <ColumnOptions />
      </div>
  </TableHeaderCellFinancialOverview>
  <TableHeaderGraph>
    <GraphOptions />
    <GraphHeader />
  </TableHeaderGraph>
</TableHeader>
