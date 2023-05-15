import Joi, { string } from 'joi';

const create = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    age: Joi.number().required().min(12),
    hobby: Joi.array(),
});

export default { create };
