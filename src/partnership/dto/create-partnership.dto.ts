export interface CreatePartnershipDto {
  projectId: string;
  partnerId: string;
}

export const createPartnershipDto = {
  projectId: {
    type: "string",
    required: "projectId is required",
  },
  partnerId: {
    type: "string",
    required: "partnerId is required",
  },
};
