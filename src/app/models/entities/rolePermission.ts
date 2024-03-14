import { Entity, Column } from 'typeorm';
import { IRolePermission } from '../../utils/dto/rolePermission/rolePermission.js';
import { BaseEntity } from './base.js';

@Entity('role_permissions')
export class RolePermission
  extends BaseEntity
  implements IRolePermission
{
  @Column({ type: 'integer', nullable: false })
  permissionId!: number;

  @Column({ type: 'integer', nullable: false })
  roleId!: number;

  @Column({ type: 'integer', nullable: true })
  updatedBy!: number | null;
}
