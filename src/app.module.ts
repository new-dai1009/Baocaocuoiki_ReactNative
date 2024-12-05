import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'ormconfig';
import { UserModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/products/products.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ProductImageModule } from './modules/productImage/productImage.module';
import { WishlistItemModule } from './modules/wishlistItems/wishlistItem.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItemModule } from './modules/cartItem/cartItem.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    ...databaseConfig,
    autoLoadEntities:true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,  
  }),
  UserModule, ProductModule, CategoryModule, ProductImageModule, WishlistItemModule, CartModule, CartItemModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
