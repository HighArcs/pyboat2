import { fmt } from "./utils";

export class Err extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly showUsage: boolean = false
  ) {
    super(message);
  }

  public toString() {
    return fmt("Err({status}): {message}", {
      message: this.message,
      status: this.status,
    });
  }
}

export class Ok extends Err {
  constructor(public readonly message: string) {
    super(200, message, false);
  }

  public toString() {
    return fmt("Ok('{message}')", { message: this.message });
  }
}

export class NotImplementedError extends Error {
  constructor(name: string) {
    super(fmt("{name} is not implemented.", { name }));
    this.name = name;
  }
}
