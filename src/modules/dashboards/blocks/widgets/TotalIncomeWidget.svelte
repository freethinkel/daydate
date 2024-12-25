<script lang="ts">
  import { transactionsModel } from "@/model";
  import SumWidget from "./SumWidget.svelte";

  const transactions = transactionsModel.$transactions;
  const prevMonthTransactions = transactionsModel.$prevMonthTransactions;
  $: sum = $transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  $: prevMonthSum = $prevMonthTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
</script>

<SumWidget
  currentMonthSum={sum}
  {prevMonthSum}
  title="Total income"
  swapArrows
/>
