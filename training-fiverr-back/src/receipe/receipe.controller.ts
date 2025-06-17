import { Controller } from '@nestjs/common';
import { ReceipeService } from './receipe.service';
@Controller('receipe')
export class ReceipeController {
    constructor(private readonly receipeService: ReceipeService) { }

}
