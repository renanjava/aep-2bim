export interface CreateEducationDto {
  title: string;
  description?: string;
  url: string;
}

export const createEducationDto = {
  title: {
    type: "string",
    required: "title is required",
  },
  description: {
    type: "string",
  },
  url: {
    type: "string",
    required: "url is required",
    format: "uri",
  },
};
