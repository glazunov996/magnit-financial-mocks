<script>
  import SlicesCategory from './SlicesCategory.svelte';
  import { onMount } from 'svelte';

  export let data;
  export let tab;
  export let indicator;
  export let isInverted;

  $: ({ formats, regions } = data);

  function shouldRender(options) {
    return options && options.length > 0;
  }
</script>

{#if shouldRender(formats)}
  <SlicesCategory
    label="Форматы"
    data={formats}
    key="formats"
    {isInverted}
    {indicator}
    {tab} />
{/if}
{#if shouldRender(regions)}
  <SlicesCategory
    label="Округа"
    data={regions}
    key="regions"
    {isInverted}
    {indicator}
    {tab} />
{/if}
