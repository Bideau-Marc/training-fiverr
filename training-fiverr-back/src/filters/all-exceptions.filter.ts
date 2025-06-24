import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // Si c'est une erreur HTTP classique (throw new HttpException)
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }
        // Gestion des erreurs Prisma
        else if (exception instanceof PrismaClientKnownRequestError) {
            switch (exception.code) {
                case 'P2002': // Violation de contrainte unique
                    status = HttpStatus.CONFLICT;
                    message = 'Duplicate value error';
                    break;
                // Gère d’autres codes si besoin
                default:
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Database error';
                    break;
            }
        }
        // Gestion Timeout
        else if (exception instanceof Error && exception.message.includes('timed out')) {
            status = HttpStatus.GATEWAY_TIMEOUT;
            message = 'Request timed out';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}