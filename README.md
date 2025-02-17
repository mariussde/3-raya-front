# 3 Raya Frontend

A modern web application built with Next.js for playing the classic Tic-tac-toe (3 Raya) game. This frontend application provides an intuitive user interface and seamless gaming experience.

## 🚀 Features

- Modern and responsive user interface
- Real-time game state management
- Built with Next.js and TypeScript
- Styled with TailwindCSS
- Fully accessible components
- API integration ready

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/3-raya-front.git
cd 3-raya-front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create your environment file:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## 🧪 Linting

To run the linter:

```bash
npm run lint
# or
yarn lint
```

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [clsx](https://github.com/lukeed/clsx) - Utility for constructing className strings
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes without style conflicts

## 📁 Project Structure

```
3-raya-front/
├── src/               # Source files
├── public/           # Static files
├── .next/            # Next.js build output
├── node_modules/     # Dependencies
├── .env.example      # Example environment variables
├── .env.local        # Local environment variables
├── .gitignore        # Git ignore rules
├── next.config.ts    # Next.js configuration
├── package.json      # Project metadata and dependencies
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Marius Lefter
