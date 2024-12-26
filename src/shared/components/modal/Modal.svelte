<script lang="ts">
  import { browser } from "$app/environment";
  import { onDestroy, onMount, type Snippet } from "svelte";
  import Portal from "svelte-portal";
  import { fade } from "svelte/transition";

  interface Props {
    title?: string;
    children?: Snippet;
    onClose: () => void;
    onClick?: () => void;
  }

  let { title = "", children, onClose, onClick }: Props = $props();

  onMount(() => {
    if (!browser) return;
    document.body.style.overflow = "hidden";
  });

  onDestroy(() => {
    if (!browser) return;
    document.body.style.overflow = "";
  });
</script>

<Portal target="body">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="wrapper" onclick={onClose} transition:fade={{ duration: 100 }}>
    <div
      class="content"
      onclick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      <div class="header">
        <h3 class="title">
          {title}
        </h3>
      </div>
      <div class="inner">
        {@render children?.()}
      </div>
    </div>
  </div>
</Portal>

<style>
  .title {
    margin: 0;
  }
  .header {
    padding: var(--padding-m);
  }
  .wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: oklch(from var(--color-text) l c h / 15%);
    /* backdrop-filter: blur(5px); */
    display: flex;
    justify-content: flex-end;
    padding: var(--padding-l);
    z-index: 999999;
  }
  .inner {
    min-height: 0;
    flex: 1;
    overflow: auto;
    width: 450px;
  }
  .content {
    max-width: 500px;
    height: 100%;
    background: var(--color-surface);
    box-shadow: var(--shadow-l);
    border: 1px solid var(--color-separator);
    display: flex;
    flex-direction: column;
    border-radius: calc(var(--radius) + var(--padding-m));
  }
</style>
