<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<tbody>
  {@render children?.()}
</tbody>

<style>
  tbody {
    border-top: 1px solid oklch(from var(--color-separator) l c h / 12%);
  }
</style>
