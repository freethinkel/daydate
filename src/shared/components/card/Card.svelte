<script lang="ts">
  import { type Snippet } from "svelte";
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="wrapper">
  {@render children?.()}
</div>

<style>
  .wrapper {
    display: flex;
    width: 100%;
    padding: var(--padding-s);
    border-radius: var(--radius);
    background-color: var(--color-panel);
  }
</style>
