import { Entity, Column } from 'typeorm';
import { IUserRole } from '../../utils/dto/index.js';
import { BaseEntity } from './base.js';

@Entity('user_roles')
export class UserRole
  extends BaseEntity
  implements IUserRole
{
  @Column({ type: 'integer', nullable: false })
  userId!: number;

  @Column({ type: 'integer', nullable: false })
  roleId!: number;

  @Column({ type: 'integer', nullable: true })
  updatedBy!: number | null;
}
