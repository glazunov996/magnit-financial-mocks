<script>
  import DatepickerSwitcher from './DatepickerSwitcher.svelte';
  import DatepickerOptionWeeks from './DatepickerOptionsWeeks.svelte';
  import DatepickerOptionDays from './DatepickerOptionsDays.svelte';

  export let precision;
  export let day;
  export let week;
  export let month;
  export let year;
  export let name;

  export let lowerLimit;
  export let upperLimit;
  export let monthOptions;
  export let yearOptions;

  function renderStatus() {
    if (precision <= 1) return 'txcm-datepickerSection-month-is-active';
    return 'txcm-datepickerSection-month-is-inactive';
  }
</script>

<div
  class={`txcm-datepickerSection ${renderStatus(precision)}`}>
    <DatepickerSwitcher
      bind:precision
      bind:pick={month}
      options={monthOptions}
      precisionOption={2} />
    <DatepickerOptionWeeks
      bind:precision
      bind:day
      bind:week
      bind:month
      bind:year
      {lowerLimit}
      {upperLimit}
      {yearOptions} />
    <DatepickerOptionDays
      bind:precision
      bind:day
      bind:week
      bind:month
      bind:year
      {name}
      {lowerLimit}
      {upperLimit}
      {yearOptions} />
</div>
