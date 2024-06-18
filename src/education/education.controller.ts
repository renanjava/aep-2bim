import { Request, Response } from "express";
import { EducationService } from "./education.service";

export class EducationController {
    constructor(private readonly educationService: EducationService) { }

    async create(req: Request, res: Response) {
        const education = await this.educationService.create(req.body);
        return res.status(201).json(education);
    }

    async findAll(req: Request, res: Response) {
        const educations = await this.educationService.findAll(req.query);
        return res.status(200).json(educations);
    }

    async findOne(req: Request, res: Response) {
        const education = await this.educationService.findOne(req.params.id);
        return res.status(200).json(education);
    }

    async update(req: Request, res: Response) {
        const education = await this.educationService.update(req.params.id, req.body);
        return res.status(200).json(education);
    }

    async remove(req: Request, res: Response) {
        await this.educationService.remove(req.params.id);
        return res.status(204).json();
    }
}
