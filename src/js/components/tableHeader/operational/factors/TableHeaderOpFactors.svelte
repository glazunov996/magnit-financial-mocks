<script>
  import { getDashboardState } from 'state/dashboard';
  import { renderPreciseTableDate } from 'utilities/date';
  import ColumnOptions from 'components/columnOptions/ColumnOptions.svelte';
  import TableHeader from 'components/tableHeader/TableHeader.svelte';
  import TableHeaderCellOperationalFactors from './TableHeaderCellOpFactors.svelte';

  const date = getDashboardState('date');
  const datePrecision = getDashboardState('datePrecision');

  $: label = renderPreciseTableDate($date, $datePrecision);
</script>

<TableHeader
  detail="factors">
    <TableHeaderCellOperationalFactors>
      <div
        class="txcm-tableHeaderCellLabel">
          {label}
          <div
            class="txcm-tableHeaderCellLabelNote">
              % от выр.
          </div>
      </div>
    </TableHeaderCellOperationalFactors>
    <TableHeaderCellOperationalFactors>
      <div
        class="txcm-tableHeaderCellLabel">
          <ColumnOptions />
          <div
            class="txcm-tableHeaderCellLabelNote">
              % от выр.
          </div>
      </div>
    </TableHeaderCellOperationalFactors>
</TableHeader>
