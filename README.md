# Kihsa Jewels - Luxury Jewelry E-commerce Website

A modern e-commerce website for a luxury jewelry brand built with Next.js 15 and Tailwind CSS.

## Features

- Responsive design for all devices
- Product catalog with categories (Rings, Necklaces, Bangles, Earrings)
- Product detail pages with image gallery, description, and related products
- Shopping cart functionality
- User-friendly navigation
- Newsletter subscription
- Modern and elegant UI design

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kihsa-jewels.git
cd kihsa-jewels
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

```
kihsa-jewels/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── category/   # Category pages
│   │   ├── product/    # Product pages
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # Reusable components
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Deployment

This project can be deployed on Vercel, Netlify, or any other hosting platform that supports Next.js.

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/) 