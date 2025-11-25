# EmailJS Template Fields Reference

## Available Template Variables

When creating your EmailJS template, you can use these variables:

### Required Fields (Always Available)

| Variable         | Description                            | Example Value                                  |
| ---------------- | -------------------------------------- | ---------------------------------------------- |
| `{{form_type}}`  | Type of form submission                | "Schedule a Demo" or "Contact Us"              |
| `{{from_name}}`  | Name of the person submitting the form | "John Doe"                                     |
| `{{from_email}}` | Email address of the submitter         | "john@example.com"                             |
| `{{subject}}`    | Email subject line                     | "Demo Request from John Doe" or user's subject |
| `{{message}}`    | Formatted message with all details     | See below                                      |

### Message Field Contents

The `{{message}}` field contains formatted text with all form details:

**For Demo Forms:**

```
Demo Request Details:
- Name: John Doe
- Email: john@example.com
- Institution: University Name
- Role: Professor
- Preferred Date: 2024-01-15
- Preferred Time: 14:00
- Additional Message: I'm interested in learning more...
```

**For Contact Forms:**

```
[User's message content]
```

## Template Settings in EmailJS Dashboard

When setting up your template in EmailJS, configure these fields:

| Field          | Value            | Notes                                     |
| -------------- | ---------------- | ----------------------------------------- |
| **To Email**   | `ceo@graid.org`  | Your recipient email                      |
| **From Name**  | `{{form_type}}`  | Or use a static name like "Graid Website" |
| **From Email** | `{{from_email}}` | The submitter's email                     |
| **Reply To**   | `{{from_email}}` | So you can reply directly                 |
| **Subject**    | `{{subject}}`    | Dynamic subject line                      |

## HTML Template Examples

### Minimal Template

```html
<h2>{{form_type}}</h2>
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<hr />
<div style="white-space: pre-wrap;">{{message}}</div>
```

### Complete Template

See `EMAILJS_TEMPLATE.html` for a full-featured HTML template with styling.

### Simple Template

See `EMAILJS_TEMPLATE_SIMPLE.html` for a clean, simple HTML template.

## Quick Copy-Paste Template

Copy this into your EmailJS template editor:

```html
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color: #002e5d;">{{form_type}}</h2>

  <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0;">
    <p><strong>Name:</strong> {{from_name}}</p>
    <p>
      <strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a>
    </p>
    <p><strong>Subject:</strong> {{subject}}</p>
  </div>

  <div
    style="border-left: 4px solid #002e5d; padding-left: 15px; margin: 15px 0;"
  >
    <h3>Message:</h3>
    <div style="white-space: pre-wrap; line-height: 1.6;">{{message}}</div>
  </div>

  <p style="color: #666; font-size: 12px; margin-top: 20px;">
    This email was sent from the Graid website contact form.
  </p>
</div>
```

## Testing Your Template

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox
4. Verify all fields display correctly
5. Test both "Demo" and "Contact" form types
