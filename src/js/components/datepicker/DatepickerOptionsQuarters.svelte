<script>
  import Int from 'components/core/internationalization/Int.svelte';
  import { calculateQuarter } from 'utilities/date';

  export let precision;
  export let month;
  export let quarter;
  export let year;

  export let lowerLimit;
  export let upperLimit;
  export let highlitedQuarter = null;
  export let yearOptions;
  export let quarterOptions;

  $: limits = updateLimits(year, lowerLimit, upperLimit);

  function updateLimits() {
    return {
      year: yearOptions[year],
      lowerLimitYear: lowerLimit ? new Date(lowerLimit).getFullYear() : -10000,
      lowerLimitQuarter: lowerLimit ? calculateQuarter(lowerLimit) : -10000,
      upperLimitYear: upperLimit ? new Date(upperLimit).getFullYear() : 10000,
      upperLimitQuarter: upperLimit ? calculateQuarter(upperLimit) : 10000,
    };
  }

  function isActive(index) {
    return precision === 3 && index === quarter;
  }

  function onOptionClick({ target }) {
    precision = 3;
    quarter = parseInt(target.dataset.option, 10);
    month = quarter * 3;
  }

  function onOptionMouseOver({ target }) {
    highlitedQuarter = parseInt(target.dataset.option, 10);
  }

  function onOptionMouseOut() {
    highlitedQuarter = null;
  }

  function checkDisabled(option) {
    const optionQuarter = option + 1;
    const isLowerYear = limits.year > limits.upperLimitYear;
    const isUpperYear = limits.year < limits.lowerLimitYear;
    const isLowerQuarter = (limits.year === limits.upperLimitYear && optionQuarter > limits.upperLimitQuarter);
    const isUpperQuarter = (limits.year === limits.lowerLimitYear && optionQuarter < limits.lowerLimitQuarter);
    return isLowerYear || isUpperYear || isLowerQuarter || isUpperQuarter;
  }
</script>

<ol
  class="txcm-datepickerQuarters">
    {#each quarterOptions as quarterOption, index}
      <li
        class="txcm-datepickerQuarter">
          <button
            class="txcm-datepickerQuarterButton"
            class:txcm-datepickerQuarterButton-is-active={isActive(index, quarter, precision)}
            data-option={index}
            on:click={onOptionClick}
            on:mouseover={onOptionMouseOver}
            on:mouseout={onOptionMouseOut}
            disabled={checkDisabled(index, year)}>
              <Int
                key={quarterOption} />
          </button>
      </li>
    {/each}
</ol>
