import { IBaseEntity } from '../base.js';

export interface IRolePermission extends IBaseEntity {
  permissionId: number;
  roleId: number;
  updatedBy: number | null;
}
