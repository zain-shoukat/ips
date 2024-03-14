import { IBaseEntity } from '../base.js';

export interface IUserRole extends IBaseEntity {
  userId: number;
  roleId: number;
  updatedBy: number | null;
}
