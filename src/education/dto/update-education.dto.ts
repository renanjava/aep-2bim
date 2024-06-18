import { CreateEducationDto } from "./create-education.dto";

export interface UpdateEducationDto extends Partial<CreateEducationDto> { }

export const updateEducationDto = {
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  url: {
    type: "string",
  },
};
