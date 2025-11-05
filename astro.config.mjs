// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import favicons from "astro-favicons";
import expressiveCodeTwoSlash from "expressive-code-twoslash";

// https://astro.build/config
export default defineConfig({
  site: 'https://sharathkumbar-tech.github.io/sharath-astro',
  base:'/sharath-astro/',
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
  experimental: {
    clientPrerender: true,
    fonts: [
      {
        name: "Satoshi",
        provider: fontProviders.fontshare(),
        cssVariable: "--font-satoshi",
        weights: [300, 400, 500],
        styles: ["normal"],
      },
    ],
  },
  integrations: [
    expressiveCode({
      themes: ["kanagawa-dragon", "kanagawa-lotus"],
      themeCssSelector: (theme) => {
        if (theme.type === "light") return `[data-theme='light']`;

        return `[data-theme='dark']`;
      },
      useDarkModeMediaQuery: false,
      shiki: { transformers: [transformerColorizedBrackets()] },
      plugins: [expressiveCodeTwoSlash()],
    }),
    mdx(),
    sitemap(),
    favicons({
      themes: ["#1a1a1a", "#e5e5e5"],
      cacheBustingQueryParam: "v3",
      name: "sharath.codes",
      short_name: "JGM",
      icons: {
        favicons: [
          "favicon.svg",
          "favicon-16x16.png",
          "favicon-32x32.png",
          "favicon-48x48.png",
        ],
        appleStartup: false,
        yandex: true,
        windows: true,
        android: [
          "android-chrome-192x192.png",
          {
            name: "android-chrome-512x512.png",
            sizes: [{ width: 512, height: 512 }],
            purpose: "maskable",
            transparent: true,
            rotate: false,
            offset: 13,
          },
        ],
        appleIcon: [
          "apple-touch-icon.png",
          "apple-touch-icon-precomposed.png",
          "safari-pinned-tab.svg",
        ],
      },
    }),
  ],
});
