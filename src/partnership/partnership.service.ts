import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreatePartnershipDto, UpdatePartnershipDto } from "./dto";
import { PartnershipQueryParams } from "./dto/partnership-query.params";
import { PartnershipRepository } from "./partnership.repository";
import { mergeObjects } from "../common/utils/merge-objects";

export class PartnershipService {
    constructor(private readonly partnershipRepository: PartnershipRepository) { }

    async create(createPartnershipDto: CreatePartnershipDto) {
        const partnership = await this.partnershipRepository.create(createPartnershipDto);
        return partnership;
    }

    async findAll(filterParams: PartnershipQueryParams) {
        if (Object.keys(filterParams).length === 0) {
            return await this.partnershipRepository.findAll({});
        }

        const queryRaw: Array<Prisma.PartnershipWhereInput> = [];
        const query = mergeObjects(queryRaw);

        const partnerships = await this.partnershipRepository.findAll(query);
        return partnerships;
    }

    async findOne(id: string) {
        const partnership = await this.partnershipRepository.findOne(id);
        if (!partnership) throw new NotFoundException(`Unable to find partnership with id ${id}`);
        return partnership;
    }

    async update(id: string, updatePartnershipDto: UpdatePartnershipDto) {
        const partnership = await this.partnershipRepository.update(id, updatePartnershipDto);
        return partnership;
    }

    async remove(id: string) {
        await this.partnershipRepository.remove(id);
    }
}
