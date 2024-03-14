import Joi from 'joi';

const createRolesValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    accessLevel:Joi.number().label('access level for role is manadatory field').required(),
    hasModificationAccess:Joi.boolean().optional(),
    slug: Joi.string()
      .label('slug for role is manadatory field').required(),
    updatedBy:Joi.number().optional(),
    description:Joi.string().max(255).optional(),
    isActive:Joi.boolean().optional()
  }),
  query: Joi.object().empty().optional(),
});

const updateRolesValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    accessLevel:Joi.number().optional(),
    hasModificationAccess:Joi.boolean().optional(),
    slug: Joi.string().optional(),
    updatedBy:Joi.number().optional(),
    description:Joi.string().max(255).optional(),
    isActive:Joi.boolean().optional()
  }),
  query: Joi.object().empty().optional(),
});


export { createRolesValidator as CreateRolesValidator, updateRolesValidator as UpdateRolesValidator };
