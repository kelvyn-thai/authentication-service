import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnPermissionToUserTable1706585012992
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users ADD COLUMN permissions JSON;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN permissions`);
  }
}
