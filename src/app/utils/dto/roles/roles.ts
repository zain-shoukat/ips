import { IBaseEntity } from '../base.js';

export interface IRoles extends IBaseEntity {
  accessLevel: number;
  hasModificationAccess: boolean;
  slug: string;
  description?: string | null;
  updatedBy?: number | null;
  isActive: boolean;
}

export interface ICreateRoles extends IBaseEntity {
  accessLevel: number;
  hasModificationAccess: boolean;
  slug: string;
  description?: string | null;
  updatedBy?: number | null;
  isActive: boolean;
}

export async function roleCreationMapper(
  role: ICreateRoles,
): Promise<ICreateRoles> {
  const createRole: ICreateRoles = {
    accessLevel: role.accessLevel,
    hasModificationAccess:
      role.hasModificationAccess || false,
    slug: role.slug,
    description: role.description || null,
    updatedBy: role.updatedBy || null,
    isActive: true,
  };
  return createRole;
}
