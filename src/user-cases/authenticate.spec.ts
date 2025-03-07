import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register Use Case', () => {
  it('should be able to authenticate', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(UsersRepository)

    await UsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(UsersRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const UsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(UsersRepository)

    await UsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '12345622',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
