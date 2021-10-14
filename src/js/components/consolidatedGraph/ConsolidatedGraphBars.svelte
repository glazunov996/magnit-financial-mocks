<script>
  import ConsolidatedGraphBar from './ConsolidatedGraphBar.svelte';

  export let bars;
  export let isExpanded;
</script>

{#each bars as bar, index}
  {#if bar}
    <ConsolidatedGraphBar
      {bar}
      {isExpanded} />
  {/if}
{/each}
