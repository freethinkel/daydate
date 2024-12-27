<script lang="ts">
  import { MobileNavbar } from "@/shared/blocks/mobile-navbar";
  import { Navbar } from "@/shared/blocks/navbar";
  import { Resizable } from "@/shared/components/resizable";
  import { onMount } from "svelte";
  import { budgetModel, settingsModel, transactionsModel } from "@/model";
  import { accentColor } from "tauri-plugin-accent-color";
  import { migrate } from "@/model/db/migrate";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  onMount(async () => {
    await migrate();

    transactionsModel.loadTransactions();
    budgetModel.loadBudget();
    settingsModel.loadSettings();

    accentColor.subscribe((color) => {
      document.documentElement.style.setProperty("--color-accent", color);
    });
  });
</script>

<div class="wrapper">
  <div class="sidebar">
    <Resizable id="app-sidebar">
      <Navbar />
    </Resizable>
  </div>

  <div class="content">
    {@render children?.()}
  </div>
  <div class="mobile-navbar">
    <MobileNavbar />
  </div>
</div>

<style>
  :global(body) {
    overflow: hidden;
    height: 100vh;
  }
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  .sidebar {
    background: var(--color-panel);
    height: 100%;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .content {
    flex: 1;
  }
  .mobile-navbar {
    display: none;

    @media screen and (max-width: 768px) {
      background: var(--color-panel);
      height: 60px;
      display: block;
    }
  }
</style>
