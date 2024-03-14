import Joi from 'joi';

const createPermissionsValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    slug: Joi.string().label('Slug is a mandatory field').required(),
    api: Joi.string().label('API is a mandatory field').required(),
    isActive: Joi.boolean().label('isActive is a mandatory field').required(),
    method: Joi.string().label('Method is a mandatory field').required(),
    authorizationLevel: Joi.string().max(255).optional(),
    updatedBy: Joi.number().optional(),
    description: Joi.string().max(255).optional(),
  }),
  query: Joi.object().empty().optional(),
});

const updatePermissionsValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    slug: Joi.string().optional(),
    api: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    method: Joi.string().optional(),
    authorizationLevel: Joi.string().max(255).optional(),
    updatedBy: Joi.number().optional(),
    description: Joi.string().max(255).optional(),
  }),
  query: Joi.object().empty().optional(),
});

export { createPermissionsValidator as CreatePermissionsValidator,updatePermissionsValidator as UpdatePermissionsValidator };
