"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

import { ipcMain } from "electron";
import fs from "fs";
import path from "path";
import { dialog } from "electron";

let win: BrowserWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 992,
    height: 985,
    minWidth: 992,
    minHeight: 985,
    maxWidth: 992,
    maxHeight: 985,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#495057",
      symbolColor: "#74b1be",
    },
    icon: __dirname + "public/icon.ico",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Vue Devtools failed to install:", e.toString());
      } else {
        console.error(e);
      }
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function onError(error: any) {
  if (error) {
    dialog.showMessageBox(win, {
      type: "error",
      title: "File Rename Error",
      message: JSON.stringify({
        message: error.message,
        stack: error.stack,
      }),
    });
    return error;
  }
}

ipcMain.handle("rename-video", async (event, { data }) => {
  const { videoFile, subtitleFile } = data;

  const videoFilePathParsed = path.parse(videoFile.path);
  const subtitleFilePathParsed = path.parse(subtitleFile.path);
  fs.rename(
    subtitleFile.path,
    `${subtitleFilePathParsed.dir}\\${videoFilePathParsed.name}${subtitleFilePathParsed.ext}`,
    onError
  );
});

ipcMain.handle("rename-subtitle", async (event, { data }) => {
  const { videoFile, subtitleFile } = data;

  const videoFilePathParsed = path.parse(videoFile.path);
  const subtitleFilePathParsed = path.parse(subtitleFile.path);
  fs.rename(
    subtitleFile.path,
    `${subtitleFilePathParsed.dir}\\${videoFilePathParsed.name}${subtitleFilePathParsed.ext}`,
    onError
  );
});

ipcMain.handle("rename-custom", async (event, { data }) => {
  const { videoFile, subtitleFile, customData } = data;

  const videoFilePathParsed = path.parse(videoFile.path);
  const subtitleFilePathParsed = path.parse(subtitleFile.path);
  const { customNameInput, customEpisodeInput } = customData;
  fs.rename(
    subtitleFile.path,
    `${subtitleFilePathParsed.dir}\\${customNameInput}_${customEpisodeInput}${subtitleFilePathParsed.ext}`,
    onError
  );
  fs.rename(
    videoFile.path,
    `${videoFilePathParsed.dir}\\${customNameInput}_${customEpisodeInput}${videoFilePathParsed.ext}`,
    onError
  );
});
