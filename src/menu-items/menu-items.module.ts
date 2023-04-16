import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { MenuItemRepository } from './menu-items.repository';

export const menuItemsModuleConfig = {
  imports: [TypeOrmModule.forFeature([MenuItem])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService,MenuItemRepository],
};

@Module(menuItemsModuleConfig)
export class MenuItemsModule {}
