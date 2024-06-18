import { CreateUserDto } from "./create-user.dto";

export interface UpdateUserDto extends Partial<CreateUserDto> { }

export const updateUserDto = {
  name: {
    type: "string",
  },
  email: {
    type: "string",
  },
  password: {
    type: "string",
  },
};
