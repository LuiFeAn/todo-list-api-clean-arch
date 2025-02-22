import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}
export default abstract class JwtPort {
  abstract sign(payload: string | Buffer | object, secret: string): string;
  abstract verify(token: string, secret: string): JwtPayload | unknown;
}
