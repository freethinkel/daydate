import { createEvent, createStore, sample } from "effector";
import { loadDatabaseFx, loadSettingsFx, saveSettingsFx } from "./api";
import type { SettingsEntity } from "./types";

export const $settings = createStore<SettingsEntity>({
  currency: "",
});

export const change = createEvent<Partial<SettingsEntity>>();
export const loadSettings = createEvent();
export const startBackup = createEvent();

sample({
  clock: loadSettings,
  target: loadSettingsFx,
});

sample({
  clock: loadSettingsFx.doneData,
  filter: Boolean,
  target: $settings,
});

sample({
  clock: $settings,
  target: saveSettingsFx,
});

sample({
  clock: startBackup,
  target: loadDatabaseFx,
});

sample({
  clock: change,
  source: $settings,
  fn: (settings, parts) => {
    console.log("settings", settings, parts);
    return {
      ...settings,
      ...parts,
    };
  },
  target: $settings,
});
