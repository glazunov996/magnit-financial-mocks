<script>
  import NavLink from 'components/core/navLink/NavLink.svelte';

  export let dashboard;
  export let indicator;

  function onBackClick() {
    history.back();
  }
</script>

<nav
  class="txcm-navigation">
    <NavLink
      linkClass="txcm-navigationExportLink"
      to={`/dashboard/${dashboard}/export`}>
        <svg
          class="txcm-navigationExportIcon">
            <use
              xlink:href="#txspt-icons-export" />
        </svg>
    </NavLink>
    <button
      class="txcm-navigationExportBack"
      class:txcm-navigationExportBack-is-active={indicator === 'export'}
      on:click={onBackClick}>
    </button>
</nav>
