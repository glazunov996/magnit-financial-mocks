<script>
  import BarChartComparison from './BarChartComparison.svelte';
  import { getGraphsState } from 'state/graphs';
  import { renderMonthShort } from 'utilities/date';
  import { translate } from 'utilities/dictionary';
  import { getUIState } from 'state/ui';

  const dynamics = getGraphsState('dynamics');

  const locale = getUIState('locale');

  export let data;
  export let count;
  export let step;
  export let indicator;
  export let isInverted;

  let min;
  let max;
  let points;
  let fragment;

  $: updatePoints(data, $locale);
  $: updateCharts(points, step, count, $locale);
  $: calculateLimits(data, isInverted);

  function calculateLimits() {
    const indexes = data.length > 3 ? [6, 2] : [1, 0];
    if (!isInverted) {
      const valuesLeft = data[indexes[1]].data.map(item => item.data < 0 ? item.data : 0)
      const valuesRight = data[indexes[0]].data.map(item => item.data < 0 ? item.data : 0)
      min = Math.min(...valuesLeft, ...valuesRight) * 10000;
    } else {
      const valuesLeft = data[indexes[1]].data.map(item => item.data > 0 ? item.data : 0)
      const valuesRight = data[indexes[0]].data.map(item => item.data > 0 ? item.data : 0)
      min = Math.max(...valuesLeft, ...valuesRight) * 10000;
    }
  }

  function getPointYear(name, type) {
    let year = parseInt(name.slice(0, 4))
    return type !== 'pp' ? year : year - 1;
  }

  function getPointLabel(name, type) {
    const year = getPointYear(name, type)
    if (name.length > 4) {
      const month = name.slice(4); 
      if ($dynamics === 'graphDetailMonth')
        return `${renderMonthShort(new Date(year, parseInt(month) - 1, 1), $locale)} ${year}`;
      if ($dynamics === 'graphDetailQuarter')
        return `${month.slice(1)} ${translate("Квартал", $locale)} ${year}`;
    }
    return year;
  }

  function zipPoints() {
    if (data.length > 3) {
      return data[0].data.reduce((result, point, index) => {
        result.push({
          tooltip: true,
          fact: point.text,
          factLabel: getPointLabel(point.name),
          vsPpLabel: getPointLabel(point.name, 'pp'),
          year: getPointYear(point.name),
          vsPp: data[4].data[index].data !== 0 && data[4].data[index].data !== null ? data[4].data[index].text || null : '-',
          vsPpPercent: data[5].data[index].data !== 0 && data[5].data[index].data !== null ? data[5].data[index].text || null : '-',
          vsBudget: data[3].data[index].data !== 0 && data[3].data[index].data !== null ? data[3].data[index].text || null : '-',
          vsBudgetPercent: data[1].data[index].data !== 0 && data[1].data[index].data !== null ? data[1].data[index].text || null : '-',
          left: data[6].data[index].data !== null && !isNaN(data[6].data[index].data) ? (data[6].data[index].data * 10000) : null,
          right: data[2].data[index].data !== null && !isNaN(data[2].data[index].data) ? (data[2].data[index].data * 10000) : null,
          deviations: data[0].data[index].data !== null
            && data[3].data[index].data !== null
            && data[3].data[index].data > data[0].data[index].data,
        });
        return result;
      }, []);
    }
    return data[0].data.reduce((result, point, index) => {
      result.push({
        factLabel: getPointLabel(point.name),
        vsPpLabel: getPointLabel(point.name, 'pp'),
        year: getPointYear(point.name),
        tooltip: data[0].data[index].data < 0 || data[1].data[index].data < 0,
        vsPpPercent: data[0].data[index] !== 0 && data[0].data[index] !== null ? data[0].data[index].text : '-',
        vsBudgetPercent: data[1].data[index] !== 0 && data[1].data[index] !== null ? data[1].data[index].text : '-',
        left: data[0].data[index].data !== null && !isNaN(data[0].data[index].data) ? (data[0].data[index].data * 10000) : null,
        right: data[1].data[index].data !== null && !isNaN(data[1].data[index].data) ? (data[1].data[index].data * 10000) : null,
      });
      return result;
    }, []);
  }

  function updateCharts() {
    fragment = points.slice(step, (step + count + 1));
  }

  function updatePoints() {
    points = zipPoints();
  }

  function checkScroll() {
    return data[0].data.length > count;
  }

  function checkLimit() {
    return step === data[0].data.length - count;
  }
</script>

<div
  class="txcm-barChart"
  class:txcm-barChart-is-scrollable={checkScroll(data, count)}
  class:txcm-barChart-is-atLimit={checkLimit(data, step, count)}>
    {#each fragment as point}
      <BarChartComparison
        {isInverted}
        {indicator}
        {point}
        {min}
        {max} />
    {/each}
</div>
