<script>
  export let maxAbs;
  export let isExpanded;
</script>

<div
  class="txcm-consolidatedGraphLabels"
  class:txcm-consolidatedGraphLabels-is-expanded={isExpanded}>
    <div
      class="txcm-consolidatedGraphLabel">
        {maxAbs}
    </div>
    <div
      class="txcm-consolidatedGraphLabel txcm-consolidatedGraphLabel-secondary">
        {maxAbs * 0.75}
    </div>
    <div
      class="txcm-consolidatedGraphLabel txcm-consolidatedGraphLabel-secondary">
        {maxAbs * 0.5}
    </div>
    <div
      class="txcm-consolidatedGraphLabel txcm-consolidatedGraphLabel-secondary">
        {maxAbs * 0.25}
    </div>
    <div
      class="txcm-consolidatedGraphLabel">
        0
    </div>
    <div
      class="txcm-consolidatedGraphLabel txcm-consolidatedGraphLabel-secondary">
        {maxAbs * -0.25}
    </div>
    <div
      class="txcm-consolidatedGraphLabel txcm-consolidatedGraphLabel-secondary">
        {maxAbs * -0.5}
    </div>
    <div
      class="txcm-consolidatedGraphLabel txcm-consolidatedGraphLabel-secondary">
        {maxAbs * -0.75}
    </div>
    <div
      class="txcm-consolidatedGraphLabel">
        {-maxAbs}
    </div>
</div>

