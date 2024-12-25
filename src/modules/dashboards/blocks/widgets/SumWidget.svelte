<script lang="ts">
  import { Icon } from "@/shared/components/icon";
  import WidgetWrapper from "./WidgetWrapper.svelte";
  import { formatAmount } from "@/shared/helpers/number-formatter";
  import { settingsModel } from "@/model";

  export let currentMonthSum = 0;
  export let prevMonthSum = 0;
  export let title = "";
  export let swapArrows = false;

  const settings = settingsModel.$settings;
  const currency = $settings.currency;
</script>

<WidgetWrapper>
  <div class="left">
    <div class="title">
      {title}
    </div>
    {#if currentMonthSum}
      <div class="value">{formatAmount(currentMonthSum)} {currency}</div>
    {/if}
    <div
      class="footer"
      class:more={currentMonthSum > prevMonthSum}
      class:less={currentMonthSum < prevMonthSum}
    >
      {#if prevMonthSum !== 0}
        {#if currentMonthSum !== prevMonthSum}
          <Icon
            name={currentMonthSum > prevMonthSum && !swapArrows
              ? "expenses"
              : "income"}
            size={16}
          />
        {/if}
        {#if prevMonthSum === 0}
          100% vs last month
        {:else}
          {(currentMonthSum * 100) / prevMonthSum - 100}% vs last month
        {/if}
      {/if}
    </div>
  </div>
</WidgetWrapper>

<style lang="postcss">
  .footer {
    display: flex;
    align-items: center;
  }

  .less :global(.icon svg path) {
    fill: var(--color-red);
  }

  .more :global(.icon svg path) {
    fill: var(--color-green);
  }

  .value {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .title,
  .footer {
    color: oklch(from var(--color-text) l c h / 50%);
  }
</style>
