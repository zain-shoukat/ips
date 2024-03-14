import { IBaseEntity } from '../base.js';

export interface IAppFeature extends IBaseEntity {
  name: string;
  slug: string;
  productId: number;
  isActive: boolean;
  updatedBy: number | null;
  description: string | null;
}
