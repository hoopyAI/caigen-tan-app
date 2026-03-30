# Rootwisdom

> 输入你的心情，从菜根谭里找到一句说给你听的话。

**在线体验：** https://rootwisdom.online

## 功能

- **AI 心情匹配** — 描述你的心情，AI 从菜根谭中找到最契合的一句
- **360 条语录** — 菜根谭全文，每条附有白话释义
- **7 套分享图模板** — 水墨、深夜、远山、星河、红墙、枯山水、青花，壁纸级设计
- **收藏夹** — 保存喜欢的句子
- **全文浏览** — 按前集/后集分类浏览
- **PWA** — 可安装到手机主屏幕

## 技术栈

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Azure OpenAI (GPT-4o-mini) 语义匹配
- html2canvas 分享图生成
- Vercel 部署 + Cloudflare CDN

## 本地开发

```bash
npm install
cp .env.local.example .env.local  # 填入 Azure OpenAI 配置
npm run dev
```

## 环境变量

```
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-key
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
```
