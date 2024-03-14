import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.js';
import { IUser } from '../../utils/dto/user/user.js';

@Entity('users')
export class Users extends BaseEntity implements IUser {
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  firstName!: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  lastName!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password!: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  phone?: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
  })
  isActive!: boolean;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username!: string;

  @Column({
    name: 'is_promotional_email',
    type: 'boolean',
    default: false,
  })
  isPromotionalEmail!: boolean;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  address?: string;

  @Column({
    name: 'cnic',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  cnic?: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  externalId!: string;

  @Column({
    name: 'verified_at',
    type: 'timestamp',
    nullable: true,
  })
  verifiedAt?: Date;

  @Column({
    name: 'language',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  language?: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  country?: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city?: string;

  @Column({
    name: 'updated_by',
    type: 'integer',
    nullable: true,
  })
  updatedBy?: number;

  @Column({
    name: 'is_term_accepted',
    type: 'boolean',
    nullable: true,
  })
  isTermAccepted?: boolean;

  @Column({
    name: 'is_owner',
    type: 'boolean',
    default: false,
  })
  isOwner?: boolean;

  @Column({
    name: 'organization_id',
    type: 'integer',
    nullable: true,
  })
  organizationId?: number;
}
