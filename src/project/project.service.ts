import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateProjectDto, UpdateProjectDto } from "./dto";
import { ProjectQueryParams } from "./dto/project-query.params";
import { ProjectRepository } from "./project.repository";
import { mergeObjects } from "../common/utils/merge-objects";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) { }

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    return project;
  }

  async findAll(filterParams: ProjectQueryParams) {
    if (Object.keys(filterParams).length === 0) {
      return await this.projectRepository.findAll({});
    }

    const queryRaw: Array<Prisma.ProjectWhereInput> = [];
    const query = mergeObjects(queryRaw);

    const projects = await this.projectRepository.findAll(query);
    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne(id);
    if (!project) throw new NotFoundException(`Unable to find project with id ${id}`);
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.update(id, updateProjectDto);
    return project;
  }

  async remove(id: string) {
    await this.projectRepository.remove(id);
  }
}
