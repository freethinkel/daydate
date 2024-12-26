<script lang="ts">
  import { onMount, onDestroy, type Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  let ref: HTMLDivElement;
  let portal: HTMLDivElement;

  onMount(() => {
    portal = document.createElement("div");
    portal.className = "portal";
    document.body.appendChild(portal);
    portal.appendChild(ref);
  });

  onDestroy(() => {
    document.body.removeChild(portal);
  });
</script>

<div class="portal-clone">
  <div bind:this={ref}>
    {@render children?.()}
  </div>
</div>

<style>
  .portal-clone {
    display: none;
  }
</style>
