<script>
  import ConsolidatedGraphLabels from './ConsolidatedGraphLabels.svelte';
  import ConsolidatedGraphBars from './ConsolidatedGraphBars.svelte';
  import ConsolidatedGraphAxes from './ConsolidatedGraphAxes.svelte';
  import ConsolidatedGraphLegend from './ConsolidatedGraphLegend.svelte';
  import ConsolidatedGraphToggle from './ConsolidatedGraphToggle.svelte';

  export let data;
  export let step;
  export let count;
  export let isExpanded;

  let bars;
  let maxAbs;

  $: calculateLimits(data);
  $: updateBars(data, step, count);

  function findMaxAbsValue(result, { values }) {
    const absValue = Object.values(values).map(value => Math.abs(value));
    const maxValues = Math.max(...absValue);
    if (maxValues > result) return maxValues;
    return result;
  }

  function findMaxAbs() {
    return data.reduce(findMaxAbsValue, 0);
  }

  function calculateLimits() {
    maxAbs = findMaxAbs();
  }

  function calculateShift(value) {
    return (value / maxAbs) * 100;
  }

  function detectVisible(bar, index, barArray) {
    let visible = true;
    if (barArray[index + 1]) {
      barArray
        .slice((index + 1))
        .some((nextBar) => {
          const diff = bar.shift - nextBar.shift;
          const condition = Math.abs(diff) <= 10;
          if (condition) visible = false;
          return condition;
        });
    }
    return {
      ...bar,
      visible,
    };
  }

  function generateBar(value, index) {
    return {
      value,
      order: index,
      shift: calculateShift(value),
    };
  }

  function sortValues(bar1, bar2) {
    return Math.abs(bar2.value) - Math.abs(bar1.value);
  }

  function generateBars({ values }) {
    return Object
      .values(values)
      .map(generateBar)
      .sort(sortValues)
      .map(detectVisible);
  }

  function updateBars() {
    const { length } = data;
    if (length <= count) bars = data.map(generateBars);
    else {
      bars = data
        .slice(step, (step + count + 1))
        .map(generateBars);
    }
  }
</script>

<ConsolidatedGraphLabels
  {maxAbs}
  {isExpanded} />
  <div
    class="txcm-consolidatedGraph"
    class:txcm-consolidatedGraph-is-expanded={isExpanded}>
      <ConsolidatedGraphAxes
        {isExpanded} />
      <ConsolidatedGraphBars
        {bars}
        {isExpanded} />
  </div>
<ConsolidatedGraphLegend
  {isExpanded} />
<ConsolidatedGraphToggle
  bind:isExpanded />
