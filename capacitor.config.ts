import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.itaitoker.roadtrip",
  appName: "מסע 2026",

  // `next build` with output:"export" writes here.
  webDir: "out",

  server: {
    // https://localhost gives the WebView a stable secure origin, so anything
    // cached locally survives app restarts and app updates.
    androidScheme: "https",
  },

  android: {
    backgroundColor: "#FAF7F1",
  },
};

export default config;
