# Rootwisdom

> 输入你的心情，从菜根谭里找到一句说给你听的话。

**Live:** https://rootwisdom.online

## Features

- AI-powered mood matching — describe how you feel, get the most fitting quote from Caigen Tan (菜根谭)
- 360 quotes with modern Chinese interpretations
- 7 wallpaper-quality share image templates (Ink Wash, Dark, Mountain, Starfield, Red Wall, Zen, Blue Porcelain)
- Favorites (localStorage)
- Browse the full collection with search by 前集/后集
- PWA — installable on mobile

## Tech Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Azure OpenAI (GPT-4o-mini) for semantic matching
- html2canvas for share image generation
- Deployed on Vercel + Cloudflare

## Getting Started

```bash
npm install
cp .env.local.example .env.local  # add your Azure OpenAI credentials
npm run dev
```

## Environment Variables

```
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-key
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
```
