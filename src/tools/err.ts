import { fmt } from "./utils";

export class Err extends Error {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);
  }

  public toString() {
    return fmt("Err({status}): {message}", {
      message: this.message,
      status: this.status,
    });
  }
}

export class NotImplementedError extends Error {
  constructor(name: string) {
    super(fmt("{name} is not implemented.", { name }));
    this.name = name;
  }
}
