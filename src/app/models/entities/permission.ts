import { Entity, Column } from 'typeorm';
import { IPermission } from '../../utils/dto/permission/permission.js';

import { BaseEntity } from './base.js';
@Entity('permissions')
export class Permission
  extends BaseEntity
  implements IPermission
{
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'slug' })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'api' })
  api!: string;

  @Column({ type: 'boolean', nullable: false, name: 'is_active' })
  isActive!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'method' })
  method!: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'authorization_level' })
  authorizationLevel!: string | null;

  @Column({ type: 'integer', nullable: true, name: 'updated_by' })
  updatedBy!: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'description' })
  description!: string | null;
}
