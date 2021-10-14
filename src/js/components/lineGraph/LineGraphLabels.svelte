<script>

  import { getDashboardState } from 'state/dashboard';

  export let min;
  export let minLabel;
  export let max;
  export let maxLabel;
  export let indicator;
  export let isCompact;

  const units = getDashboardState('units');

  $: average = Math.round(((max + min) / 2) * 10000) / 10000;
  $: averageLabel = renderAverageLabel(indicator, average, $units);

  function formatText(value) {
    const d = parseFloat(String(value).replace(/ /g, '')) / 1000000;
    return d.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }

  function renderAverageLabel() {
    if ($units === 0 && indicator.id !== '7498') {
      return `${Math.round(average * 10000) / 100}%`
    }
    return Math.round(average);
  }  

</script>

<div
  class="txcm-linearGraphLabels"
  class:txcm-linearGraphLabels-is-compact={isCompact}>
    <div
      class="txcm-linearGraphLabel">
        {$units === 0 && indicator.id !== '7498' ? maxLabel : formatText(maxLabel)}
    </div>
    <div
      class="txcm-linearGraphLabel">
        {$units === 0 && indicator.id !== '7498' ?  averageLabel  : formatText(averageLabel)}
    </div>
    <div
      class="txcm-linearGraphLabel">
        {$units === 0 && indicator.id !== '7498' ? minLabel : formatText(minLabel)}
    </div>
</div>

