import { IBaseEntity } from '../base.js';

export interface ICreateUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string;
  isActive: boolean;
  username: string;
  isPromotionalEmail: boolean;
  address?: string;
  cnic?: string;
  externalId: string;
  verifiedAt?: Date;
  language?: string;
  country?: string;
  city?: string;
  updatedBy?: number;
  isTermAccepted?: boolean;
  isOwner?: boolean;
  organizationId?: number;
}
