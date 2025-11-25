/**
 * Form utility functions
 */
export class FormUtils {
  /**
   * Checks if a form field is invalid and has been touched or dirty
   */
  static isFieldInvalid(
    field: any,
    touched: boolean = false,
    dirty: boolean = false
  ): boolean {
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Gets error message for a form field
   */
  static getErrorMessage(
    field: any,
    fieldName: string,
    customMessages?: Record<string, string>
  ): string {
    if (!field) {
      return '';
    }

    if (field.hasError('required')) {
      return customMessages?.['required'] || `${fieldName} is required`;
    }

    if (field.hasError('email')) {
      return customMessages?.['email'] || 'Please enter a valid email address';
    }

    if (field.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength']?.requiredLength;
      return (
        customMessages?.['minlength'] ||
        `Minimum length is ${requiredLength} characters`
      );
    }

    if (field.hasError('maxlength')) {
      const requiredLength = field.errors?.['maxlength']?.requiredLength;
      return (
        customMessages?.['maxlength'] ||
        `Maximum length is ${requiredLength} characters`
      );
    }

    return '';
  }
}

