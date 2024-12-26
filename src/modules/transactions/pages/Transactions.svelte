<script lang="ts">
  import { appModel } from "@/model";
  import { PageWrapper } from "@/shared/blocks/page-wrapper";
  import { MonthPicker } from "@/shared/components/date-picker";
  import { Button } from "@/shared/components/button";
  import { Icon } from "@/shared/components/icon";
  import { Modal } from "@/shared/components/modal";
  import { TransactionForm } from "../blocks/transaction-form";
  import { TransactionsTable } from "../blocks/transactions-table";

  const selectedMonth = appModel.$selectedMonth;

  let isTransactionsFormOpen = $state(false);
</script>

<PageWrapper>
  {#snippet header()}
    <div class="controls">
      <MonthPicker
        value={$selectedMonth}
        onChange={(month) => appModel.selectMonth(month)}
      />
      <div class="controls__buttons">
        <Button style="outline">
          <Icon name="plus" />
          Import from invoice
        </Button>

        <Button
          onClick={() => (isTransactionsFormOpen = !isTransactionsFormOpen)}
        >
          <Icon name="plus" />
          Add transaction
        </Button>
      </div>
    </div>
  {/snippet}
  <TransactionsTable />

  {#if isTransactionsFormOpen}
    <Modal
      onClose={() => (isTransactionsFormOpen = false)}
      title="Create transaction"
    >
      <TransactionForm onCreate={() => (isTransactionsFormOpen = false)} />
    </Modal>
  {/if}
</PageWrapper>

<div class="mobile-controls">
  <Button
    style="filled_icon"
    onClick={() => (isTransactionsFormOpen = !isTransactionsFormOpen)}
    size="large"
  >
    <Icon name="plus" />
  </Button>
</div>

<style lang="postcss">
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 var(--padding-m);
  }

  .controls__buttons {
    display: flex;
    gap: var(--padding-m);

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .mobile-controls {
    display: none;

    @media screen and (max-width: 768px) {
      display: block;
      position: fixed;
      bottom: calc(60px + var(--padding-l));
      right: var(--padding-l);
    }
  }
</style>
