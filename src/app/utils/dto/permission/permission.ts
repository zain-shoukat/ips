import { IBaseEntity } from '../base.js';

export interface IPermission extends IBaseEntity {
  slug: string;
  api: string;
  isActive: boolean;
  method: string;
  authorizationLevel: string | null;
  updatedBy: number | null;
  description: string | null;
}


export async function permissionCreationMapper(
  permission: IPermission,
): Promise<IPermission> {
  const createPermission: IPermission = {
    slug: permission.slug,
    api:permission.api,
    isActive: permission.isActive || true,
    method: permission.method,
    authorizationLevel:permission.authorizationLevel,
    updatedBy: permission.updatedBy || null,
    description: permission.description,
  };
  return createPermission;
}
