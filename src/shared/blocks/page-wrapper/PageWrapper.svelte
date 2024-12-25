<div class="wrapper" class:with-header={$$slots.header}>
  {#if $$slots.header}
    <div class="header" data-tauri-drag-region>
      <slot name="header" />
    </div>
  {/if}
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: grid;
    width: 100%;
  }
  .with-header {
    grid-template-rows: 50px 1fr;
  }
  .content {
    overflow: auto;
    padding: var(--padding-m);
  }
  .header {
    border-bottom: 1px solid var(--color-separator);
  }
</style>
