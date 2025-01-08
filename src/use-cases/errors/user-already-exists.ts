export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists or whatsapp already exists')
  }
}
