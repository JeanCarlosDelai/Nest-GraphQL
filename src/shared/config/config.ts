import * as env from 'env-var';

export const config = {
  PORT: env.get('PORT').required().asIntPositive(),
  DATABASE_PORT: env.get('DATABASE_PORT').required().asString(),
  USER: env.get('USER').required().asString(),
  PASSWORD: env.get('PASSWORD').required().asString(),
  DATABASE: env.get('DATABASE').required().asString(),
};
