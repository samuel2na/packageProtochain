/**
 * Validation class
 */
export default class Validation {
  success: boolean;
  message: string;

  /**
   * create a new validation object
   * @param success if the validation was successful
   * @param message the validation message, if validation failed
   */
  constructor(success: boolean = true, message: string = "") {
    this.success = success;
    this.message = message;
  }
}