import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateFundingDto, UpdateFundingDto } from "./dto";
import { FundingQueryParams } from "./dto/funding-query.params";
import { FundingRepository } from "./funding.repository";
import { mergeObjects } from "../common/utils/merge-objects";

export class FundingService {
    constructor(private readonly fundingRepository: FundingRepository) { }

    async create(createFundingDto: CreateFundingDto) {
        const funding = await this.fundingRepository.create(createFundingDto);
        return funding;
    }

    async findAll(filterParams: FundingQueryParams) {
        if (Object.keys(filterParams).length === 0) {
            return await this.fundingRepository.findAll({});
        }

        const queryRaw: Array<Prisma.FundingWhereInput> = [];
        // Adicione filtros específicos conforme necessário
        const query = mergeObjects(queryRaw);

        const fundings = await this.fundingRepository.findAll(query);
        return fundings;
    }

    async findOne(id: string) {
        const funding = await this.fundingRepository.findOne(id);
        if (!funding) throw new NotFoundException(`Unable to find funding with id ${id}`);
        return funding;
    }

    async update(id: string, updateFundingDto: UpdateFundingDto) {
        const funding = await this.fundingRepository.update(id, updateFundingDto);
        return funding;
    }

    async remove(id: string) {
        await this.fundingRepository.remove(id);
    }
}
