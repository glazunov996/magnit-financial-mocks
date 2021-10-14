<script>
  import LineGraphPoint from './LineGraphPoint.svelte';

  export let points;
  export let min;
  export let max;
  export let count;
  export let shift;
  export let height;
  export let padding;
  export let indicator;
</script>

{#each points as point, index}
  {#if point}
    <LineGraphPoint
      {indicator}
      {count}
      {shift}
      {height}
      {padding}
      {index}
      {min}
      {max}
      data={point} />
  {/if}
{/each}
