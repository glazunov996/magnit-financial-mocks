<script>
  import TableHeaderCell from 'components/tableHeader/TableHeaderCell.svelte';
  import Int from 'components/core/internationalization/Int.svelte';

  export let date;
</script>

<TableHeaderCell>
  <slot />
  <div
    class="txcm-tableHeaderCellWideColumn">
      <span>
        ∆ (ppt)
      </span>
      <span style="margin-top: -4px;">
        {date}
      </span>      
  </div>
  <div
    class="txcm-tableHeaderCellWideColumn">
      <span>
        ∆ (ppt)
      </span>
      <span style="margin-top: -4px;">
        <Int key="от бюд."/>
      </span>
  </div>  
</TableHeaderCell>
