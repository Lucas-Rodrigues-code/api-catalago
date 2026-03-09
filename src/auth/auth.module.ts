import { Module } from '@nestjs/common';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      // Configurações opcionais
      // @ts-ignore
      policyEnforcement: 'permissive',
      // @ts-ignore
      tokenValidation: 'online',
    }),
  ],
  providers: [AuthGuard, ResourceGuard, RoleGuard],
  exports: [AuthGuard, ResourceGuard, RoleGuard],
})
export class AuthModule {}
