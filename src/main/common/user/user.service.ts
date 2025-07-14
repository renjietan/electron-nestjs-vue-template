import { Injectable } from '@nestjs/common';
import { mainCC } from '@main/test';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {

    // this.userRepository.save({name:'test',email:'test'})
  }
  create(createUserDto: any) {
    return 'This action adds a new user';
  }

  findAll() {
    // const res = this.userRepository.find()
    return  '123'
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
