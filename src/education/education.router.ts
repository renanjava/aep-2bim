import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { EducationController, EducationRepository, EducationService } from "./index";
import { CreateEducationDto, UpdateEducationDto } from "./dto";

const educationController = new EducationController(
    new EducationService(new EducationRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Education
 *   description: Rotas para operações relacionadas a educação
 */
const educationRoutes = Router();

/**
 * @swagger
 * /education:
 *   post:
 *     tags: [Education]
 *     summary: Cria um novo registro de educação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Registro de educação criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnEducation'
 */
educationRoutes.post(
    "/education",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await educationController.create(req, res);
    }),
);

/**
 * @swagger
 * /education:
 *   get:
 *     summary: Retorna todos os registros de educação
 *     tags: [Education]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: institution
 *         required: false
 *         description: Filtrar registros de educação por instituição
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: Data de início do período de filtro de criação do registro de educação YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: Data de fim do período de filtro de criação do registro de educação YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Lista de registros de educação retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReturnEducation'
 */
educationRoutes.get(
    "/education",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await educationController.findAll(req, res);
    }),
);

/**
 * @swagger
 * /education/id/{id}:
 *   get:
 *     summary: Retorna um registro de educação pelo ID
 *     tags: [Education]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do registro de educação a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de educação retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnEducation'
 */
educationRoutes.get(
    "/education/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await educationController.findOne(req, res);
    }),
);

/**
 * @swagger
 * /education/id/{id}:
 *   patch:
 *     summary: Atualiza um registro de educação existente pelo ID
 *     tags: [Education]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do registro de educação a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: Registro de educação atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnEducation'
 */
educationRoutes.patch(
    "/education/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await educationController.update(req, res);
    }),
);

/**
 * @swagger
 * /education/id/{id}:
 *   delete:
 *     summary: Exclui um registro de educação existente pelo ID
 *     tags: [Education]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do registro de educação a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Registro de educação excluído com sucesso
 */
educationRoutes.delete(
    "/education/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await educationController.remove(req, res);
    }),
);

export default educationRoutes;
