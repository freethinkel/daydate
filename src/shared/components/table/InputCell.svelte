<script lang="ts">
  interface Props {
    autofocus?: boolean;
    placeholder?: string;
    value?: string;
    align?: "left" | "right";
    width?: string;
    selectAll?: boolean;
    onChange: (value: string) => void;
    onBlur?: () => void;
    onKeydown?: (e: KeyboardEvent) => void;
  }

  let {
    autofocus = false,
    placeholder = "",
    value = "",
    align = "left",
    width = "auto",
    selectAll = false,
    onChange,
    onKeydown,
    onBlur,
  }: Props = $props();

  let ref: HTMLInputElement;

  $effect(() => {
    if (selectAll) {
      ref?.select();
    }
  });

  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    onChange(input.value);
    input.value = value;
  };
</script>

<td style:text-align={align} style:width>
  <!-- svelte-ignore a11y_autofocus -->
  <input
    type="text"
    bind:this={ref}
    {autofocus}
    onblur={onBlur}
    onkeydown={onKeydown}
    oninput={handleChange}
    {placeholder}
    {value}
  />
</td>

<style>
  td {
    box-shadow: inset 0 0 0 1px var(--color-accent);
  }
  input {
    width: 100%;
    outline: none;
    appearance: none;
    border: none;
    background: transparent;
    height: 100%;
    margin: 0;
    padding: 0;
    text-align: inherit;
    color: inherit;
  }
</style>
