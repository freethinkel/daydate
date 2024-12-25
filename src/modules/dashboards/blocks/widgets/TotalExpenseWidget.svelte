<script lang="ts">
  import SumWidget from "./SumWidget.svelte";

  import { transactionsModel } from "@/model";

  const transactions = transactionsModel.$transactions;
  const prevMonthTransactions = transactionsModel.$prevMonthTransactions;

  $: sum = $transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  $: prevMonthSum = $prevMonthTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
</script>

<SumWidget currentMonthSum={sum} {prevMonthSum} title="Total expense" />
