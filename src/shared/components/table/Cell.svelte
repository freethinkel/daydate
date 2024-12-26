<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    pale?: boolean;
    colspan?: number | undefined;
    align?: "left" | "right";
    width?: string;
    children?: Snippet;
    onClick?: () => void;
    onDbClick?: () => void;
  }

  let {
    pale = false,
    colspan = undefined,
    align = "left",
    width = "auto",
    children,
    onClick,
    onDbClick,
  }: Props = $props();
</script>

<td
  class:pale
  {colspan}
  style:text-align={align}
  style:width
  onclick={onClick}
  ondblclick={onDbClick}
>
  {@render children?.()}
</td>

<style>
  .pale {
    color: oklch(from var(--color-text) l c h / 40%);
  }
</style>
