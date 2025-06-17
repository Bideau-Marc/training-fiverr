import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceipeController } from './receipe/receipe.controller';
import { ReceipeService } from './receipe/receipe.service';

@Module({
  imports: [],
  controllers: [AppController, ReceipeController],
  providers: [AppService, ReceipeService],
})
export class AppModule {}
