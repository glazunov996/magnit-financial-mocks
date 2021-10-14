<script>
  import TableHeaderCell from 'components/tableHeader/TableHeaderCell.svelte';
  import Int from 'components/core/internationalization/Int.svelte';

  export let date;
</script>

<TableHeaderCell>
  <slot />
  <div
    class="txcm-tableHeaderCellColumn">
      <span>
        <Int key="% от выр."/>
      </span>
      <span style="margin-top: -4px;">
        <Int key="млн. руб"/>
      </span>
  </div>
  <div
    class="txcm-tableHeaderCellColumn">
      <span>
        <Int key="∆ (ppt)"/>
      </span>
      <span style="margin-top: -4px;">
        {date}
      </span>      
  </div>
  <div
    class="txcm-tableHeaderCellColumn">
      <span>
        <Int key="∆ (ppt)"/>
      </span>
      <span style="margin-top: -4px;">
        <Int key="от бюд."/>
      </span>
  </div>
</TableHeaderCell>
