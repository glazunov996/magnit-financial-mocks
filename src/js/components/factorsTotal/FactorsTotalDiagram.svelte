<script>
  import { checkArrowDynamics } from 'utilities/indicator';

  export let data;
  export let baseRatio;
  export let minRatio;
  export let isInverted;

  let base;
  let comparison;
  let ratio;
  let width;
  let shift = 0;

  $: updateValues(data, baseRatio);

  function renderDynamicsClass() {
    [ base, comparison ] = data;
    const dynamics = checkArrowDynamics(isInverted, comparison);
    /*
    if (dynamics === -2) return ' txcm-factorsTotalDiagramRectBase-is-decreasing';
    */
    return '';
  }

  function updateValues() {
    if (data) {
      [ base, comparison ] = data;
      width = Math.abs(comparison * baseRatio) * 100;
      shift = minRatio * 100;
      console.log("WIDTH SHIFT", width, shift)
    }
  }
</script>

<div
  class="txcm-factorsTotalDiagram">
    {#if data}
      <svg
        width="100%"
        height="19"
        class="txcm-factorsTotalDiagramSVG">
          <rect
            class={`txcm-factorsTotalDiagramRectBase${renderDynamicsClass(data)}`}
            x={`${shift}%`}
            y="0"
            width={`${width}%`}
            height="100%"
            rx="3"
            ry="3" />
      </svg>
    {/if}
</div>
