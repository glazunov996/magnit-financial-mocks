<script>
  import { getDashboardState } from 'state/dashboard';
  import FactorsTotalRow from 'components/factorsTotal/FactorsTotalRow.svelte';
  import FactorsTotalLabel from 'components/factorsTotal/FactorsTotalLabel.svelte';
  import FactorsTotalCell from 'components/factorsTotal/FactorsTotalCell.svelte';
  import { translate } from 'utilities/dictionary';
  import { getUIState } from 'state/ui';

  export let data;
  export let baseRatios;
  export let minRatios;
  export let isInverted;

  const datePoP = getDashboardState('datePoP');
  const locale = getUIState('locale');  

  $: label = renderLabel($datePoP, $locale);
  $: column1 = data.column1;
  $: column2 = data.column2;

  function renderLabel() {
    const year = (new Date($datePoP)).getFullYear();
    return `${translate("Факт", $locale)} ${year}`;
  }
</script>

<FactorsTotalRow>
  <FactorsTotalLabel
    {label} />
  {#if data}
    <FactorsTotalCell
      {isInverted}
      value={column1.factPrevYearPrecent}
      baseRatio={baseRatios[0]}
      minRatio={minRatios[0]}
      diagrams={[
        [column1.factCurrYearPercent.qNum, column1.factPrevYearPrecent.qNum],
        null
      ]} /> 
    <FactorsTotalCell
      {isInverted}
      value={column2.factPrevYearPrecent}
      baseRatio={baseRatios[2]}
      minRatio={minRatios[2]}
      diagrams={[
        [column2.factCurrYearPercent.qNum, column2.factPrevYearPrecent.qNum],
        null
      ]} />   
  {/if}
</FactorsTotalRow>
