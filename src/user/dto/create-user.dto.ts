export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export const createUserDto = {
  name: {
    type: "string",
    required: "name is required",
  },
  email: {
    type: "string",
    required: "email is required",
    format: "email",
  },
  password: {
    type: "string",
    required: "password is required",
  },
};
