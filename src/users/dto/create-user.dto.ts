import { UserRole } from "generated/prisma/enums";

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
