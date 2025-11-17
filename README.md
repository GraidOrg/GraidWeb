# Graid Web

A minimal Angular application matching the Graid website design.

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Navigate to `http://localhost:4200/`

## Build

```bash
npm run build
```

## Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI globally:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Follow the prompts to link your project or create a new one.

### Option 2: Using GitHub Integration

1. Push your code to a GitHub repository.

2. Go to [vercel.com](https://vercel.com) and sign in.

3. Click "Add New Project" and import your GitHub repository.

4. Vercel will automatically detect Angular and use the `vercel.json` configuration.

5. Click "Deploy" - Vercel will build and deploy your app automatically.

The `vercel.json` file is already configured with:

- Build command: `npm run build`
- Output directory: `dist/graid-web/browser`
- SPA routing support (all routes redirect to index.html)
