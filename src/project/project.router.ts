import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/middlewares/async-error-handler.middleware";
import { ProjectController, ProjectRepository, ProjectService } from "./index";
import { CreateProjectDto, UpdateProjectDto } from "./dto";

const projectController = new ProjectController(
  new ProjectService(new ProjectRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Rotas para operações relacionadas a projetos
 */
const projectRoutes = Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     tags: [Projects]
 *     summary: Cria um novo projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnProject'
 */
projectRoutes.post(
  "/projects",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await projectController.create(req, res);
  }),
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retorna todos os projetos
 *     tags: [Projects]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filtrar projetos por status
 *         schema:
 *           type: string
 *       - in: query
 *         name: startCreationDate
 *         required: false
 *         description: Data de início do período de filtro de criação do projeto YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endCreationDate
 *         required: false
 *         description: Data de fim do período de filtro de criação do projeto YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReturnProject'
 */
projectRoutes.get(
  "/projects",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await projectController.findAll(req, res);
  }),
);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retorna um projeto pelo ID
 *     tags: [Projects]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do projeto a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projeto retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnProject'
 */
projectRoutes.get(
  "/projects/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await projectController.findOne(req, res);
  }),
);

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Atualiza um projeto existente pelo ID
 *     tags: [Projects]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do projeto a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectDto'
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnProject'
 */
projectRoutes.patch(
  "/projects/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await projectController.update(req, res);
  }),
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Deleta um projeto existente pelo ID
 *     tags: [Projects]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do projeto a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projeto deletado com sucesso
 */
projectRoutes.delete(
  "/projects/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await projectController.remove(req, res);
  }),
);

export { projectRoutes };
