<script lang="ts">
  import { type Snippet } from "svelte";

  interface Props {
    type?: "button" | "submit";
    style?: "filled" | "outline" | "icon" | "filled_icon";
    size?: "small" | "default" | "large";
    disabled?: boolean;
    children?: Snippet;
    onClick?: () => void;
  }

  let {
    type = "button",
    style = "filled",
    size = "default",
    disabled = false,
    children,
    onClick,
  }: Props = $props();
</script>

<button {type} {disabled} class="style__{style} size__{size}" onclick={onClick}>
  {@render children?.()}
</button>

<style lang="postcss">
  button {
    appearance: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform var(--transition);
    -webkit-tap-highlight-color: transparent;

    &:not(:disabled) {
      cursor: pointer;
    }
    &:not(:disabled):active {
      transform: scale(0.98);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .style__icon {
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--size) !important;
    width: var(--size) !important;

    & :global(.icon svg path) {
      fill: var(--color-text);
    }
  }

  .style__filled {
    background: var(--color-accent);
    border-radius: var(--radius);
    border: none;
    color: var(--color-surface);
    box-shadow:
      rgba(62, 62, 62, 0.1) 0px -2.4px 0px 0px inset,
      rgba(40, 40, 40, 0.2) 0px 1px 3px 0px,
      oklch(from var(--color-accent) calc(l - 0.1) c h) 0px 0px 0px 1px;
  }

  .style__outline {
    color: var(--color-text);
    border-radius: var(--radius);
    border: 1px solid var(--color-separator);
    background: var(--color-panel);
  }

  .size__default:not(.style__icon):not(.style__filled_icon) {
    padding: 0 var(--padding-m);
    height: 36px;
    gap: var(--padding-s);
  }
  .size__large:not(.style__icon):not(.style__filled_icon) {
    padding: 0 var(--padding-l);
    height: 48px;
    gap: var(--padding-m);
  }

  .style__filled_icon {
    background: var(--color-accent);
    border-radius: var(--radius);
    border: none;
    color: var(--color-surface);
    border-radius: 50%;
    height: var(--size);
    width: var(--size);
    box-shadow:
      rgba(62, 62, 62, 0.1) 0px -2.4px 0px 0px inset,
      rgba(40, 40, 40, 0.2) 0px 1px 3px 0px,
      oklch(from var(--color-accent) calc(l - 0.1) c h) 0px 0px 0px 1px;
  }

  .style__icon.size__small {
    --size: 28px;
  }
  .style__icon.size__default {
    --size: 32px;
  }
  .style__icon.size__large,
  .style__filled_icon.size__large {
    --size: 42px;
  }
</style>
