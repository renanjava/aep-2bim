/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do projeto
 *         description:
 *           type: string
 *           description: Descrição do projeto
 *         userId:
 *           type: string
 *           description: ID do usuário que criou o projeto
 *     ReturnProject:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do projeto
 *         description:
 *           type: string
 *           description: Descrição do projeto
 *         userId:
 *           type: string
 *           description: ID do usuário que criou o projeto
 *         createdAt:
 *           type: string
 *           description: Data de criação do projeto
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do projeto
 *           example: 2024-03-01T00:00:00.000Z
 */

export interface ProjectEntity {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
