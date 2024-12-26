<script lang="ts">
  import { Input } from "@/shared/components/input";
  import { Button } from "@/shared/components/button";
  import { transactionsModel } from "@/model";
  import { InlineSelect } from "@/shared/components/inline-select";
  import {
    formatAmount,
    parseFormattedAmount,
  } from "@/shared/helpers/number-formatter";

  const formValues = transactionsModel.$formValues;
  type Props = {
    onCreate: () => void;
  };
  const { onCreate }: Props = $props();

  const onSelect = (index: number) => {
    transactionsModel.handleChange({
      name: "type",
      value: (["expense", "income"] as const)[index],
    });
  };
</script>

<form
  class="wrapper"
  onsubmit={() => {
    transactionsModel.handleSubmit();
    onCreate();
  }}
>
  <div class="form-group">
    <Input
      placeholder="Enter name..."
      label="Name"
      autofocus
      value={$formValues.name}
      onChange={(detail) =>
        transactionsModel.handleChange({ name: "name", value: detail })}
    />
  </div>
  <div class="form-group">
    <Input
      placeholder="Enter amount..."
      label="Amount"
      type="text"
      onChange={(detail) => {
        const amount = parseFormattedAmount(detail);
        if (Number.isNaN(amount)) return;

        transactionsModel.handleChange({
          name: "amount",
          value: amount,
        });
      }}
      value={formatAmount($formValues.amount)}
    />
  </div>
  <div class="form-group">
    <InlineSelect
      options={["Expense", "Income"]}
      selected={$formValues.type === "income" ? 1 : 0}
      onSelect={(tab) => onSelect(tab)}
    />
  </div>
  <div class="bottom">
    <Button type="submit">Create</Button>
  </div>
</form>

<style lang="postcss">
  .wrapper {
    display: flex;
    gap: var(--padding-m);
    padding: var(--padding-l);
    flex-direction: column;
    height: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .bottom {
    width: 100%;
    margin-top: auto;

    & :global(button) {
      width: 100%;
    }
  }
</style>
