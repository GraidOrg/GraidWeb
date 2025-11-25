# EmailJS Setup Guide

This guide will help you configure EmailJS for the Graid contact form.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Create a free account (you can use Google, GitHub, or email)

## Step 2: Create an Email Service

1. After logging in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Yahoo**
   - Or any other supported provider
4. Follow the provider-specific setup instructions
5. Once connected, you'll see your **Service ID** (e.g., `service_abc123`)
   - **Copy this value** - this is your `serviceId`

## Step 3: Create an Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Choose a template name (e.g., "Contact Form" or "Demo Request")
4. Configure the template:

   **Template Settings:**

   - **To Email**: Enter `ceo@graid.org` (or your desired recipient)
   - **From Name**: `{{form_type}}` (or a static name)
   - **From Email**: `{{from_email}}`
   - **Reply To**: `{{from_email}}`
   - **Subject**: `{{subject}}`

   **Email Content:**

   You can use plain text:

   ```
   Form Type: {{form_type}}

   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```

   **OR use HTML templates** (recommended for better formatting):

   See `EMAILJS_TEMPLATE.html` for a professional HTML template, or `EMAILJS_TEMPLATE_SIMPLE.html` for a simpler version.

   **Available Template Variables:**

   - `{{form_type}}` - "Schedule a Demo" or "Contact Us"
   - `{{from_name}}` - User's name
   - `{{from_email}}` - User's email address
   - `{{subject}}` - Email subject line
   - `{{message}}` - Formatted message (includes all form details)

   **Note:** The `{{message}}` field already contains all the formatted details:

   - For Demo forms: Name, Email, Institution, Role, Preferred Date/Time, Message
   - For Contact forms: The user's message

5. Click **"Save"**
6. You'll see your **Template ID** (e.g., `template_xyz789`)
   - **Copy this value** - this is your `templateId`

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the left sidebar
2. Scroll down to **"API Keys"** section
3. You'll see your **Public Key** (e.g., `AbCdEfGhIjKlMnOpQrStUvWxYz`)
   - **Copy this value** - this is your `publicKey`

## Step 5: Update Your Environment Files

### For Development (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: "service_abc123", // Your Service ID from Step 2
    templateId: "template_xyz789", // Your Template ID from Step 3
    publicKey: "AbCdEfGhIjKlMnOpQrSt", // Your Public Key from Step 4
  },
  contactEmail: "ceo@graid.org",
  appName: "Graid",
  appDescription:
    "Vision and Voice AI Tutor that Reports Student Needs to Professors",
};
```

### For Production (`src/environments/environment.prod.ts`):

**Option 1: Using Environment Variables (Recommended)**

Set these in your deployment platform (Vercel, Netlify, etc.):

- `NG_APP_EMAILJS_SERVICE_ID`
- `NG_APP_EMAILJS_TEMPLATE_ID`
- `NG_APP_EMAILJS_PUBLIC_KEY`

The production file will automatically use these:

```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: process.env["NG_APP_EMAILJS_SERVICE_ID"] || "YOUR_SERVICE_ID",
    templateId: process.env["NG_APP_EMAILJS_TEMPLATE_ID"] || "YOUR_TEMPLATE_ID",
    publicKey: process.env["NG_APP_EMAILJS_PUBLIC_KEY"] || "YOUR_PUBLIC_KEY",
  },
  // ...
};
```

**Option 2: Direct Values (Not Recommended for Sensitive Data)**

```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: "service_abc123",
    templateId: "template_xyz789",
    publicKey: "AbCdEfGhIjKlMnOpQrSt",
  },
  // ...
};
```

## Step 6: Test Your Configuration

1. Start your development server:

   ```bash
   npm start
   ```

2. Navigate to the contact form: `http://localhost:4200/contact`

3. Fill out and submit the form

4. Check your email inbox (the one configured in EmailJS)

5. Check the browser console for any errors

## Troubleshooting

### Common Issues:

1. **"Invalid service ID"**

   - Verify your Service ID is correct
   - Make sure the service is active in EmailJS dashboard

2. **"Invalid template ID"**

   - Verify your Template ID is correct
   - Make sure the template is published (not draft)

3. **"Invalid public key"**

   - Verify your Public Key is correct
   - Make sure you're using the Public Key, not the Private Key

4. **Emails not sending**

   - Check EmailJS dashboard → "Logs" for error messages
   - Verify your email service is properly connected
   - Check spam folder

5. **CORS errors**
   - Make sure you're using the Public Key (not Private Key)
   - Check EmailJS dashboard for any restrictions

## EmailJS Free Tier Limits

- **200 emails/month** (free tier)
- Upgrade to paid plans for more emails
- Check your usage in the EmailJS dashboard

## Security Notes

⚠️ **Important:**

- Never commit your actual credentials to version control
- Use environment variables for production
- The Public Key is safe to expose in client-side code
- Keep your Private Key secret (not used in this project)

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React/Angular Guide](https://www.emailjs.com/docs/examples/reactjs/)
- [EmailJS Support](https://www.emailjs.com/support/)
