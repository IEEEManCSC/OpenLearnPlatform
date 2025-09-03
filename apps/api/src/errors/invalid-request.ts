import BaseError from "./base.js";

export type InvalidRequestDetails = {
  field?: string;
  where: "body" | "query" | "params";
  message: string;
}[];

export default class InvalidRequest extends BaseError<InvalidRequestDetails> {
  constructor(details: InvalidRequestDetails, hint?: string) {
    super(
      "The request contains invalid input that can't be processed by the server",
      400,
      details,
      hint,
    );
  }
}
