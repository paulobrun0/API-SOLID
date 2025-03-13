import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Register (e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Paulo Antonio',
      email: 'paulo.bruno12@hotmail.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)
  })
})
