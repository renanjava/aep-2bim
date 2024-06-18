import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { UserController, UserRepository, UserService } from "./index";

const userController = new UserController(
    new UserService(new UserRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas para operações relacionadas a usuários
 */
const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnUser'
 */
userRoutes.post(
    "/users",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await userController.create(req, res);
    }),
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filtrar usuários por status
 *       - in: query
 *         name: startCreationDate
 *         required: false
 *         description: Data de início do período de filtro de criação do usuário YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *       - in: query
 *         name: endCreationDate
 *         required: false
 *         description: Data de fim do período de filtro de criação do usuário YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReturnUser'
 */
userRoutes.get(
    "/users",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await userController.findAll(req, res);
    }),
);

/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnUser'
 */
userRoutes.get(
    "/users/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await userController.findOne(req, res);
    }),
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário existente pelo ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnUser'
 */
userRoutes.patch(
    "/users/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await userController.update(req, res);
    }),
);

/**
 * @swagger
 * /users/id/{id}:
 *   delete:
 *     summary: Exclui um usuário existente pelo ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 */
userRoutes.delete(
    "/users/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await userController.remove(req, res);
    }),
);

export default userRoutes;
