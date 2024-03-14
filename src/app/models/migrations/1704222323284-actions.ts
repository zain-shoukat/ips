import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class Actions1704222323284
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE ${database.schema}.actions (
           id SERIAL PRIMARY KEY,
           slug VARCHAR(255) NOT NULL ,
           is_active BOOLEAN NOT NULL,
           app_feature_id INTEGER NOT NULL,
           name VARCHAR(255) NOT NULL,
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
    await queryRunner.query(`DROP TABLE actions;`);
  }
}
