import type * as express from 'express';
import type { User } from 'generated/prisma/browser';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
