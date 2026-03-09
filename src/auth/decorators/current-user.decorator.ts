import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface KeycloakUser {
  sub: string;
  email?: string;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): KeycloakUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
