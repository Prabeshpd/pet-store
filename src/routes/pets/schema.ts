import * as Joi from 'joi';

export const petSchema = Joi.object().keys({
  name: Joi.string().required(),
  species: Joi.string().valid('cat', 'dog').required(),
  birthYear: Joi.string().max(4).required(),
  photoUrl: Joi.string()
});
