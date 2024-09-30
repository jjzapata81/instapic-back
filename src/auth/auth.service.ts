import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    }catch(error){
      console.log(error);
      if(error.code='23505'){
        throw new BadRequestException(`${createUserDto.username} ya existe!!`)
      }
      throw new InternalServerErrorException('Algo salió mal!!')
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
