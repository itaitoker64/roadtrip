"use client";

import { useEffect } from "react";

/**
 * Native-only wiring for the Android build. Renders nothing, and every branch
 * is skipped in a normal browser, so the same bundle still ships to the web.
 */
export function NativeShell() {
  useEffect(() => {
    let disposed = false;
    const teardown: Array<() => void> = [];

    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform() || disposed) return;

      const [{ App }, { StatusBar, Style }] = await Promise.all([
        import("@capacitor/app"),
        import("@capacitor/status-bar"),
      ]);

      // The UI is a light cream (#FAF7F1), so the status bar needs dark icons.
      // The default is light icons, invisible against it.
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: "#FAF7F1" });
      } catch {
        /* some OEM skins reject the background call */
      }

      // Single-route app: without a handler, Android's Back does nothing at all
      // and reads as a hang.
      const handle = await App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) window.history.back();
        else App.exitApp();
      });
      teardown.push(() => void handle.remove());
    })();

    return () => {
      disposed = true;
      teardown.forEach((fn) => fn());
    };
  }, []);

  return null;
}
