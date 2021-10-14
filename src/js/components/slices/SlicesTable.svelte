<script>
  import Slice from 'components/slice/Slice.svelte';

  export let data;
  export let indicator;
  export let isInverted;

  $: fragment = updateFragment(data);

  function checkValues(value) {
    return value && value.qNum !== null && (value.qNum !== 'NaN' || !isNaN(value.qNum));
  }

  function checkColumnData(column) {
    return ['factPercent', 'factPpPercent', 'vsBudgetPercent', 'vsPpPercent'].some(key => checkValues(column[key]));
  }

  function filterRow(row) {
    return ['column1', 'column2'].some(key => checkColumnData(row[key]));
  }

  function updateFragment() {
    return data.filter(filterRow);
  }
</script>

{#each fragment as row (row.name)}
  <Slice
    {isInverted}
    {indicator}
    {row} />
{/each}
