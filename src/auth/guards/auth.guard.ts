import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService:JwtService) {}
  canActivate(context: ExecutionContext,): boolean {
    let request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if(!token){
      throw new UnauthorizedException('Acceso no autorizado');
    }
    try{
      const payload:JwtPayload = this.jwtService.verify<JwtPayload>(token);
      request.body['userId'] = payload.id;
    }catch(error){
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return true;
  }



}
