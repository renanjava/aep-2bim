import { PrismaClient } from "@prisma/client";
import { CreatePartnershipDto, UpdatePartnershipDto } from "./dto";

const prisma = new PrismaClient();

export class PartnershipRepository {
    constructor() { }

    async create(createPartnershipDto: CreatePartnershipDto) {
        return prisma.partnership.create({
            data: {
                ...createPartnershipDto,
            },
        });
    }

    async findAll(filterParams: any) {
        return prisma.partnership.findMany(filterParams);
    }

    async findOne(id: string) {
        return prisma.partnership.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: string, updatePartnershipDto: UpdatePartnershipDto) {
        return prisma.partnership.update({
            where: {
                id,
            },
            data: {
                ...updatePartnershipDto,
            },
        });
    }

    async remove(id: string) {
        return prisma.partnership.delete({
            where: {
                id,
            },
        });
    }
}
