import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeController } from './recipe/recipe.controller';
import { RecipeService } from './recipe/recipe.service';

@Module({
  imports: [],
  controllers: [AppController, RecipeController, RecipeController],
  providers: [AppService, RecipeService, RecipeService],
})
export class AppModule { }
