import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import { opts, specs } from "./common/swagger/swagger-config";
import { errorMiddleware } from "./common/middlewares/error-handler.middleware";
import cors from "cors"

const prisma = new PrismaClient();

export class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.cors();
    this.database();
    this.middlewares();
    this.routes();
    this.app.use(errorMiddleware);
  }

  private cors() {
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private routes() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.post('/users', async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const user = await prisma.user.create({ data: { name, email, password } });
        res.json(user);
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao criar usuário' });
      }
    });

    this.app.post('/projects', async (req, res) => {
      const { title, description, userId } = req.body;
      try {
        const project = await prisma.project.create({ data: { title, description, userId } });
        res.json(project);
      } catch (error) {
        console.error('Erro ao criar projeto:', error);
        res.status(500).json({ error: 'Erro interno ao criar projeto' });
      }
    });

    this.app.post('/partnerships', async (req, res) => {
      const { projectId, partnerId } = req.body;
      try {
        const partnership = await prisma.partnership.create({ data: { projectId, partnerId } });
        res.json(partnership);
      } catch (error) {
        console.error('Erro ao criar parceria:', error);
        res.status(500).json({ error: 'Erro interno ao criar parceria' });
      }
    });

    this.app.post('/fundings', async (req, res) => {
      const { title, description, amount, deadline } = req.body;
      try {
        const funding = await prisma.funding.create({ data: { title, description, amount, deadline: new Date(deadline) } });
        res.json(funding);
      } catch (error) {
        console.error('Erro ao criar financiamento:', error);
        res.status(500).json({ error: 'Erro interno ao criar financiamento' });
      }
    });

    this.app.post('/educations', async (req, res) => {
      const { title, description, url } = req.body;
      try {
        const education = await prisma.education.create({ data: { title, description, url } });
        res.json(education);
      } catch (error) {
        console.error('Erro ao criar recurso educacional:', error);
        res.status(500).json({ error: 'Erro interno ao criar recurso educacional' });
      }
    });

    this.app.get('/projects', async (req, res) => {
      try {
        const projects = await prisma.project.findMany();
        res.json(projects);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({ error: 'Erro interno ao buscar projetos' });
      }
    });

    this.app.get('/projects/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const project = await prisma.project.findUnique({ where: { id: Number(id) } });
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ error: 'Projeto não encontrado' });
        }
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
        res.status(500).json({ error: 'Erro interno ao buscar projeto' });
      }
    });

    this.app.put('/projects/:id', async (req, res) => {
      const { id } = req.params;
      const { title, description, userId } = req.body;
      try {
        const project = await prisma.project.update({
          where: { id: Number(id) },
          data: { title, description, userId },
        });
        res.json(project);
      } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar projeto' });
      }
    });

    this.app.delete('/projects/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await prisma.project.delete({ where: { id: Number(id) } });
        res.json({ message: 'Projeto deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
        res.status(500).json({ error: 'Erro interno ao deletar projeto' });
      }
    });

    this.app.get('/users', async (req, res) => {
      try {
        const users = await prisma.user.findMany();
        res.json(users);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno ao buscar usuários' });
      }
    });

    this.app.get('/users/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'Usuário não encontrado' });
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao buscar usuário' });
      }
    });

    this.app.put('/users/:id', async (req, res) => {
      const { id } = req.params;
      const { name, email, password } = req.body;
      try {
        const user = await prisma.user.update({
          where: { id: Number(id) },
          data: { name, email, password },
        });
        res.json(user);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
      }
    });

    this.app.delete('/users/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await prisma.user.delete({ where: { id: Number(id) } });
        res.json({ message: 'Usuário deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao deletar usuário' });
      }
    });

    this.app.get('/partnerships', async (req, res) => {
      try {
        const partnerships = await prisma.partnership.findMany();
        res.json(partnerships);
      } catch (error) {
        console.error('Erro ao buscar parcerias:', error);
        res.status(500).json({ error: 'Erro interno ao buscar parcerias' });
      }
    });

    this.app.get('/partnerships/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const partnership = await prisma.partnership.findUnique({ where: { id: Number(id) } });
        if (partnership) {
          res.json(partnership);
        } else {
          res.status(404).json({ error: 'Parceria não encontrada' });
        }
      } catch (error) {
        console.error('Erro ao buscar parceria:', error);
        res.status(500).json({ error: 'Erro interno ao buscar parceria' });
      }
    });

    this.app.put('/partnerships/:id', async (req, res) => {
      const { id } = req.params;
      const { projectId, partnerId } = req.body;
      try {
        const partnership = await prisma.partnership.update({
          where: { id: Number(id) },
          data: { projectId, partnerId },
        });
        res.json(partnership);
      } catch (error) {
        console.error('Erro ao atualizar parceria:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar parceria' });
      }
    });

    this.app.delete('/partnerships/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await prisma.partnership.delete({ where: { id: Number(id) } });
        res.json({ message: 'Parceria deletada com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar parceria:', error);
        res.status(500).json({ error: 'Erro interno ao deletar parceria' });
      }
    });

    this.app.get('/fundings', async (req, res) => {
      try {
        const fundings = await prisma.funding.findMany();
        res.json(fundings);
      } catch (error) {
        console.error('Erro ao buscar financiamentos:', error);
        res.status(500).json({ error: 'Erro interno ao buscar financiamentos' });
      }
    });

    this.app.get('/fundings/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const funding = await prisma.funding.findUnique({ where: { id: Number(id) } });
        if (funding) {
          res.json(funding);
        } else {
          res.status(404).json({ error: 'Financiamento não encontrado' });
        }
      } catch (error) {
        console.error('Erro ao buscar financiamento:', error);
        res.status(500).json({ error: 'Erro interno ao buscar financiamento' });
      }
    });

    this.app.put('/fundings/:id', async (req, res) => {
      const { id } = req.params;
      const { title, description, amount, deadline } = req.body;
      try {
        const funding = await prisma.funding.update({
          where: { id: Number(id) },
          data: { title, description, amount, deadline: new Date(deadline) },
        });
        res.json(funding);
      } catch (error) {
        console.error('Erro ao atualizar financiamento:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar financiamento' });
      }
    });

    this.app.delete('/fundings/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await prisma.funding.delete({ where: { id: Number(id) } });
        res.json({ message: 'Financiamento deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar financiamento:', error);
        res.status(500).json({ error: 'Erro interno ao deletar financiamento' });
      }
    });

    this.app.get('/educations', async (req, res) => {
      try {
        const educations = await prisma.education.findMany();
        res.json(educations);
      } catch (error) {
        console.error('Erro ao buscar recursos educacionais:', error);
        res.status(500).json({ error: 'Erro interno ao buscar recursos educacionais' });
      }
    });

    this.app.get('/educations/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const education = await prisma.education.findUnique({ where: { id: Number(id) } });
        if (education) {
          res.json(education);
        } else {
          res.status(404).json({ error: 'Recurso educacional não encontrado' });
        }
      } catch (error) {
        console.error('Erro ao buscar recurso educacional:', error);
        res.status(500).json({ error: 'Erro interno ao buscar recurso educacional' });
      }
    });

    this.app.put('/educations/:id', async (req, res) => {
      const { id } = req.params;
      const { title, description, url } = req.body;
      try {
        const education = await prisma.education.update({
          where: { id: Number(id) },
          data: { title, description, url },
        });
        res.json(education);
      } catch (error) {
        console.error('Erro ao atualizar recurso educacional:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar recurso educacional' });
      }
    });

    this.app.delete('/educations/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await prisma.education.delete({ where: { id: Number(id) } });
        res.json({ message: 'Recurso educacional deletado com sucesso' });
      } catch (error) {
        console.error('Erro ao deletar recurso educacional:', error);
        res.status(500).json({ error: 'Erro interno ao deletar recurso educacional' });
      }
    });
  }

  private async database() {
    await prisma
      .$connect()
      .then(() => {
        console.log("Connected to database!");
      })
      .catch(async (error: any) => {
        await prisma.$disconnect();
        console.error("Error connecting to database: ", error);
      });
  }
}

export default new App().app;
