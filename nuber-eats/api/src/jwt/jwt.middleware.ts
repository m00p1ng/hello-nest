import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JwtService } from './jwt.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if ('x-jwt' in req.headers) {
        const token = req.headers['x-jwt'];
        const decoded = this.jwtService.verify(token.toString());

        if (typeof decoded === 'object') {
          const { user, ok } = await this.userService.findById(decoded.id);
          if (ok) {
            req['user'] = user;
          }
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
    next();
  }
}
