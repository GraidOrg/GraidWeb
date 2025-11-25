# Graid Web

A professional Angular application for Graid - Vision and Voice AI Tutor that Reports Student Needs to Professors.

## Features

- 🎨 Modern, responsive UI with Angular Material
- ♿ Full accessibility support (ARIA labels, semantic HTML)
- 🔒 Type-safe code with TypeScript interfaces
- 🌍 Environment-based configuration
- 📧 Contact form integration with EmailJS
- 🚀 Optimized for production builds
- 📱 Mobile-first responsive design

## Project Structure

```
src/
├── app/
│   ├── shared/
│   │   ├── constants/       # Application constants
│   │   ├── interfaces/     # TypeScript interfaces
│   │   ├── services/        # Shared services
│   │   └── utils/           # Utility functions
│   ├── contact/             # Contact form component
│   ├── home/                # Home page component
│   ├── app.component.*     # Root component
│   └── app.routes.ts       # Route configuration
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── styles.scss             # Global styles
```

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Navigate to `http://localhost:4200/`

The app will automatically reload if you change any of the source files.

## Build

### Development Build

```bash
npm run build
```

### Production Build

```bash
npm run build -- --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Environment Configuration

### Development

Edit `src/environments/environment.ts` to configure development settings.

### Production

For production, set environment variables in your deployment platform:

- `NG_APP_EMAILJS_SERVICE_ID` - EmailJS Service ID
- `NG_APP_EMAILJS_TEMPLATE_ID` - EmailJS Template ID
- `NG_APP_EMAILJS_PUBLIC_KEY` - EmailJS Public Key

Or edit `src/environments/environment.prod.ts` directly (not recommended for sensitive data).

### EmailJS Setup

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Public Key from the Integration page
5. Update environment files with your credentials

## Code Quality

This project follows Angular best practices:

- ✅ Standalone components
- ✅ Type-safe interfaces
- ✅ Proper lifecycle management
- ✅ Error handling
- ✅ Accessibility (WCAG compliant)
- ✅ SEO optimization
- ✅ Consistent code formatting (EditorConfig)

## Testing

```bash
npm test
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

4. Configure environment variables in Vercel dashboard:

   - `NG_APP_EMAILJS_SERVICE_ID`
   - `NG_APP_EMAILJS_TEMPLATE_ID`
   - `NG_APP_EMAILJS_PUBLIC_KEY`

5. Vercel will automatically detect Angular and use the `vercel.json` configuration.

6. Click "Deploy" - Vercel will build and deploy your app automatically.

The `vercel.json` file is already configured with:

- Build command: `npm run build -- --configuration production`
- Output directory: `dist/graid-web/browser`
- SPA routing support (all routes redirect to index.html)

## Technologies Used

- **Angular 17** - Modern Angular framework
- **Angular Material** - UI component library
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Enhanced CSS
- **EmailJS** - Email service integration
- **RxJS** - Reactive programming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved
