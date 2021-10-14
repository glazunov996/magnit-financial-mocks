<script>
  import ConsolidatedGraphComponent from './ConsolidatedGraphComponent.svelte';

  export let bar;
  export let isExpanded;
</script>

<div
  class="txcm-consolidatedGraphBar"
  class:txcm-consolidatedGraphBar-is-expanded={isExpanded}>
    {#each bar as component, index}
      <ConsolidatedGraphComponent
        data={component} />
    {/each}
</div>
