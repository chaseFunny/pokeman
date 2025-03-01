// 网站配置信息

import { type Metadata } from "next";

export const siteConfig = {
  title: "宝可梦",
  description: "宠物小精灵列表页",
  url: "https://nextjs.org",
  author: "luckySnail",
  blog: "https://luckysnail.cn",
  keywords: ["宝可梦", "宠物小精灵", "儿时回忆"],
  ogImage: "https://nextjs.org/og.png",
  twitterImage: "https://nextjs.org/twitter.png",
  lang: "zh-CN",
};

export const siteDefaultMetaConfig: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest", // 如果有 Web App Manifest 文件
};

/** 导航栏 */

export const navLinks = [
  {
    href: "/pokemon",
    text: "客户端组件",
  },
  {
    href: "/pokemon-ssr",
    text: "客户端组件",
  },
];

/** footer 链接 */
export const socialLinks = [
  {
    href: "https://github.com/chaseFunny",
    text: "GitHub",
  },
  {
    href: "wxPublic", // 微信公众号链接，同上，先占位
    text: "微信公众号",
    isPicture: true,
    icon: null, // 同上
  },
  {
    href: "snailrun160@gmail.com",
    text: "邮箱",
  },

  {
    href: "https://juejin.cn/user/3606868169065389",
    text: "掘金",
  },
  {
    href: "https://x.com/haozhan05554957",
    text: "推特 (X)",
  },
  {
    href: "https://www.zhihu.com/people/axing-zh",
    text: "知乎",
  },

  {
    href: "https://www.xiaohongshu.com/user/profile/5e2d938d000000000100ac82",
    text: "小红书",
    hide: true, // 隐藏
    icon: null, // 小红书图标 lucide-react 中没有，同上
  },
];

export type TypeSocialLink = (typeof socialLinks)[number];
