import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class AppFeatures1704222058501
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE ${database.schema}.app_features (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL ,
            product_id INTEGER NOT NULL,
            is_active BOOLEAN NOT NULL,
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
    await queryRunner.query(`DROP TABLE app_features;`);
  }
}
