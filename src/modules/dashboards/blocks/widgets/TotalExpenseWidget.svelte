<script lang="ts">
  import SumWidget from "./SumWidget.svelte";

  import { transactionsModel } from "@/model";

  const transactions = transactionsModel.$transactions;
  const prevMonthTransactions = transactionsModel.$prevMonthTransactions;

  let sum = $derived($transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0));

  let prevMonthSum = $derived($prevMonthTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0));
</script>

<SumWidget currentMonthSum={sum} {prevMonthSum} title="Total expense" />
