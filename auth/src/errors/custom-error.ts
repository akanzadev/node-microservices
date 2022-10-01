// Para usar el instanceof
// Las interfaces no son instanciables, por lo que no se puede usar el operador instanceof.
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
