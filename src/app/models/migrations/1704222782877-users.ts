import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class Users1704222782877
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE ${database.schema}.users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL CHECK (LENGTH(first_name) >= 1),
            last_name VARCHAR(255) NOT NULL CHECK (LENGTH(last_name) >= 1),
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(25) DEFAULT NULL,
            is_active BOOLEAN DEFAULT FALSE,
            username VARCHAR(255) NOT NULL,
            is_promotional_email BOOLEAN DEFAULT FALSE,
            address VARCHAR(255) DEFAULT NULL,
            cnic VARCHAR(20) DEFAULT NULL,
            external_id VARCHAR(255) NOT NULL,
            verified_at TIMESTAMP DEFAULT NULL,
            language VARCHAR(50) DEFAULT NULL,
            country VARCHAR(100) DEFAULT NULL,
            city VARCHAR(100) DEFAULT NULL,
            is_owner BOOLEAN DEFAULT FALSE,
            organization_id INTEGER  DEFAULT NULL,
            updated_by INTEGER DEFAULT NULL,
            deleted_at TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_term_accepted BOOLEAN
          );`);
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }
}
