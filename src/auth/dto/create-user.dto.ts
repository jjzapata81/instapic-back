import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {


    @IsEmail()
    email:string;
    @IsString()
    @MinLength(8)
    username:string;
    @IsString()
    password:string;
    @IsString()
    name:string;
    @IsString()
    @IsOptional()
    profileImage:string;

}
