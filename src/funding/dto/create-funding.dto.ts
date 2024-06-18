export interface CreateFundingDto {
  title: string;
  description?: string;
  amount: number;
  deadline: Date;
}

export const createFundingDto = {
  title: {
    type: "string",
    required: "title is required",
  },
  description: {
    type: "string",
  },
  amount: {
    type: "number",
    required: "amount is required",
  },
  deadline: {
    type: "string",
    required: "deadline is required",
    format: "date-time",
  },
};
