import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.APP_DB_HOST,
      port:+process.env.APP_DB_PORT,
      database:process.env.APP_DB_DATABASE,
      username:process.env.APP_DB_USERNAME,
      password:process.env.APP_DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true
    }),
    PostsModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
