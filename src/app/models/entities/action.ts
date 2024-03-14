import { Entity, Column } from 'typeorm';
import { IAction } from '../../utils/dto/index.js';
import { BaseEntity } from './base.js';

@Entity('actions')
export class Action extends BaseEntity implements IAction {
  @Column({ type: 'varchar', length: 255, nullable: false })
  slug!: string;

  @Column({ type: 'boolean', nullable: false })
  isActive!: boolean;

  @Column({ type: 'integer', nullable: false })
  appFeatureId!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'integer', nullable: true })
  updatedBy!: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;
}
