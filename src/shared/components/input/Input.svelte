<script lang="ts">
  import { onMount } from "svelte";

  // import { createEventDispatcher, onMount } from 'svelte';
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
  // export let value = '';
  // export let placeholder = '';
  // export let type: 'text' | 'number' = 'text';
  // export let label = '';
  // export let autofocus = false;
  // export let autofocus = false;
  // let inputRef: HTMLInputElement;
  // let inputRef: HTMLInputElement;
  // const dispatch = createEventDispatcher();
  // const dispatch = createEventDispatcher();
  let inputRef: HTMLInputElement;
  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    onChange?.(target.value);
    // dispatch("change", target.value);
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
