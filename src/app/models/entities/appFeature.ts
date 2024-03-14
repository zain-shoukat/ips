import { Entity, Column } from 'typeorm';
import { IAppFeature } from '../../utils/dto/appFeature/appFeature.js';

import { BaseEntity } from './base.js';
@Entity('app_features')
export class AppFeature
  extends BaseEntity
  implements IAppFeature
{
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  slug!: string;

  @Column({ type: 'integer', nullable: false })
  productId!: number;

  @Column({ type: 'boolean', nullable: false })
  isActive!: boolean;

  @Column({ type: 'integer', nullable: true })
  updatedBy!: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;
}
