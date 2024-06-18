import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./dto";

const prisma = new PrismaClient();

export class UserRepository {
    constructor() { }

    async create(createUserDto: CreateUserDto) {
        return prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
    }

    async findAll(filterParams: any) {
        return prisma.user.findMany(filterParams);
    }

    async findOne(id: string) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return prisma.user.update({
            where: {
                id,
            },
            data: {
                ...updateUserDto,
            },
        });
    }

    async remove(id: string) {
        return prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
