import Joi from 'joi';

const createUsersValidator = Joi.object().keys({
  headers: Joi.object({}).options({ allowUnknown: true }),
  body: Joi.object({
    firstName: Joi.string().required().label('First name is a mandatory field'),
    lastName: Joi.string().required().label('Last name is a mandatory field'),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .label('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.'),
    email: Joi.string().email().required().label('Email is a mandatory field'),
    isActive: Joi.boolean().optional(),
    username: Joi.string().optional(),
    isPromotionalEmail: Joi.boolean().optional(),
    externalId: Joi.string().optional(),
    phone: Joi.string().allow(null).optional(),
    address: Joi.string().allow(null).optional(),
    cnic: Joi.string().allow(null).optional(),
    language: Joi.string().allow(null).optional(),
    country: Joi.string().allow(null).optional(),
    city: Joi.string().allow(null).optional(),
    updatedBy: Joi.number().allow(null).optional(),
    isTermAccepted: Joi.boolean().allow(null).optional(),
    organizationId: Joi.number().integer().required().label('Organization ID is a mandatory field'),
    isOwner: Joi.boolean().optional(),
  }),
  query: Joi.object().empty().optional(),
});

const updateUsersValidator = Joi.object().keys({
    headers: Joi.object({}).options({ allowUnknown: true }),
    body: Joi.object({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      isActive: Joi.boolean().optional(),
      username: Joi.string().optional(),
      isPromotionalEmail: Joi.boolean().optional(),
      externalId: Joi.string().optional(),
      phone: Joi.string().allow(null).optional(),
      address: Joi.string().allow(null).optional(),
      cnic: Joi.string().allow(null).optional(),
      language: Joi.string().allow(null).optional(),
      country: Joi.string().allow(null).optional(),
      city: Joi.string().allow(null).optional(),
      updatedBy: Joi.number().allow(null).optional(),
      isTermAccepted: Joi.boolean().allow(null).optional(),
      isOwner: Joi.boolean().optional(),
    }),
    query: Joi.object().empty().optional(),
  });

export { createUsersValidator as CreateUsersValidator,updateUsersValidator as UpdateUsersValidator };
