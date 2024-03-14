import { IBaseEntity } from '../base.js';

export interface IRoleAction extends IBaseEntity {
  actionId: number;
  roleId: number;
  updatedBy: number | null;
  description: string | null;
}
