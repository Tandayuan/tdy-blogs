import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/tdy-blogs/",

  lang: "zh-CN",
  title: "TDYBlogs",
  description: "vuepress-theme-hope 的博客演示",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
