import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class Roles1704221426781
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE ${database.schema}.roles (
            id SERIAL PRIMARY KEY,
            access_level INTEGER NOT NULL,
            has_modification_access BOOLEAN DEFAULT FALSE,
            slug VARCHAR(50) UNIQUE NOT NULL,
            description VARCHAR(255) DEFAULT NULL,
            updated_by INTEGER DEFAULT NULL,
            is_active BOOLEAN NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );
    `);
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`DROP TABLE roles;`);
  }
}
