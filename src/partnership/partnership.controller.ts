import { Request, Response } from "express";
import { PartnershipService } from "./partnership.service";

export class PartnershipController {
    constructor(private readonly partnershipService: PartnershipService) { }

    async create(req: Request, res: Response) {
        const partnership = await this.partnershipService.create(req.body);
        return res.status(201).json(partnership);
    }

    async findAll(req: Request, res: Response) {
        const partnerships = await this.partnershipService.findAll(req.query);
        return res.status(200).json(partnerships);
    }

    async findOne(req: Request, res: Response) {
        const partnership = await this.partnershipService.findOne(req.params.id);
        return res.status(200).json(partnership);
    }

    async update(req: Request, res: Response) {
        const partnership = await this.partnershipService.update(req.params.id, req.body);
        return res.status(200).json(partnership);
    }

    async remove(req: Request, res: Response) {
        await this.partnershipService.remove(req.params.id);
        return res.status(204).json();
    }
}
