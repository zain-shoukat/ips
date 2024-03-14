import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class RoleActions1704222445674
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE ${database.schema}.role_actions (
            id SERIAL PRIMARY KEY,
            action_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL,
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
    await queryRunner.query(`DROP TABLE role_actions;`);
  }
}
