<script>
  export let data;

  function isNegative() {
    return data.shift < 0;
  }

  function isInvisible() {
    return !data.visible;
  }

  function renderOrderClass() {
    return ` txcm-consolidatedGraphBarComponent-is-order${data.order + 1}`;
  }
</script>

<div
  class={`txcm-consolidatedGraphBarComponent${renderOrderClass(data)}`}
  class:txcm-consolidatedGraphBarComponent-is-negative={isNegative(data)}
  class:txcm-consolidatedGraphBarComponent-is-invisible={isInvisible(data)}
  style="--valueScale: {-data.shift}%"
  data-value={data.value}>
</div>
