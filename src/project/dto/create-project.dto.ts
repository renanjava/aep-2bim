export interface CreateProjectDto {
  title: string;
  description?: string;
  userId: string;
}

export const createProjectDto = {
  title: {
    type: "string",
    required: "title is required",
  },
  description: {
    type: "string",
  },
  userId: {
    type: "string",
    required: "userId is required",
  },
};
