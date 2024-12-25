<script lang="ts">
	import { formatAmount } from '../../helpers/number-formatter';

	export let colspan: number | undefined = undefined;
	export let align: 'left' | 'right' = 'left';
	export let width = 'auto';
	export let value: number;
	export let currency: string | undefined = undefined;
</script>

<td {colspan} style:text-align={align} style:width on:click on:dblclick>
	<span class="label"> sum </span>
	<span class="value">
		{formatAmount(value)}
		{#if currency}
			<span class="currency"> {currency} </span>
		{/if}
	</span>
</td>

<style lang="postcss">
	.label {
		font-size: 0.9rem;
		margin-right: 2px;
		opacity: 0.6;
	}
	.value {
	}
</style>
