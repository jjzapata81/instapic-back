export interface JwtPayload{
    id:string;
    username:string;
    name:string;
    profileImage?:string;
    iat?:string;
    exp?:string;
}