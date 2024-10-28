import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const { password, ...user } = createUserDto;
      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync(password),
        ...user
      });
      const { password:_, ...created} = await this.userRepository.save(newUser);
      return {
        username:created.username,
        name:created.name,
        token:this.getToken({password, ...created})
      };
    }catch(error){
      if(error.code='23505'){
        throw new BadRequestException(`${createUserDto.username} ya existe!!`)
      }
      throw new InternalServerErrorException('Algo salió mal!!')
    }
  }

  async login(loginUserDto:LoginUserDto){
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({username});
    if(!user || this.isNotValid(password, user.password)){
      throw new UnauthorizedException('Not valid credentials');
    }
    return {
      username:user.username,
      name:user.name,
      token:this.getToken(user)
    };
  }

  findAll() {
    return this.userRepository.find({
      where:{
        isActive:true
      },
      select:{
        name:true,
        email:true,
        username:true,
        profileImage:true
      }
    });
  }

  findOne(username: string) {
    return this.userRepository.findOne({
      where:{
        username,
        isActive:true
      },
      relations:{
        posts:{
          comments:{
            user:true
          }
        }
      },
      select:{
        id:true,
        username:true,
        email:true,
        name:true,
        profileImage:true,
        posts:true
      }
    });
  }

  update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    const { userId, ...user }= updateUserDto;
    return this.userRepository.update(
      { id:userId },
      user
    );
  }

  remove(username: string) {
    return this.userRepository.update(
      { username },
      {isActive:false}
    );
  }

  private isNotValid(password:string, encripted:string){
    return !bcryptjs.compareSync(password, encripted);
  }

  private getToken(user:User):string{
    return this.jwtService.sign({
      id:user.id,
      username:user.username,
      name:user.name,
      profileImage:user.profileImage
    });
  }
}
