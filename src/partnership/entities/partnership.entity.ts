/**
 * @swagger
 * components:
 *   schemas:
 *     Partnership:
 *       type: object
 *       properties:
 *         projectId:
 *           type: string
 *           description: ID do projeto
 *         partnerId:
 *           type: string
 *           description: ID do parceiro
 *     ReturnPartnership:
 *       type: object
 *       properties:
 *         projectId:
 *           type: string
 *           description: ID do projeto
 *         partnerId:
 *           type: string
 *           description: ID do parceiro
 *         createdAt:
 *           type: string
 *           description: Data de criação da parceria
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização da parceria
 *           example: 2024-03-01T00:00:00.000Z
 */

export interface PartnershipEntity {
  id: string;
  projectId: number;
  partnerId: number;
  createdAt: Date;
  updatedAt: Date;
}
