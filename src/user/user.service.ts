import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserQueryParams } from "./dto/user-query.params";
import { UserRepository } from "./user.repository";
import { mergeObjects } from "../common/utils/merge-objects";

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepository.create(createUserDto);
        return user;
    }

    async findAll(filterParams: UserQueryParams) {
        if (Object.keys(filterParams).length === 0) {
            return await this.userRepository.findAll({});
        }

        const queryRaw: Array<Prisma.UserWhereInput> = [];
        // Adicione filtros específicos conforme necessário
        const query = mergeObjects(queryRaw);

        const users = await this.userRepository.findAll(query);
        return users;
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException(`Unable to find user with id ${id}`);
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.update(id, updateUserDto);
        return user;
    }

    async remove(id: string) {
        await this.userRepository.remove(id);
    }
}
