<script lang="ts">
  import { onMount } from "svelte";

  type Props = {
    value: string;
    placeholder?: string;
    autofocus?: boolean;
    label?: string;
    type?: "text" | "number";
    onChange?: (value: string) => void;
  };

  let {
    value = "",
    placeholder = "",
    autofocus = false,
    label = "",
    type = "text",
    onChange,
  }: Props = $props();
  let inputRef: HTMLInputElement;
  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange?.(target.value);
    target.value = value;
  };

  onMount(() => {
    if (autofocus) {
      inputRef.focus();
    }
  });
</script>

<label>
  <div class="label">
    {label}
  </div>
  <input {placeholder} {type} {value} oninput={onInput} bind:this={inputRef} />
</label>

<style>
  label {
    width: 100%;
    font-size: 0.9rem;
    font-weight: 600;
  }
  input {
    width: 100%;
    appearance: none;
    border-radius: var(--radius);
    border: 1px solid var(--color-separator);
    background: var(--color-panel);
    color: var(--color-title);
    outline: none;
    height: 32px;
    padding: 0 var(--padding-m);
    padding: 0 var(--padding-m);
    &:focus-visible {
      border-color: var(--color-accent);
    }
  }
</style>
