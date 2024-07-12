import { BadRequestException, Injectable } from '@nestjs/common';

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
    return this.users.find(el => el.id === id)
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
      throw new BadRequestException('user not found')
    }

    const newUser = {
      ...this.users[index],
      name
    }
    this.users[index] = newUser

    return newUser
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(el => el.id === id)
    if (index === -1) {
      throw new BadRequestException('user not found')
    }

    this.users.splice(index, 1)
    return true
  }
}
