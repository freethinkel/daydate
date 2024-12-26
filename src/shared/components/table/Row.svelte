<script lang="ts">
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";

  interface Props {
    class?: string;
    onClick?: () => void;
    onBlur?: () => void;
    onFocusout?: () => void;
    onFocusin?: () => void;
    onContextmenu?: () => void;
    children?: Snippet;
    animated?: boolean;
    interactive?: boolean;
  }

  const {
    class: className,
    onBlur,
    onClick,
    onFocusout,
    onFocusin,
    onContextmenu,
    children,
    animated,
    interactive,
  }: Props = $props();
</script>

<tr
  onclick={onClick}
  class={className}
  class:interactive
  onblur={onBlur}
  onfocusout={onFocusout}
  onfocusin={onFocusin}
  oncontextmenu={onContextmenu}
  out:slide|local={{ duration: animated ? 300 : 0 }}
>
  {@render children?.()}
</tr>

<style lang="postcss">
  tr {
  }
  .interactive {
    cursor: pointer;

    &:hover {
      background: var(--color-hover);
    }
  }
  :global(tbody) tr + :global(tr) {
    border-top: 1px solid var(--color-separator);
  }
</style>
