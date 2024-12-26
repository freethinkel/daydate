<script lang="ts">
  import { formatAmount } from "../../helpers/number-formatter";

  interface Props {
    colspan?: number | undefined;
    align?: "left" | "right";
    width?: string;
    value: number;
    currency?: string | undefined;
    onClick?: () => void;
    onDbClick?: () => void;
  }

  let {
    colspan = undefined,
    align = "left",
    width = "auto",
    value,
    currency = undefined,
    onDbClick,
    onClick,
  }: Props = $props();
</script>

<td
  {colspan}
  style:text-align={align}
  style:width
  onclick={onClick}
  ondblclick={onDbClick}
>
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
