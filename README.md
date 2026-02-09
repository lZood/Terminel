# Grupo Terminel - Ecosistema Digital

Modern agricultural web ecosystem for Grupo Terminel, a 55-year-old agribusiness leader in Guasave, Sinaloa.

## 🚀 Features

- **Modern Design**: Terminel green (#175641) and harvest gold branding with glassmorphism effects
- **Mobile-First**: Optimized for producers accessing from the field
- **Real-Time Data**: Weather, dam levels, and Chicago Board maize prices
- **Producer Portal**: Scale tickets, settlements, document validation (coming soon)
- **Multilingual**: Spanish (primary)
- **Certifications**: GPTW, ISO 22000:2018, ESR showcased prominently

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (ready for integration)
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📦 Running Locally

```bash
# Install dependencies
npm install

# Create .env.local from template
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 🌐 Pages

- `/` - Homepage with dynamic widgets
- `/nosotros` - About Us with timeline & leadership
- `/servicios` - Services overview
- `/tecnologia` - Technology & partnerships
- `/noticias` - Latest news
- `/portal` - Producer portal (requires authentication)

## 🔑 Environment Variables

See `.env.example` for required environment variables including:
- Supabase credentials
- External API keys (weather, commodities, dam levels)
- Internal system APIs (accounting, scale software)

## 📄 License

Proprietary - Grupo Terminel 2026
