import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard global que requer autenticação em todas as rotas por padrão,
 * exceto aquelas marcadas com @Public()
 *
 * Para usar, adicione no app.module.ts:
 *
 * providers: [
 *   {
 *     provide: APP_GUARD,
 *     useClass: GlobalAuthGuard,
 *   },
 * ],
 */
@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return !!request.user;
  }
}
