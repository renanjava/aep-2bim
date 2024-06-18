/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do recurso educacional
 *         description:
 *           type: string
 *           description: Descrição do recurso educacional
 *         url:
 *           type: string
 *           description: URL do recurso educacional
 *     ReturnEducation:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do recurso educacional
 *         description:
 *           type: string
 *           description: Descrição do recurso educacional
 *         url:
 *           type: string
 *           description: URL do recurso educacional
 *         createdAt:
 *           type: string
 *           description: Data de criação do recurso educacional
 *           example: 2024-03-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do recurso educacional
 *           example: 2024-03-01T00:00:00.000Z
 */

export interface EducationEntity {
  id: string;
  title: string;
  description?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
