import { CreateFundingDto } from "./create-funding.dto";

export interface UpdateFundingDto extends Partial<CreateFundingDto> { }

export const updateFundingDto = {
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  amount: {
    type: "number",
  },
  deadline: {
    type: "string",
    format: "date",
  },
};
