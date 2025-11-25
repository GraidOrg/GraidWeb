/**
 * Application-wide constants
 */
export const APP_CONSTANTS = {
  ROUTES: {
    HOME: '',
    CONTACT: 'contact',
  },
  QUERY_PARAMS: {
    DEMO: 'demo',
    CONTACT: 'contact',
  },
  FORM_TYPES: {
    DEMO: 'demo' as const,
    CONTACT: 'contact' as const,
  },
  CONTACT: {
    EMAIL: 'ceo@graid.org',
  },
  MESSAGES: {
    FORM_SUBMIT_SUCCESS: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
    FORM_SUBMIT_ERROR: 'Sorry, there was an error sending your message. Please try again later.',
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
  },
  TIMEOUTS: {
    SUCCESS_MESSAGE_DISPLAY: 5000,
  },
} as const;

