<script lang="ts">
  import { Input } from "@/shared/components/input";
  import { Button } from "@/shared/components/button";
  import { budgetModel } from "@/model";

  type Props = {
    onCreate: () => void;
  };

  const { onCreate }: Props = $props();

  const formValues = budgetModel.$formValues;
</script>

<form
  class="wrapper"
  onsubmit={() => {
    budgetModel.handleSubmit();
    onCreate();
  }}
>
  <div class="form-group">
    <Input
      placeholder="Enter name..."
      autofocus
      label="Name"
      value={$formValues.name}
      onChange={(detail) =>
        budgetModel.handleChange({ name: "name", value: detail })}
    />
  </div>
  <div class="form-group">
    <Input
      placeholder="Enter amount..."
      label="Amount"
      type="number"
      onChange={(detail) =>
        budgetModel.handleChange({ name: "amount", value: Number(detail) })}
      value={$formValues.amount.toString()}
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
