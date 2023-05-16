import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().required(),
    students: Joi.array(),
});

export default { create };
