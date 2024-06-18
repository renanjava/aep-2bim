import { Request, Response } from "express";
import { ProjectService } from "./project.service";

export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  async create(req: Request, res: Response) {
    const project = await this.projectService.create(req.body);
    return res.status(201).json(project);
  }

  async findAll(req: Request, res: Response) {
    const projects = await this.projectService.findAll(req.query);
    return res.status(200).json(projects);
  }

  async findOne(req: Request, res: Response) {
    const project = await this.projectService.findOne(req.params.id);
    return res.status(200).json(project);
  }

  async update(req: Request, res: Response) {
    const project = await this.projectService.update(req.params.id, req.body);
    return res.status(200).json(project);
  }

  async remove(req: Request, res: Response) {
    await this.projectService.remove(req.params.id);
    return res.status(204).json();
  }
}
