import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnRoleToUserTable1705288490321
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN role ENUM('Guest', 'Partner', 'Admin') DEFAULT 'Guest' COMMENT 'User roles';
`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN role;`);
  }
}
