import BaseError from "./base.js";

export default class InvalidToken extends BaseError<undefined> {
  constructor(hint?: string) {
    super("The provided token is invalid or expired", 401, undefined, hint);
  }
}
