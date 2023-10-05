import { Router } from "express";
import { QuestionController } from "../controllers/QuestionController";
import { QuestionRepository } from "../repositories/question/QuestionRepository";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

const repository = new QuestionRepository();
const controller = new QuestionController(repository);


router.post('/', authMiddleware, (req, res) => controller.create(req, res));





export default router;