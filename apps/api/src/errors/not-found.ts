import BaseError from "./base.js";

export class NotFoundError extends BaseError<undefined> {
  constructor(hint?: string) {
    super(
      "Not Found: Ensure the requested resource exists.",
      404,
      undefined,
      hint,
    );
  }
}
