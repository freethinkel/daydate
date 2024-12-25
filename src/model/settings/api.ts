import { createEffect } from "effector";
import type { SettingsEntity } from "./types";
import { path } from "@tauri-apps/api";
import { save } from "@tauri-apps/plugin-dialog";
import { readFile, writeFile } from "@tauri-apps/plugin-fs";

export const loadSettingsFx = createEffect(
  async (): Promise<SettingsEntity | null> => {
    try {
      return JSON.parse(localStorage.getItem("settings") ?? "");
    } catch (err) {
      console.log("LOAD SETTINGS ERR", err);
      return null;
    }
  }
);

export const saveSettingsFx = createEffect((settings: SettingsEntity) => {
  localStorage.setItem("settings", JSON.stringify(settings));
});

export const loadDatabaseFx = createEffect(async () => {
  try {
    const dir = await path.appDataDir();
    const dbDirt = await path.join(dir, "database.db");
    const file = await readFile(dbDirt);
    const savePath = await save({
      title: "Backup",
      filters: [
        {
          name: "Backup",
          extensions: ["db", "sqlite"],
        },
      ],
    });

    if (savePath) {
      writeFile(savePath, file);
    }
  } catch (err) {
    console.log(err);
  }
});
