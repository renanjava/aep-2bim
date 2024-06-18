import { Request, Response } from "express";
import { FundingService } from "./funding.service";

export class FundingController {
    constructor(private readonly fundingService: FundingService) { }

    async create(req: Request, res: Response) {
        const funding = await this.fundingService.create(req.body);
        return res.status(201).json(funding);
    }

    async findAll(req: Request, res: Response) {
        const fundings = await this.fundingService.findAll(req.query);
        return res.status(200).json(fundings);
    }

    async findOne(req: Request, res: Response) {
        const funding = await this.fundingService.findOne(req.params.id);
        return res.status(200).json(funding);
    }

    async update(req: Request, res: Response) {
        const funding = await this.fundingService.update(req.params.id, req.body);
        return res.status(200).json(funding);
    }

    async remove(req: Request, res: Response) {
        await this.fundingService.remove(req.params.id);
        return res.status(204).json();
    }
}
