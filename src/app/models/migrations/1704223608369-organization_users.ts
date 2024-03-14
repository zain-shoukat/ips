import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class OrganizationUsers1704223608369
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE ${database.schema}.organization_users (
            id SERIAL PRIMARY KEY,
            is_owner BOOLEAN NOT NULL,
            organization_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
           updated_by INTEGER DEFAULT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           deleted_at TIMESTAMP DEFAULT NULL
        );`);
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `DROP TABLE organization_users;`,
    );
  }
}
