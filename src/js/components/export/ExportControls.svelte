<script>
  /* eslint unicorn/prefer-node-append: 'off' */

  import { getExportState } from 'state/export';
  import { getDashboardState } from 'state/dashboard';
  import { requestExport } from 'utilities/export';
  import { renderMonthLong, renderPreciseCellDate } from 'utilities/date';

  import Int from 'components/core/internationalization/Int.svelte';

  export let dashboard;
  export let conditions;

  const downloading = getExportState('downloading');
  const slicesFilter = getExportState('slicesFilter');
  const slicesValue = getExportState('slicesValue');
  const expressionsValue = getExportState('expressionsValue');
  const indicators = getExportState('indicators');
  const units = getDashboardState('units');
  const date = getDashboardState('date');
  const datePoP = getDashboardState('datePoP');
  const datePrecision = getDashboardState('datePrecision');

  function disable() {
    $downloading += 1;
  }

  function enable() {
    $downloading -= 1;
  }

  async function downloadExport(url) {   
    const label = $indicators.length === 1 ? $indicators[0].label : `${$indicators.length} показателя`;   
    const name1 = renderPreciseCellDate($date, $datePrecision);
    const name2 = renderPreciseCellDate($datePoP, $datePrecision);
    let response = await fetch(url);
    let blob = await response.blob();
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = `${label} ${name1} ${name2}.xlsx`;
    a.click();
  }

  function onDownloadClick() {
    disable();
    requestExport(dashboard, $indicators, $slicesValue, $expressionsValue, $slicesFilter, $units + 1, conditions)
      .then(async (url) => {  await downloadExport(url) })
      .then(enable)
      .catch(enable);
  }

  function checkDisabled() {
    return $downloading > 0 || $indicators.length === 0;
  }
</script>

<div
  class="txcm-exportControls">
    <button
      class="txcm-exportDownload"
      on:click={onDownloadClick}
      disabled={checkDisabled($downloading, $slicesFilter, $indicators)}>
        <Int
          key="Скачать" />
    </button>
</div>
