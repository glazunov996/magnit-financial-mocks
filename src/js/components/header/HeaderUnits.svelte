<script>
  import Stepper from 'components/core/stepper/Stepper.svelte';
  import { getDashboardState } from 'state/dashboard';

  const UNIT_OPTIONS = [{
    label: '% от выр.',
    value: 0,
  }, {
    label: 'млн. руб',
    value: 1,
  }];

  export let variant;
  export let disabled = false;
  export let indicator;

  const units = getDashboardState('units');

  $: isDisabled = indicator === 'revenue' ? true : disabled

</script>

<Stepper
  name={`uintOptions-${variant}`}
  bind:pick={$units}
  options={UNIT_OPTIONS}
  disabled={isDisabled}
  theme="txcm-unitStepper" />
