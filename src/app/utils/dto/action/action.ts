import { IBaseEntity } from '../base.js';

export interface IAction extends IBaseEntity {
  slug: string;
  isActive: boolean;
  appFeatureId: number;
  name: string;
  updatedBy: number | null;
  description: string | null;
}
