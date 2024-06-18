/**
 * @swagger
 * components:
 *   schemas:
 *     Funding:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do financiamento
 *         description:
 *           type: string
 *           description: Descrição do financiamento
 *         amount:
 *           type: number
 *           description: Quantia do financiamento
 *         deadline:
 *           type: string
 *           description: Prazo para o financiamento
 *     ReturnFunding:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do financiamento
 *         description:
 *           type: string
 *           description: Descrição do financiamento
 *         amount:
 *           type: number
 *           description: Quantia do financiamento
 *         deadline:
 *           type: string
 *           description: Prazo para o financiamento
 *         createdAt:
 *           type: string
 *           description: Data de criação do financiamento
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do financiamento
 *           example: 2024-03-01T00:00:00.000Z
 */

export interface FundingEntity {
  id: string;
  title: string;
  description?: string;
  amount: number;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
