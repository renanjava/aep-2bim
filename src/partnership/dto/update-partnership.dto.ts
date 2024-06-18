import { CreatePartnershipDto } from "./create-partnership.dto";

export interface UpdatePartnershipDto extends Partial<CreatePartnershipDto> { }

export const updatePartnershipDto = {
  projectId: {
    type: "number",
  },
  partnerId: {
    type: "number",
  },
};
