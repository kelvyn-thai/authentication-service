import { PermissionType } from '@src/authorization/types/permissions.type';
import { Role } from '@src/users/enums/role.enum';

/**
 * Represents active user data.
 *
 * @property {number} sub - The subject identifier of the user.
 * @property {string} email - The email address of the user.
 * @property {Role} role - The role of the user.
 */
export interface ActiveUserData {
  sub: string;
  email: string;
  role: Role;
  permissions: PermissionType[];
}
