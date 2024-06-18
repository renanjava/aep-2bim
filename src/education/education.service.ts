import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateEducationDto, UpdateEducationDto } from "./dto";
import { EducationQueryParams } from "./dto/education-query.params";
import { EducationRepository } from "./education.repository";
import { mergeObjects } from "../common/utils/merge-objects";

export class EducationService {
    constructor(private readonly educationRepository: EducationRepository) { }

    async create(createEducationDto: CreateEducationDto) {
        const education = await this.educationRepository.create(createEducationDto);
        return education;
    }

    async findAll(filterParams: EducationQueryParams) {
        if (Object.keys(filterParams).length === 0) {
            return await this.educationRepository.findAll({});
        }

        const queryRaw: Array<Prisma.EducationWhereInput> = [];
        const query = mergeObjects(queryRaw);

        const educations = await this.educationRepository.findAll(query);
        return educations;
    }

    async findOne(id: string) {
        const education = await this.educationRepository.findOne(id);
        if (!education) throw new NotFoundException(`Unable to find education with id ${id}`);
        return education;
    }

    async update(id: string, updateEducationDto: UpdateEducationDto) {
        const education = await this.educationRepository.update(id, updateEducationDto);
        return education;
    }

    async remove(id: string) {
        await this.educationRepository.remove(id);
    }
}
