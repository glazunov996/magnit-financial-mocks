<script>
  import Int from 'components/core/internationalization/Int.svelte';

  export let isExpanded;

  function toggle() {
    isExpanded = !isExpanded;
  }

  function renderLabel() {
    if (isExpanded) return 'Скрыть структуру чека';
    return 'Раскрыть структуру чека';
  }

  function onToggleClick() {
    toggle();
  }
</script>

<button
  class="txcm-consolidatedGraphToggle"
  class:txcm-consolidatedGraphToggle-is-active={isExpanded}
  on:click={onToggleClick}>
    <svg
      class="txcm-consolidatedGraphToggleIcon">
        <use
          xlink:href="#txspt-icons-angleArrow" />
    </svg>
      <Int
        key={renderLabel(isExpanded)} />
</button>
