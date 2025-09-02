import BaseError from "./base.js";

export default class AlreadySubmittedQuiz extends BaseError<undefined> {
  constructor() {
    super(
      "Quiz has already been submitted",
      409,
      undefined,
      "You will be able to submit a new task by tomorrow",
    );
  }
}
