import { PrismaClient } from "@prisma/client";
import express from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { opts, specs } from "./common/swagger/swagger-config";
import { errorMiddleware } from "./common/middlewares/error-handler.middleware";
import taskRoutes from "./task/task.router";
import appRoutes from "./routes";
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

    // Rota para criar um usuário
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

    // Rota para criar um projeto
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

    // Rota para criar uma parceria
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

    // Rota para criar um financiamento
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

    // Rota para criar um recurso educacional
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

    // Rota para buscar todos os projetos
    this.app.get('/projects', async (req, res) => {
    try {
    const projects = await prisma.project.findMany();
    res.json(projects);
    } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ error: 'Erro interno ao buscar projetos' });
    }
    });

    // Rota para buscar todos os usuários
    this.app.get('/users', async (req, res) => {
    try {
    const users = await prisma.user.findMany();
    res.json(users);
    } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuários' });
    }
    });

    // Rota para buscar todas as parcerias
    this.app.get('/partnerships', async (req, res) => {
    try {
    const partnerships = await prisma.partnership.findMany();
    res.json(partnerships);
    } catch (error) {
    console.error('Erro ao buscar parcerias:', error);
    res.status(500).json({ error: 'Erro interno ao buscar parcerias' });
    }
    });

    // Rota para buscar todos os financiamentos
    this.app.get('/fundings', async (req, res) => {
    try {
    const fundings = await prisma.funding.findMany();
    res.json(fundings);
    } catch (error) {
    console.error('Erro ao buscar financiamentos:', error);
    res.status(500).json({ error: 'Erro interno ao buscar financiamentos' });
    }
    });

    // Rota para buscar todos os recursos educacionais
    this.app.get('/educations', async (req, res) => {
    try {
    const educations = await prisma.education.findMany();
    res.json(educations);
    } catch (error) {
    console.error('Erro ao buscar recursos educacionais:', error);
    res.status(500).json({ error: 'Erro interno ao buscar recursos educacionais' });
    }
    });
    
  }
  private async database() {
    await prisma
      .$connect()
      .then(() => {
        console.log("Connected to database!");
      })
      .catch(async (error) => {
        await prisma.$disconnect();
        console.error("Error connecting to database: ", error);
      });
  }
}

export default new App().app;