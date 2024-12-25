<script lang="ts">
  import { PageWrapper } from "@/shared/blocks/page-wrapper";
  import { TotalIncomeWidget, TotalExpenseWidget } from "../blocks/widgets";
  import { MonthPicker } from "@/shared/components/date-picker";
  import { appModel } from "@/model";

  const selectedMonth = appModel.$selectedMonth;
</script>

<PageWrapper>
  <div class="controls" slot="header">
    <MonthPicker
      value={$selectedMonth}
      on:change={({ detail }) => appModel.selectMonth(detail)}
    />
  </div>

  <div class="top">
    <TotalIncomeWidget />
    <TotalExpenseWidget />
  </div>
</PageWrapper>

<style>
  .top {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: var(--padding-m);
    padding: var(--padding-l);
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 var(--padding-m);
  }
</style>
