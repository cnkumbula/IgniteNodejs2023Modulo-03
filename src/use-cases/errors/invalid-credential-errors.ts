export class InvalidCredentialsError extends Error {
  constructor() {
    super('The credentials are not valid.')
  }
}
