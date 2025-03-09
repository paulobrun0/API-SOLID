import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-respository'

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
