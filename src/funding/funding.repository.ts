import { PrismaClient } from "@prisma/client";
import { CreateFundingDto, UpdateFundingDto } from "./dto";

const prisma = new PrismaClient();

export class FundingRepository {
  constructor() {}

  async create(createFundingDto: CreateFundingDto) {
    return prisma.funding.create({
      data: {
        ...createFundingDto,
      },
    });
  }

  async findAll(filterParams: any) {
    return prisma.funding.findMany(filterParams);
  }

  async findOne(id: string) {
    return prisma.funding.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateFundingDto: UpdateFundingDto) {
    return prisma.funding.update({
      where: {
        id,
      },
      data: {
        ...updateFundingDto,
      },
    });
  }

  async remove(id: string) {
    return prisma.funding.delete({
      where: {
        id,
      },
    });
  }
}
