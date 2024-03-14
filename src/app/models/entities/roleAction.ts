import { Entity, Column } from 'typeorm';
import { IRoleAction } from '../../utils/dto/roleAction/index.js';
import { BaseEntity } from './base.js';

@Entity('role_actions')
export class RoleAction
  extends BaseEntity
  implements IRoleAction
{
  @Column({ type: 'integer', nullable: false })
  actionId!: number;

  @Column({ type: 'integer', nullable: false })
  roleId!: number;

  @Column({ type: 'integer', nullable: true })
  updatedBy!: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;
}
