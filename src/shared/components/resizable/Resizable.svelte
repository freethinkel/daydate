<script lang="ts">
  import { onMount, type Snippet } from "svelte";

  interface Props {
    id?: string;
    initialWith?: number;
    maxWidth?: number;
    minWidth?: number;
    children?: Snippet;
  }

  let {
    id = "default",
    initialWith = 200,
    maxWidth = 350,
    minWidth = 150,
    children,
  }: Props = $props();

  let width = $state(initialWith);
  let isDragging = $state(false);

  const onMouseUp = () => {
    isDragging = false;
    document.body.style.cursor = "";
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);

    localStorage.setItem(id, width.toString());
  };
  const onMouseMove = (event: MouseEvent) => {
    width = event.pageX;
    event.stopPropagation();
    event.preventDefault();

    if (width < minWidth) {
      document.body.style.cursor = "e-resize";
    } else if (width > maxWidth) {
      document.body.style.cursor = "w-resize";
    } else {
      document.body.style.cursor = "col-resize";
    }
  };

  onMount(() => {
    width = Number(localStorage.getItem(id)) || initialWith;
  });

  const onMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    isDragging = true;
    document.body.style.cursor = "col-resize";
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  };

  let safeWidth = $derived(Math.max(Math.min(width, maxWidth), minWidth));
</script>

<div class="wrapper" style:width="{safeWidth}px">
  {@render children?.()}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="drag" class:active={isDragging} onmousedown={onMouseDown}></div>
</div>

<style lang="postcss">
  .wrapper {
    height: 100%;
    position: relative;
  }
  .drag {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: oklch(from var(--color-accent) l c h / 0.1);
    backdrop-filter: blur(10px);
    right: 0;
    width: 6px;
    opacity: 0;
    cursor: col-resize;
    transition: var(--transition);
    transform: translateX(50%);

    &:hover,
    &.active {
      opacity: 1;
    }

    &::before {
      content: "";
      position: absolute;
      height: 20px;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 3px;
      border-radius: 10em;
      background: oklch(from var(--color-title) l c h / 50%);
    }
  }
</style>
