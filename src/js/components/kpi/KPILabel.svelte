<script context="module">
  /* eslint  unicorn/filename-case: 'off' */

  const SIZES = {
    15: 'txcm-kpiLabel-is-smaller',
    25: 'txcm-kpiLabel-is-small',
    35: 'txcm-kpiLabel-is-tiny',
  };

  function checkSizeName(count, name, index, options, length) {
    if (options[index + 1]) return length === count || (length > count && length < options[index + 1][0]);
    return true;
  }

  function findSizeClass(length) {
    const [ , name ] = Object.entries(SIZES).find(([ count, className ], index, options) => checkSizeName(count, className, index, options, length));
    return name;
  }

  function renderSizeClass({ label, subLabel }) {
    const { length } = label;
    if (subLabel) return ` ${SIZES[35]}`;
    if (length < 15) return '';
    return ` ${findSizeClass(length)}`;
  }

  function renderLayoutClass({ subLabel }) {
    if (subLabel) return ' txcm-kpiLabel-has-subLabel';
    return '';
  }
</script>

<script>
  import { getContext } from 'svelte';
  import { renderURL } from 'utilities/render';
  import { updateIndicators } from 'state/indicators';
  import Int from 'components/core/internationalization/Int.svelte';
  import NavLink from 'components/core/navLink/NavLink.svelte';

  export let data;
  export let indicator;

  const dashboard = getContext('config').getDashboard();

  function onCancelClick() {
    updateIndicators({ [data.id]: false });
  }
</script>

<div
  class={`txcm-kpiLabel${renderLayoutClass(indicator)}${renderSizeClass(indicator)}`}>
    <NavLink
      linkClass="txcm-kpiLabelLink"
      to={renderURL(dashboard, indicator.url)}>
        <span
          class="txcm-kpiText">
            <Int
              key={indicator.label} />
            {#if indicator.labelUnit}
              <span
                class="txcm-kpiUnit">
                  {indicator.labelUnit}
              </span>
            {/if}
        </span>
        {#if indicator.subLabel}
          <span
            class="txcm-kpiSubText">
              <Int
                key={indicator.subLabel} />
              {#if indicator.subLabelUnit}
                <span
                  class="txcm-kpiSubUnit">
                    <Int
                      key={indicator.subLabelUnit} />
                </span>
              {/if}
          </span>
        {/if}
    </NavLink>
    <button
      class="txcm-kpiCancel"
      on:click={onCancelClick}>
        <Int
          key="Убрать показатель" />
    </button>
</div>
