# 宝可梦

宠物小精灵列表页

## 技术栈
- react
- next.js
- tailwind css
- shadui/cn

## 开发

> 使用 字节的 TRAE 作为 AI 编辑器辅助开发

1） 初始化项目
使用 next.js 官方提供的方式：https://nextjs.org/docs/app/getting-started/installation#automatic-installation
```bash
npx create-next-app@latest
```
然后使用 pnpm 作为包管理工具

2）引入 shadui/cn， 添加 button 组件，验证是否引入成功

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button
```

3）初始化布局和网站元信息

利用 AI 初始化 layout 

4）客户端页面开发

优化：
- 如果 gif 图片没有办法展示，使用 png 作为兜底

5) 服务器端页面开发