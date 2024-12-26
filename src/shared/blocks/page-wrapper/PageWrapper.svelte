<script lang="ts">
  import { type Snippet } from "svelte";

  interface Props {
    header?: Snippet;
    children?: Snippet;
  }

  let { header, children }: Props = $props();
</script>

<div class="wrapper" class:with-header={header}>
  {#if header}
    <div class="header" data-tauri-drag-region>
      {@render header?.()}
    </div>
  {/if}
  <div class="content">
    {@render children?.()}
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
