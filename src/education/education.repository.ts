import { PrismaClient } from "@prisma/client";
import { CreateEducationDto, UpdateEducationDto } from "./dto";

const prisma = new PrismaClient();

export class EducationRepository {
    constructor() { }

    async create(createEducationDto: CreateEducationDto) {
        return prisma.education.create({
            data: {
                ...createEducationDto,
            },
        });
    }

    async findAll(filterParams: any) {
        return prisma.education.findMany(filterParams);
    }

    async findOne(id: string) {
        return prisma.education.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: string, updateEducationDto: UpdateEducationDto) {
        return prisma.education.update({
            where: {
                id,
            },
            data: {
                ...updateEducationDto,
            },
        });
    }

    async remove(id: string) {
        return prisma.education.delete({
            where: {
                id,
            },
        });
    }
}
