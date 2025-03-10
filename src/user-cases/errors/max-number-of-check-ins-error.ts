export class MaxNumberOfCheckInsErro extends Error {
  constructor() {
    super('Number of check-ins reached.')
  }
}
