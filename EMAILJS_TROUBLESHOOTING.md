# EmailJS 400 Bad Request Troubleshooting Guide

## Common Causes of 400 Bad Request

A 400 Bad Request error from EmailJS typically means one of the following:

### 1. Template Variables Mismatch

**Problem:** The variables in your EmailJS template don't match what you're sending.

**Solution:**
- Check your EmailJS template in the dashboard
- Ensure all template variables use double curly braces: `{{variable_name}}`
- Verify the variable names match exactly (case-sensitive)

**Required Variables in Your Template:**
- `{{form_type}}`
- `{{from_name}}`
- `{{from_email}}`
- `{{subject}}`
- `{{message}}`

**Note:** `{{to_email}}` is NOT sent as a parameter - it should be set in the EmailJS template settings.

### 2. Invalid Service ID or Template ID

**Problem:** The Service ID or Template ID is incorrect or doesn't exist.

**Solution:**
1. Go to EmailJS Dashboard → Email Services
2. Copy the exact Service ID (starts with `service_`)
3. Go to EmailJS Dashboard → Email Templates
4. Copy the exact Template ID (starts with `template_`)
5. Update `src/environments/environment.ts` with the correct values

### 3. Invalid Public Key

**Problem:** The Public Key is incorrect or expired.

**Solution:**
1. Go to EmailJS Dashboard → Account → General
2. Scroll to "API Keys" section
3. Copy the Public Key (long alphanumeric string)
4. Update `src/environments/environment.ts` with the correct value

### 4. Template Not Published

**Problem:** Your template is saved as a draft, not published.

**Solution:**
1. Go to EmailJS Dashboard → Email Templates
2. Click on your template
3. Make sure it's published (not in draft mode)
4. Click "Save" if you made any changes

### 5. Email Service Not Connected

**Problem:** Your email service (Gmail, Outlook, etc.) is not properly connected.

**Solution:**
1. Go to EmailJS Dashboard → Email Services
2. Check if your service shows as "Connected"
3. If not, reconnect your email service
4. Follow the provider-specific setup instructions

### 6. Missing Required Template Variables

**Problem:** Your template references variables that aren't being sent.

**Solution:**
- Remove any unused variables from your template
- Or add them to the `emailParams` object in `contact.component.ts`

## Debugging Steps

### Step 1: Check Browser Console

Open your browser's developer console (F12) and look for:
- Error messages with status codes
- Logged email parameters
- Any CORS errors

### Step 2: Verify Configuration

Check `src/environments/environment.ts`:

```typescript
emailjs: {
  serviceId: "service_YOUR_ID",      // Should start with "service_"
  templateId: "template_YOUR_ID",   // Should start with "template_"
  publicKey: "YOUR_PUBLIC_KEY",     // Long alphanumeric string
}
```

### Step 3: Test EmailJS Template

1. Go to EmailJS Dashboard → Email Templates
2. Click "Test" button on your template
3. Fill in test values
4. Send a test email
5. If test fails, the issue is with your template configuration

### Step 4: Check EmailJS Logs

1. Go to EmailJS Dashboard → Logs
2. Look for recent failed attempts
3. Check error messages for specific issues

### Step 5: Verify Template Settings

In your EmailJS template, check:

**Template Settings:**
- **To Email:** `ceo@graid.org` (or your recipient)
- **From Name:** `{{form_type}}` or static value
- **From Email:** `{{from_email}}`
- **Reply To:** `{{from_email}}`
- **Subject:** `{{subject}}`

**Template Content:**
Make sure you're using the exact variable names:
- `{{form_type}}` (not `{{formType}}` or `{{form_type}}`)
- `{{from_name}}` (not `{{fromName}}`)
- `{{from_email}}` (not `{{fromEmail}}`)
- `{{subject}}`
- `{{message}}`

## Quick Fix Checklist

- [ ] Service ID starts with `service_` and is correct
- [ ] Template ID starts with `template_` and is correct
- [ ] Public Key is correct (from Account → General → API Keys)
- [ ] Template is published (not draft)
- [ ] Email service is connected
- [ ] Template variables match exactly (case-sensitive)
- [ ] All required template variables are present
- [ ] No extra spaces in variable names: `{{variable}}` not `{{ variable }}`

## Still Having Issues?

1. **Check EmailJS Status:** Visit [status.emailjs.com](https://status.emailjs.com)
2. **EmailJS Documentation:** [docs.emailjs.com](https://www.emailjs.com/docs/)
3. **EmailJS Support:** [support.emailjs.com](https://www.emailjs.com/support/)

## Example Working Template

```html
<h2>{{form_type}}</h2>
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<div style="white-space: pre-wrap;">{{message}}</div>
```

Make sure your template uses these exact variable names!

