import { ISignUp } from '../masterUserAuth/index.js';
import { IBaseEntity } from '../base.js';
import { ICreateUser } from './ICreateUser.js';

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string | null;
  isActive: boolean;
  username: string;
  isPromotionalEmail: boolean;
  address?: string | null;
  cnic?: string | null;
  externalId: string;
  verifiedAt?: Date | null;
  language?: string | null;
  country?: string | null;
  city?: string | null;
  updatedBy?: number | null;
  isTermAccepted?: boolean;
  isOwner?: boolean;
  organizationId?: number | null;
}

export async function convertSignUpToCreateUser(
  signUpData: ISignUp,
): Promise<ICreateUser> {
  const createUser: ICreateUser = {
    firstName: signUpData.firstName,
    lastName: signUpData.lastName,
    password: signUpData.password,
    email: signUpData.email,
    phone: undefined, // Assuming phone is not present in signUpData
    isActive: true, // Set a default value or adjust based on your logic
    username: signUpData.email, // Use email as the default username or adjust based on your logic
    isPromotionalEmail: signUpData.isPromotionalEmail,
    address: undefined, // Assuming address is not present in signUpData
    cnic: undefined, // Assuming cnic is not present in signUpData
    externalId: 'N/A', // Set a default value or adjust based on your logic
    verifiedAt: undefined, // Assuming verifiedAt is not present in signUpData
    language: undefined, // Assuming language is not present in signUpData
    country: undefined, // Assuming country is not present in signUpData
    city: undefined, // Assuming city is not present in signUpData
    updatedBy: undefined, // Assuming updatedBy is not present in signUpData
    isTermAccepted: false, // Set a default value or adjust based on your logic
    isOwner: true,
    organizationId: undefined
  };

  return createUser;
}

export async function userCreationMapper(
  user: IUser,
): Promise<ICreateUser> {
  const createRole: any = {
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
    phone: user.phone || null, 
    isActive: user.isActive || true, 
    username: user.username || user.email,
    isPromotionalEmail: user.isPromotionalEmail || false,
    address: user.address || null,
    cnic: user.cnic || null,
    externalId: user.externalId || 'N/A', 
    verifiedAt: null, 
    language: user.language || null, 
    country: user.country || null, 
    city: user.city || null, 
    updatedBy: user.updatedBy || null, 
    isTermAccepted: user.isTermAccepted || false,
    isOwner: user.isOwner || false,
    organizationId: user.organizationId || null,
  };
  return createRole;
}
