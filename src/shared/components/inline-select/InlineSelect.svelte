<script lang="ts">
  import { Spring } from "svelte/motion";

  interface Props {
    options?: string[];
    selected?: number;
    onSelect: (tab: number) => void;
  }

  let { options = [], selected = 0, onSelect }: Props = $props();
  const left = new Spring(0, { stiffness: 0.15, damping: 1, precision: 0.01 });
  const width = new Spring(0, { stiffness: 0.5 });

  let wrapperRef: HTMLDivElement;

  const updatePositions = (index: number) => {
    setTimeout(() => {
      if (!wrapperRef) {
        return;
      }

      const wrapperRect = wrapperRef.getBoundingClientRect();
      const tab = wrapperRef.querySelectorAll(".tab")![index];
      const tabRect = tab.getBoundingClientRect();

      left.set(tabRect.left - wrapperRect.left);
      width.set(tabRect.width);
    });
  };

  $effect(() => {
    updatePositions(selected);
  });
</script>

<div class="wrapper_of_wrapper">
  <div class="wrapper" bind:this={wrapperRef}>
    {#each options as option, index}
      <button
        class="tab"
        type="button"
        class:selected={index === selected}
        onclick={() => onSelect(index)}
      >
        {option}
      </button>
    {/each}
    <div
      class="indicator"
      style:--left="{left.current}px"
      style:--width="{width.current}px"
    ></div>
  </div>
</div>

<style lang="postcss">
  .wrapper_of_wrapper {
    padding: 2px;
    border: 1px solid var(--color-separator);
    width: min-content;
    border-radius: calc(var(--radius) + 3px);
    background-color: var(--color-panel);
  }
  .wrapper {
    display: inline-flex;
    gap: var(--padding-m);
    position: relative;
    border-radius: var(--radius);
    width: min-content;
  }
  .indicator {
    position: absolute;
    height: 100%;
    width: var(--width);
    left: var(--left);
    background-color: var(--color-hover);
    border-radius: var(--radius);
    top: 0;
    z-index: 0;
  }
  .tab {
    cursor: pointer;
    padding: var(--padding-m);
    appearance: none;
    font-weight: normal;
    background: none;
    border: none;
    color: var(--color-text);
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 28px;
    transition:
      var(--transition) transform,
      var(--transition) font-weight;

    &:active,
    &:active ~ .indicator {
      transform: scale(0.98);
    }
  }
  .tab.selected {
    font-weight: bold;
  }
</style>
