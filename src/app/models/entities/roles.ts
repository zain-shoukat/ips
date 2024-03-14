import { Entity, Column } from 'typeorm';
import { IRoles } from '../../utils/dto/roles/roles.js';
import { BaseEntity } from './base.js';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Entity('roles')
export class Roles extends BaseEntity implements IRoles {
  @Column({
    type: 'integer',
    nullable: false,
    name: 'access_level',
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  accessLevel!: number;

  @Column({
    type: 'boolean',
    default: false,
    name: 'has_modification_access',
  })
  hasModificationAccess!: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'slug',
  })
  @IsString({
    message: 'slug name must be a string within 50 char',
  })
  @IsNotEmpty({
    message: 'slug name must be a string within 50 char',
  })
  slug!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'description',
  })
  description?: string | null;

  @Column({
    type: 'integer',
    nullable: true,
    name: 'updated_by',
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  updatedBy?: number | null;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'is_active',
  })
  @IsBoolean()
  isActive!: boolean;
}
