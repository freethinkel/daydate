<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    align?: "left" | "right";
    width?: string;
    children?: Snippet;
  }

  let { align = "left", width = "auto", children }: Props = $props();
</script>

<th style:text-align={align} style:width>
  {@render children?.()}
</th>

<style>
  th {
    color: var(--color-title);
    padding: var(--cell-padding);
    text-align: left;
  }
</style>
