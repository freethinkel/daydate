<script lang="ts">
  import { Table } from "@/shared/components/table";
  import { budgetModel, settingsModel } from "@/model";
  import { formatAmount } from "@/shared/helpers/number-formatter";
  import { Button } from "@/shared/components/button";
  import { Icon } from "@/shared/components/icon";
  import { formatDate } from "date-fns";

  const budget = budgetModel.$budget;
  const settings = settingsModel.$settings;
  let sum = $derived($budget.reduce((acc, curr) => acc + curr.amount, 0));
</script>

<div class="wrapper">
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.Head width="60%">Category</Table.Head>
        <Table.Head width="20%">Date</Table.Head>
        <Table.Head width="20%" align="right">Amount</Table.Head>
        <Table.Head width="10px"></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each $budget as row (row.id)}
        <Table.Row class="row" interactive>
          <Table.Cell width="60%">{row.name}</Table.Cell>
          <Table.Cell width="20%">{formatDate(row.date, "dd MMMM")}</Table.Cell>
          <Table.Cell width="20%" align="right">
            <div class="value">
              {formatAmount(row.amount)}
              <div class="currency">
                {$settings.currency}
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            <Button
              size="small"
              style="icon"
              onClick={() => budgetModel.deleteBudget(row.id)}
            >
              <Icon name="delete" size={16} />
            </Button>
          </Table.Cell>
        </Table.Row>
      {/each}

      <Table.Row>
        <Table.Cell width="60%">{$budget.length}</Table.Cell>
        <Table.Cell width="20%"></Table.Cell>
        <Table.Sum
          value={sum}
          currency={$settings.currency}
          width="20%"
          align="right"
        />
        <Table.Cell></Table.Cell>
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
  .currency {
    color: var(--color-text);
    margin-left: var(--padding-s);
    font-size: 0.9rem;
    border-radius: var(--radius);
    padding: 2px;
    line-height: 1.1;
  }
</style>
