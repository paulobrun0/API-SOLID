// import { UsersRepository } from '@/repositories/users-repository'
// import { UserNotFoundError } from './errors/user-not-found-error'

// export class GetUserByIdUseCase {
//   constructor(private usersRepository: UsersRepository) {}

//   async execute(id: string) {
//     const user = await this.usersRepository.getUserById(id)

//     if (!user) {
//       throw new UserNotFoundError()
//     }
//     return user
//   }
// }
