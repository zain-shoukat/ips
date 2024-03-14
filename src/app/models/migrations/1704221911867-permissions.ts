import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class Permissions1704221911867
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

        CREATE TABLE ${database.schema}.permissions (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(255) NOT NULL,
            api VARCHAR(255) NOT NULL,
            is_active BOOLEAN NOT NULL,
            method VARCHAR(255) NOT NULL,
            authorization_level VARCHAR(255) DEFAULT NULL,
            updated_by INTEGER DEFAULT NULL,
            description VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );`);
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`DROP TABLE permissions;`);
  }
}
