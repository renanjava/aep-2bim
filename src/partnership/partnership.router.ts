import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { PartnershipController, PartnershipRepository, PartnershipService } from "./index";
import { CreatePartnershipDto, UpdatePartnershipDto } from "./dto";

const partnershipController = new PartnershipController(
    new PartnershipService(new PartnershipRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Partnerships
 *   description: Rotas para operações relacionadas a parcerias
 */
const partnershipRoutes = Router();

/**
 * @swagger
 * /partnerships:
 *   post:
 *     tags: [Partnerships]
 *     summary: Cria uma nova parceria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partnership'
 *     responses:
 *       201:
 *         description: Parceria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnPartnership'
 */
partnershipRoutes.post(
    "/partnerships",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await partnershipController.create(req, res);
    }),
);

/**
 * @swagger
 * /partnerships:
 *   get:
 *     summary: Retorna todas as parcerias
 *     tags: [Partnerships]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filtrar parcerias por status
 *       - in: query
 *         name: startCreationDate
 *         required: false
 *         description: Data de início do período de filtro de criação da parceria YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *       - in: query
 *         name: endCreationDate
 *         required: false
 *         description: Data de fim do período de filtro de criação da parceria YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Lista de parcerias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReturnPartnership'
 */
partnershipRoutes.get(
    "/partnerships",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await partnershipController.findAll(req, res);
    }),
);

/**
 * @swagger
 * /partnerships/id/{id}:
 *   get:
 *     summary: Retorna uma parceria pelo ID
 *     tags: [Partnerships]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da parceria a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parceria retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnPartnership'
 */
partnershipRoutes.get(
    "/partnerships/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await partnershipController.findOne(req, res);
    }),
);

/**
 * @swagger
 * /partnerships/id/{id}:
 *   patch:
 *     summary: Atualiza uma parceria existente pelo ID
 *     tags: [Partnerships]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da parceria a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partnership'
 *     responses:
 *       200:
 *         description: Parceria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnPartnership'
 */
partnershipRoutes.patch(
    "/partnerships/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await partnershipController.update(req, res);
    }),
);

/**
 * @swagger
 * /partnerships/id/{id}:
 *   delete:
 *     summary: Exclui uma parceria existente pelo ID
 *     tags: [Partnerships]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da parceria a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Parceria excluída com sucesso
 */
partnershipRoutes.delete(
    "/partnerships/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await partnershipController.remove(req, res);
    }),
);