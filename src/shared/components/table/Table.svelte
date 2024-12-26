<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<table>
  {@render children?.()}
</table>

<style>
  table {
    min-width: 100%;
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;

    --cell-padding: 0.5rem;
  }

  table :global(td) {
    padding: var(--cell-padding);
    color: var(--color-text);
  }
</style>
