<script lang="ts">
  import { settingsModel } from "@/model";
  import type { SettingsEntity } from "@/model/settings/types";
  import { PageWrapper } from "@/shared/blocks/page-wrapper";
  import { Button } from "@/shared/components/button";
  import { Input } from "@/shared/components/input";

  const settings = settingsModel.$settings;

  const currency = $derived($settings.currency);
  const change = <K extends keyof SettingsEntity = keyof SettingsEntity>(
    field: K,
    value: SettingsEntity[K]
  ) => settingsModel.change({ [field]: value });

  $inspect($settings);
</script>

<PageWrapper>
  <div class="form">
    <Input
      value={currency}
      label="Currency"
      placeholder="Enter currency"
      onChange={(value) => change("currency", value)}
    />
    <Button onClick={() => settingsModel.startBackup()}>Backup</Button>
  </div>
</PageWrapper>

<style>
  .form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
  }
</style>
