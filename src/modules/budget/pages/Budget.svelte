<script lang="ts">
  import { appModel, budgetModel } from "@/model";
  import { BudgetTable } from "../blocks/budget-table";
  import { PageWrapper } from "@/shared/blocks/page-wrapper";
  import { MonthPicker } from "@/shared/components/date-picker";
  import { onMount } from "svelte";
  import { Button } from "@/shared/components/button";
  import { Icon } from "@/shared/components/icon";
  import { Modal } from "@/shared/components/modal";
  import { BudgetForm } from "../blocks/budget-form";

  const selectedMonth = appModel.$selectedMonth;

  onMount(() => {
    budgetModel.loadBudget();
  });
  let isOpen = false;
</script>

<PageWrapper>
  <div class="controls" slot="header">
    <MonthPicker
      value={$selectedMonth}
      on:change={({ detail }) => appModel.selectMonth(detail)}
    />
    <Button on:click={() => (isOpen = !isOpen)}>
      <Icon name="plus" />
      Add budget
    </Button>
  </div>
  <BudgetTable />
  {#if isOpen}
    <Modal on:close={() => (isOpen = false)} title="Create budget">
      <BudgetForm onCreate={() => (isOpen = false)} />
    </Modal>
  {/if}
</PageWrapper>

<style>
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--padding-m);
    height: 100%;
  }
</style>
