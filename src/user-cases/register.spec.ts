import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'

import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should has user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          create_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Paulo Vitor',
      email: 'paulovitor@gmail.com',
      password: '123456',
    })

    const isPasswordCorreclyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorreclyHashed).toBe(true)
  })
})
