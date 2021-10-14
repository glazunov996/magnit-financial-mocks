<script>
  import { getContext } from 'svelte';
  import { getGraphsState } from 'state/graphs';
  import Int from 'components/core/internationalization/Int.svelte';
  import Dropdown from 'components/core/dropdown/Dropdown.svelte';
  import GraphOptionsDetail from './GraphOptionsDetail.svelte';

  const { graphs: graphConfig } = getContext('app').getAppConfig();
  const dashboard = getContext('config').getDashboard();
  const mode = getGraphsState('mode');
  const dynamics = getGraphsState('dynamics');
  const sliceLabels = flattenSliceLabels();
  const dynamicsLabels = flattenDynamicsLabels();
  const dynamicsOptions = updateDynamicOptions(dashboard);

  let selected = $dynamics;
  let isActive = false;

  $: $dynamics = selected;
  $: label = renderLabel($mode, $dynamics);

  function isDynamicsMode() {
    return $mode === 'graphModeDynamics';
  }

  function updateDynamicOptions() {
    if (dashboard === 'financial') return graphConfig.dynamics.slice(2);
    return graphConfig.dynamics;
  }

  function fattenDynamicsLabel(result, option) {
    return {
      ...result,
      [option.value]: option.subLabel,
    };
  }

  function flattenDynamicsLabels() {
    return graphConfig.dynamics.reduce(fattenDynamicsLabel, {});
  }

  function fattenSliceLabel(result, option) {
    if (!option.subLabel) return result;
    return {
      ...result,
      [option.value]: option.subLabel,
    };
  }

  function flattenSliceLabels() {
    return graphConfig.modes.reduce(fattenSliceLabel, {});
  }

  function renderLabel() {
    if (isDynamicsMode()) return dynamicsLabels[$dynamics];
    return sliceLabels[$mode];
  }

  function toggle() {
    isActive = !isActive;
  }

  function hide() {
    isActive = false;
  }

  function onToggleClick() {
    toggle();
  }

  function onDropdownClose() {
    hide();
  }
</script>

<div
  class="txcm-graphDetailPicker">
    {#if isDynamicsMode($mode)}
      <button
        class="txcm-graphDetailPickerToggle"
        on:click|stopPropagation={onToggleClick}>
          <svg
            class="txcm-graphDetailPickerToggleIcon">
              <use
                xlink:href="#txspt-icons-fatArrow" />
          </svg>
          <Int
            key={label} />
      </button>
      <Dropdown
        {isActive}
        on:dropdownclose={onDropdownClose}>
          <div
            class="txcm-graphDetailOptions"
            class:txcm-graphDetailOptions-is-active={isActive}
            on:click|stopPropagation>
              <Int
                key="Грануляция" />
              {#each dynamicsOptions as option}
                <GraphOptionsDetail
                  value={option.value}
                  label={option.label}
                  subLabel={option.subLabel}
                  bind:selected />
              {/each}
          </div>
      </Dropdown>
    {:else}
      <Int
        key={label} />
    {/if}
</div>
