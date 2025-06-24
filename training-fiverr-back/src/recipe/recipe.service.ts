import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { PrismaClient, Recipe } from 'generated/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateRecipeDto } from 'src/dto/recipe/CreateRecipe.dto';
import { TimeoutError } from 'rxjs';

@Injectable()
export class RecipeService {
    private prisma = new PrismaClient();

    async createRecipe(recipe: CreateRecipeDto): Promise<Recipe> {
        try {
            const prismaData = {
                title: recipe.title,
                steps: recipe.steps,
                ingredients: {
                    create: recipe.ingredients?.map(ingredient => ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    })),
                },
            }
            return this.prisma.recipe.create({
                data: prismaData,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException(`Recipe with title ${recipe.title} already exists.`);
            }
            else if (error instanceof TimeoutError) {
                throw new Error(`Database operation timed out.`);
            }
            throw error;
        }
    }
    async getAllRecipes(): Promise<Recipe[]> {

        return this.prisma.recipe.findMany({});

    }
    async getRecipeById(id: number): Promise<Recipe | null> {
        const recipe = await this.prisma.recipe.findUnique({ where: { id } });
        if (!recipe) throw new NotFoundException(`Recipe id : ${id} not found.`);
        return recipe;

    }
    async updateRecipe(id: number, recipe: CreateRecipeDto): Promise<Recipe> {
        try {
            const prismaData = {
                title: recipe.title,
                steps: recipe.steps,
                ingredients: {
                    create: recipe.ingredients?.map(ingredient => ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    })),
                },
            }
            return this.prisma.recipe.update({
                where: { id },
                data: prismaData,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Recipe id : ${id} not found.`);
            }
            throw error;
        }
    }
    async deleteRecipe(id: number): Promise<Recipe> {
        if (!id) {
            throw new Error('Recipe ID is required for deletion');
        }
        try {
            return this.prisma.$transaction(async (prisma) => {
                await prisma.ingredient.deleteMany({
                    where: { recipeId: id },
                });
                return prisma.recipe.delete({
                    where: { id },
                });
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Recipe with ID ${id} does not exist.`);
            }
            throw error;
        }
    }
}
