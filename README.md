# PawCircle Membership

PawCircle Membership is a React application originally built as a membership platform for pet owners and pet service providers. The project is now maintained as an interactive portfolio demo that showcases the product design, frontend architecture, and development work behind the original application.

> **Portfolio Demo:** The live version uses fictional profiles and does not support active memberships, messaging, bookings, or payments.

## Live Project

- **Interactive Demo:** https://pawcirclemembership.com/demo
- **Case Study:** https://pawcirclemembership.com/case-study

## What the Demo Demonstrates

- Role-based experiences for pet owners, service providers, and combined accounts
- Provider discovery and profile browsing
- Service-area and availability information
- Interactive role switching using URL query parameters
- Portfolio-safe demo behavior with retired private routes redirected to the demo
- Responsive navigation and accessible interface improvements
- Optimized image delivery for faster page performance
- Automated testing with Vitest and React Testing Library
- Continuous integration with GitHub Actions

## Tech Stack

- React 19
- Vite
- JavaScript
- React Router
- Supabase
- CSS
- Vitest
- React Testing Library
- ESLint
- GitHub Actions
- Vercel

## Testing, Accessibility, and Performance

### Automated Testing

PawCircle includes automated tests built with Vitest and React Testing Library.

Current coverage includes:
- Demo role selection behavior
- Provider-role initialization from URL query parameters
- Retired private-route redirects to the interactive demo

All current automated tests pass successfully.

### Accessibility

Accessibility improvements include:
- Descriptive navigation labels
- Improved heading structure
- Better text contrast
- Accessible role-selection controls
- Improved interactive element semantics

The production demo achieved a Lighthouse Accessibility score of 100.

### Performance

Performance work focused on image delivery and preserving visual quality while reducing unnecessary asset weight.

Measured Lighthouse results on the production `/demo` page:
- Performance improved from 89 to 100
- Estimated image-delivery savings reduced from approximately 628 KiB to 37 KiB
- First Contentful Paint: 0.5 s
- Largest Contentful Paint: 0.6 s
- Total Blocking Time: 0 ms

## Continuous Integration

PawCircle uses GitHub Actions to automatically verify code quality on pull requests and pushes to `main`.

The CI workflow runs on Node.js 24 and checks:

- ESLint
- Vitest automated tests
- Production build

This helps catch lint errors, test failures, and build problems before changes are merged.

## Local Development

### Requirements

- Node.js 24
- npm

### Setup

Clone the repository and install dependencies:

```bash
npm ci
```

Create a local `.env.local` file in the project root. This file is ignored by Git and should not be committed:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

Run the quality checks locally:

```bash
npm run lint
npm test -- --run
npm run build
```