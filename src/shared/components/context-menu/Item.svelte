<script lang="ts">
  import { Icon } from "../icon";

  interface Props {
    icon?: string;
    children?: import("svelte").Snippet;
    onClick: () => void;
    onMouseUp: () => void;
  }

  let { icon = "", children, onClick, onMouseUp }: Props = $props();
</script>

<li>
  <button type="button" onclick={onClick} onmouseup={onMouseUp}>
    {#if icon}
      <Icon name={icon} size={18} />
    {/if}
    {@render children?.()}
  </button>
</li>

<style>
  button {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    gap: var(--padding-s);
    border-radius: calc(var(--radius) - var(--padding-s));
    appearance: none;
    border: none;
    background: transparent;
    font: var(--base-font);
    --color: var(--color-text);
    color: var(--color);

    & :global(svg path) {
      fill: var(--color);
    }

    &:hover {
      background: var(--color-hover);
    }
  }
</style>
