import Joi from 'joi';

const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required().min(12),
    hobby: Joi.array(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default { register, login };
