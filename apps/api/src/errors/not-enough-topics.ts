import BaseError from "./base.js";

export default class NotEnoughTopics extends BaseError<undefined> {
  constructor() {
    super(
      "Not enough topics completed",
      422,
      undefined,
      "Start to complete more topics to be able to perform this action",
    );
  }
}
