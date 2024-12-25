<script lang="ts">
  import { page } from "$app/stores";
  import { Icon } from "../../components/icon";

  const items = [
    {
      text: "Dashboard",
      url: "/dashboard",
      icon: "dashboard",
      color: "var(--color-accent)",
    },
    {
      text: "Transactions",
      url: "/transactions",
      icon: "transactions",
      color: "var(--color-accent)",
    },
    {
      text: "Budget",
      url: "/budget",
      icon: "budget",
      color: "var(--color-blue)",
    },
    {
      text: "Settings",
      url: "/settings",
      icon: "settings",
      color: "var(--color-blue)",
    },
  ];
</script>

<div class="wrapper">
  {#each items as item}
    <a
      type="button"
      class="navbar-button"
      class:active={$page.url.pathname === item.url}
      href={item.url}
      style:--color={item.color}
    >
      <Icon name={item.icon} />
      {item.text}
    </a>
  {/each}
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    height: 100%;
  }
  .navbar-button {
    appearance: none;
    background: none;
    border: none;
    padding: var(--padding-s);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--padding-s);
    flex: 1;
    height: 100%;
    font-size: 0.9rem;
    text-decoration: none;
    color: oklch(from var(--color-text) calc(l - 0.1) c h);
    transition:
      var(--transition) font-size,
      var(--transition) color;
    -webkit-tap-highlight-color: transparent;

    & :global(svg path) {
      transition: var(--transition) fill;
      fill: oklch(from var(--color-text) calc(l - 0.1) c h);
    }

    &.active {
      color: var(--color-accent);
      font-size: 0.95rem;

      & :global(svg path) {
        fill: var(--color-accent);
      }
    }
  }
</style>
