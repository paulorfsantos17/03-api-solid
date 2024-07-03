export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`E-mail already exists: ${email}`)
  }
}
