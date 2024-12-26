<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="wrapper">
	{@render children?.()}
</div>

<style>
	.wrapper {
		border-radius: var(--radius);
		border: 1px solid var(--color-accent);
		padding: var(--padding-l);
	}
</style>
