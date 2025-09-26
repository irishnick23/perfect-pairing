# Perfect Pairing

Transform how people choose drinks for their meals by providing AI-powered, personalized beverage recommendations that consider the full context of their dining experience.

## Vision

Perfect Pairing is an AI-powered web application that acts as your personal sommelier and mixologist. Users describe what they're serving, and the app provides specific, actionable drink recommendations with detailed recipes and shopping guidance.

## Features

### Core Functionality
- **Intelligent Food Analysis**: Input meal details and let AI understand flavor profiles
- **Personalized Recommendations**: Get cocktails, wines, and beer suggestions tailored to your meal
- **Contextual Intelligence**: Considers weather, guest count, budget, and dietary restrictions
- **Interactive Refinement**: Conversational interface for adjusting recommendations
- **Recipe & Shopping Guidance**: Complete cocktail recipes and wine purchasing advice

### Target Users
- **Casual Entertainers**: Host dinner parties and want to impress guests
- **Food Enthusiasts**: Care about complete dining experiences and want to expand horizons

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript 5.6+ and App Router
- **Database**: Supabase with PostgreSQL and Row Level Security
- **AI**: OpenAI API (GPT-4o) for intelligent pairing recommendations
- **Styling**: Tailwind CSS 4.0 with custom components and Geist font
- **Authentication**: Supabase Auth with secure session management

## Design Philosophy

- **Mobile-first responsive design** that works perfectly on both mobile and desktop
- **Clean aesthetic**: White backgrounds, subtle gray borders, black primary colors
- **Typography**: Geist font at 98% letter-spacing for optimal readability
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader optimized
- **Smooth interactions**: Gradient buttons, rounded corners, micro-animations

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Supabase account for database
- OpenAI API key for AI recommendations

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd perfect-pairing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your Supabase and OpenAI credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/         # Reusable UI components
├── lib/               # Utilities and configurations
├── types/             # TypeScript type definitions
└── styles/            # Global styles and Tailwind config
```

### Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is private and proprietary.

---

Built with ❤️ for better dining experiences
