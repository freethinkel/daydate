<script lang="ts">
  import {
    settingsModel,
    transactionFiltersModel,
    transactionsModel,
  } from "@/model";
  import type { TransactionType } from "@/model/transactions/types";
  import { Button } from "@/shared/components/button";
  import { Icon } from "@/shared/components/icon";
  import { InlineSelect } from "@/shared/components/inline-select";
  import { Table } from "@/shared/components/table";
  import { formatAmount } from "@/shared/helpers/number-formatter";
  import { formatDate } from "date-fns";

  const transactions = transactionsModel.$transactions;
  const type = transactionFiltersModel.$type;
  const settings = settingsModel.$settings;
  const { deleteTransaction } = transactionsModel;

  const filteredTransactions = $derived(
    $transactions.filter((transaction) => {
      if ($type === "all") return true;
      return $type === "expense"
        ? transaction.amount < 0
        : transaction.amount > 0;
    })
  );

  const sum = $derived(
    filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0)
  );

  const typeOptions = {
    all: "All",
    expense: "Expense",
    income: "Income",
  } as const;
  const changeType = (type: number) =>
    transactionFiltersModel.changeType(
      Object.keys(typeOptions)[type] as TransactionType
    );
</script>

<div class="wrapper">
  <div class="filters">
    <InlineSelect
      options={Object.values(typeOptions)}
      selected={Object.keys(typeOptions).indexOf($type)}
      onSelect={(tab) => changeType(tab)}
    />
  </div>
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head width="60%">Name</Table.Head>
        <Table.Head width="20%">Date</Table.Head>
        <Table.Head width="20%" align="right">Amount</Table.Head>
        <Table.Head width="10px"></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each filteredTransactions as row (row.id)}
        <Table.Row class="row" interactive>
          <Table.Cell width="60%">{row.name}</Table.Cell>
          <Table.Cell width="20%">{formatDate(row.date, "dd MMMM")}</Table.Cell>
          <Table.Cell width="20%" align="right">
            <div
              class="value"
              class:income={row.amount > 0}
              class:expense={row.amount < 0}
            >
              {#if row.amount < 0}
                <div>-</div>
              {:else if row.amount > 0}
                <div>+</div>
              {/if}
              {formatAmount(Math.abs(row.amount))}
              <div class="currency">
                {$settings.currency}
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            <Button
              size="small"
              style="icon"
              onClick={() => deleteTransaction(row.id)}
            >
              <Icon name="delete" size={16} />
            </Button>
          </Table.Cell>
        </Table.Row>
      {/each}

      <Table.Row>
        <Table.Cell width="60%">{$transactions.length}</Table.Cell>
        <Table.Cell width="20%" />
        <Table.Sum
          value={sum}
          currency={$settings.currency}
          width="20%"
          align="right"
        />

        <Table.Cell />
      </Table.Row>
    </Table.Body>
  </Table>
</div>

<style>
  .value {
    justify-content: flex-end;
    display: flex;
    align-items: last baseline;
  }
  .income {
    color: var(--color-green);
  }
  .expense {
    color: var(--color-red);
  }
  .filters {
    padding-bottom: var(--padding-s);
  }
  .currency {
    color: var(--color-text);
    margin-left: var(--padding-s);
    font-size: 0.9rem;
    border-radius: var(--radius);
    padding: 2px;
    line-height: 1.1;
  }
</style>
