import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { log } from 'console';
import { Recipe } from 'generated/prisma';
import { CreateRecipeDto } from 'src/dto/recipe/CreateRecipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) { }
    @Post()
    async createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeService.createRecipe(createRecipeDto);
    }
    @Get()
    async getAllRecipes(): Promise<Recipe[]> {
        return this.recipeService.getAllRecipes();
    }
    @Get(':id')
    async getRecipeById(@Body('id') id: number): Promise<Recipe | null> {
        return this.recipeService.getRecipeById(id);
    }
    @Patch(':id')
    async updateRecipe(@Body('id') id: number, @Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeService.updateRecipe(id, createRecipeDto);
    }
    @Delete(':id')
    async deleteRecipe(@Param('id') id: number): Promise<Recipe> {
        log(`Deleting recipe with id: ${+id}`);
        if (!id) {
            throw new Error('Recipe ID is required for deletion');
        }
        return this.recipeService.deleteRecipe(+id);
    }

}
