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
- 阅读示例网站和接口文档，梳理需求
- 设置接口 baseUrl : https://pokeapi.co/api/v2。它会返回获取精灵详情的接口，需要使用 promise.all 来同步获取数据
- 获取精灵列表：/pokemon?limit=xx&offset=xx
- 获取类型列表：/type${key} (key 为类型 id)，如果没有 key，则获取所有类型列表
- 如果一个类型，就计算得到这个类型下的所有精灵 id 列表，如果多个，就计算出它们共同的 id列表
- 根据 id 列表，使用 promise.all 调用 /pokemon/${id} 来获取精灵详情，并渲染到页面上，这里也需要进行分页

优化：
- 如果 gif 图片没有办法展示，使用 png 作为兜底

1) 服务器端页面开发
- 创建 actions ，来获取数据
- 通过路由记录 page 和 type，交互通过路由更新参数来更新数据
