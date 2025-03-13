import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Paulo Antonio',
      email: 'paulo.bruno12@hotmail.com',
      password: '12345678',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'paulo.bruno12@hotmail.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
