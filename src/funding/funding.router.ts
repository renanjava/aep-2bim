import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { FundingController, FundingRepository, FundingService } from "./index";
import { CreateFundingDto, UpdateFundingDto } from "./dto";

const fundingController = new FundingController(
    new FundingService(new FundingRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Fundings
 *   description: Rotas para operações relacionadas a financiamentos
 */
const fundingRoutes = Router();

/**
 * @swagger
 * /fundings:
 *   post:
 *     tags: [Fundings]
 *     summary: Cria um novo financiamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funding'
 *     responses:
 *       201:
 *         description: Financiamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnFunding'
 */
fundingRoutes.post(
    "/fundings",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await fundingController.create(req, res);
    }),
);

/**
 * @swagger
 * /fundings:
 *   get:
 *     summary: Retorna todos os financiamentos
 *     tags: [Fundings]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filtrar financiamentos por status
 *       - in: query
 *         name: startFundingDate
 *         required: false
 *         description: Data de início do período de filtro de criação do financiamento YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *       - in: query
 *         name: endFundingDate
 *         required: false
 *         description: Data de fim do período de filtro de criação do financiamento YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Lista de financiamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReturnFunding'
 */
fundingRoutes.get(
    "/fundings",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await fundingController.findAll(req, res);
    }),
);

/**
 * @swagger
 * /fundings/id/{id}:
 *   get:
 *     summary: Retorna um financiamento pelo ID
 *     tags: [Fundings]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do financiamento a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Financiamento retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnFunding'
 */
fundingRoutes.get(
    "/fundings/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await fundingController.findOne(req, res);
    }),
);

/**
 * @swagger
 * /fundings/id/{id}:
 *   patch:
 *     summary: Atualiza um financiamento existente pelo ID
 *     tags: [Fundings]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do financiamento a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funding'
 *     responses:
 *       200:
 *         description: Financiamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnFunding'
 */
fundingRoutes.patch(
    "/fundings/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await fundingController.update(req, res);
    }),
);

/**
 * @swagger
 * /fundings/id/{id}:
 *   delete:
 *     summary: Exclui um financiamento existente pelo ID
 *     tags: [Fundings]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do financiamento a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Financiamento excluído com sucesso
 */
fundingRoutes.delete(
    "/fundings/id/:id",
    asyncErrorHandler(async (req: Request, res: Response) => {
        await fundingController.remove(req, res);
    }),
);

export default fundingRoutes;
