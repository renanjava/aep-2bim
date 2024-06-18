import { CreateProjectDto } from "./create-project.dto";

export interface UpdateProjectDto extends Partial<CreateProjectDto> { }

export const updateProjectDto = {
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  userId: {
    type: "string",
  },
};
