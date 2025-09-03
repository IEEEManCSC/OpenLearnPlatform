export default abstract class BaseError<Details> extends Error {
  name: string;
  private statusCode: number;
  private details?: Details;
  private hint?: string;
  private stackTrace?: string;

  constructor(
    message: string,
    statusCode: number,
    details?: Details,
    hint?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.hint = hint;
    this.stackTrace = this.setStackTrace();
  }

  getStatusCode() {
    return this.statusCode;
  }

  setStackTrace(): string {
    if (this.stack) return this.stack;
    const stack = new Error("Debugging Error").stack;
    return stack ? stack.split("\n").slice(2).join("\n") : "";
  }

  getStackTrace() {
    return this.stackTrace;
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      hint: this.hint,
    };
  }
}
