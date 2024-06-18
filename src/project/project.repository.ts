import { PrismaClient } from "@prisma/client";
import { CreateProjectDto, UpdateProjectDto } from "./dto";

const prisma = new PrismaClient();

export class ProjectRepository {
  constructor() { }

  async create(createProjectDto: CreateProjectDto) {
    return prisma.project.create({
      data: {
        ...createProjectDto,
      },
    });
  }

  async findAll(filterParams: any) {
    return prisma.project.findMany(filterParams);
  }

  async findOne(id: string) {
    return prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  async remove(id: string) {
    return prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
