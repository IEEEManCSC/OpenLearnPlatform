import BaseError from "./base.js";

export default class PermissionDenied extends BaseError<undefined> {
  constructor(hint?: string) {
    super(
      "You do not have permission to access this resource",
      403,
      undefined,
      hint,
    );
  }
}
