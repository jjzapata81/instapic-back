import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService:JwtService) {}
  canActivate(context: ExecutionContext,): boolean {
    let request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if(!token){
      throw new UnauthorizedException();
    }
    try{
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.body['userId'] = payload.id;
    }catch(error){
      throw new UnauthorizedException();
    }
    return true;
  }


  private extractToken(request:Request):string | undefined{
    const [type, token] = request.headers['authorization']?.split(' ')??[];
    return type === 'Bearer' ? token : undefined;
  }
}
