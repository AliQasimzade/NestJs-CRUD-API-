import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot(`${process.env.MONGO_DB_URL}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
