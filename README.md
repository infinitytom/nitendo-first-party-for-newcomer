# 任天堂第一方入坑指南

面向中文玩家的静态网站：介绍任天堂第一方游戏系列、入坑顺序、正版购买方式，以及用模拟器/重编译游玩自己导出的游戏的方法。

纯 HTML + CSS + JS，无需构建，可直接部署到 GitHub Pages。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个公开仓库（例如 `nintendo-guide`）。
2. 在本文件夹中执行：
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/nintendo-guide.git
   git push -u origin main
   ```
3. 打开仓库 **Settings → Pages**，Source 选 **Deploy from a branch**，分支选 `main`、目录选 `/ (root)`，保存。
4. 一两分钟后访问 `https://<你的用户名>.github.io/nintendo-guide/`。

## 修改内容

- **系列介绍与入坑顺序**：全部在 `assets/data.js`，按现有格式增删即可。
- **购买指南 / 模拟器页面**：直接编辑 `buy.html`、`play.html`。
- **配图**：默认使用原创的渐变封面。想换成自己的截图，把图片命名为 `images/<系列 id>.jpg`（如 `images/zelda.jpg`、`images/mario.jpg`，id 见 `data.js`），页面会自动显示在卡片封面和系列页中。建议 16:10、宽 1200px 左右。请使用你有权使用的图片（例如自己在主机上截的图）。

## 声明

非官方玩家自制指南，与任天堂无关。本站不提供任何 ROM、密钥或破解文件。
