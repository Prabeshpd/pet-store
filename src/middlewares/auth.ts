import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { appConfig } from '@/config/appConfig';
import * as jwt from '@/lib/jwt';
import ApiError from '@/lib/apiError';
import { UserSchema } from '@/repositories/users';

export interface AuthorizedRequest extends Request {
  user: UserSchema;
}

async function authenticate(request: Request, _response: Response, next: NextFunction) {
  const authorizedRequest = request as AuthorizedRequest;
  try {
    const { accessTokenSecret } = appConfig.auth;

    const secret = `${accessTokenSecret}`;
    const token = request.headers.authorization;

    if (!token) {
      const error = new ApiError({ message: 'No authorization header set', code: StatusCodes.BAD_REQUEST });

      return next(error);
    }

    if (!token.includes('Bearer')) {
      const error = new ApiError({
        code: StatusCodes.BAD_GATEWAY,
        message: "Authorization header doesn't include a Bearer token"
      });

      return next(error);
    }

    const bearerToken = token.split(' ')[1];

    try {
      const decodedResult = (await jwt.verifyToken(bearerToken, secret)) as UserSchema;
      authorizedRequest.user = decodedResult;

      next();
    } catch (err) {
      const error = new ApiError({ message: 'Invalid Token', code: StatusCodes.UNAUTHORIZED });

      return next(error);
    }
  } catch (err) {
    const error = new ApiError({ message: 'Something went wrong', code: StatusCodes.INTERNAL_SERVER_ERROR });

    return next(error);
  }
}

export default authenticate;
