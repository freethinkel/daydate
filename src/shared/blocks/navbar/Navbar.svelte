<script>
  import { page } from "$app/stores";
  import { Icon } from "@/shared/components/icon";
  import { Button } from "../../components/button";
  import { goto } from "$app/navigation";

  const links = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "dashboard",
      color: "var(--color-accent)",
    },
    {
      name: "Transactions",
      url: "/transactions",
      icon: "transactions",
      color: "var(--color-accent)",
    },
    {
      name: "Budget",
      url: "/budget",
      icon: "budget",
      color: "var(--color-blue)",
    },
  ];
</script>

<nav>
  <div class="top" data-tauri-drag-region>
    {#each links as link}
      <a
        href={link.url}
        class:active={$page.url.pathname === link.url}
        style:--color={link.color}
      >
        <Icon name={link.icon} size={18} />

        {link.name}
      </a>
    {/each}
  </div>
  <div class="bottom">
    <Button style="icon" on:click={() => goto("/settings")}>
      <Icon name="settings" />
    </Button>
  </div>
</nav>

<style lang="postcss">
  .top {
    flex: 1;
    min-height: 0;
    padding-top: 26px;
    display: flex;
    flex-direction: column;
    gap: var(--padding-s);
  }
  nav {
    height: 100%;
    padding: var(--padding-m);
    display: flex;
    flex-direction: column;
    gap: var(--padding-s);
    min-width: 150px;

    --navbar-item: 36px;
  }

  a {
    color: var(--color-text);
    text-decoration: none;
    height: var(--navbar-item);
    display: flex;
    align-items: center;
    border-radius: var(--radius);
    padding: 0 var(--padding-m);
    transition: 0.1s;
    gap: var(--padding-m);

    & :global(svg path) {
      fill: var(--color-text);
    }

    &:hover {
      background: var(--color-hover);
    }

    &.active {
      background: oklch(from var(--color) l c h / 0.1);
      font-weight: bold;
      color: var(--color);

      & :global(svg path) {
        fill: var(--color);
      }
    }
  }
</style>
