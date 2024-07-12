import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number
  name: string
}

@Injectable()
export class AppService {
  private users: User[] = []

  find(): User[] {
    return [...this.users.reverse()];
  }

  findById(id: number): User {
    const existed = this.users.find(el => el.id === id)
    if (!existed) {
      throw new NotFoundException('user not found')
    }

    return existed
  }

  create(name: string): User {
    const newUser = {
      id: (this.users[this.users.length - 1]?.id ?? -1) + 1,
      name
    }
    this.users.push(newUser)

    return newUser
  }

  update(id: number, name: string): User {
    const index = this.users.findIndex(el => el.id === id)
    if (index === -1) {
      throw new NotFoundException('user not found')
    }

    const newUser = {
      ...this.users[index],
      name
    }
    this.users[index] = newUser

    return newUser
  }

  delete(id: number): { deleted: number } {
    const index = this.users.findIndex(el => el.id === id)
    if (index === -1) {
      throw new NotFoundException('user not found')
    }

    this.users.splice(index, 1)
    return {
      deleted: 1
    }
  }
}
