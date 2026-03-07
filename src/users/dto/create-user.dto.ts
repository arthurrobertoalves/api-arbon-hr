import { UserRole } from "generated/prisma/enums";

export class CreateUserDto {
  role: UserRole;
  code: string;
}
