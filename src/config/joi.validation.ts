import * as Joi from 'joi';

export const JoiValidationEnvSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_NAME: Joi.required(),
  DB_PORT: Joi.required(),
  DB_HOST: Joi.required(),
  DB_USERNAME: Joi.required(),
  DB_PASSWORD: Joi.required(),
  JWT_SECRET: Joi.required(),
});
