<script lang="ts">
  import Cell from "./Cell.svelte";
  import InputCell from "./InputCell.svelte";

  interface Props {
    pale?: boolean;
    colspan?: number | undefined;
    align?: "left" | "right";
    value?: string;
    presentValue?: string | undefined;
    width?: string;
    selectAll?: boolean;
    isEditing?: boolean;
    onChange: (value: string) => void;
    onFocusPrev: () => void;
    onFocusNext: () => void;
  }

  let {
    pale = false,
    colspan = undefined,
    align = "left",
    value = "",
    presentValue = undefined,
    width = "auto",
    selectAll = false,
    isEditing = $bindable(false),
    onChange,
    onFocusNext,
    onFocusPrev,
  }: Props = $props();
  let inputValue = $state(value);

  $effect(() => {
    inputValue = value;
  });

  const onDone = () => {
    isEditing = false;
    onChange(inputValue);
  };
</script>

{#if !isEditing}
  <Cell {align} {pale} {colspan} onDbClick={() => (isEditing = true)} {width}>
    {presentValue ?? value}
  </Cell>
{:else}
  <InputCell
    {align}
    {width}
    {selectAll}
    autofocus
    value={inputValue}
    onBlur={onDone}
    onKeydown={({ key, shiftKey }) => {
      switch (key) {
        case "Enter":
          onDone();
          break;
        case "Escape":
          isEditing = false;
          break;
        case "Tab":
          setTimeout(() => {
            if (shiftKey) {
              onFocusPrev();
            } else {
              onFocusNext();
            }
          });
          break;
      }
    }}
    onChange={(value) => (inputValue = value)}
  />
{/if}
