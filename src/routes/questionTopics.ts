import { Router } from "express";
import { QuestionTopicController } from "../controllers/QuestionTopicController";
import { authMiddleware } from "../middlewares/auth";
import { QuestionTopicRepository } from "../repositories/questionTopic/QuestionTopicRepository";
const router = Router();

const repository = new QuestionTopicRepository();
const controller = new QuestionTopicController(repository);


router.post('/', authMiddleware, (req, res) => controller.create(req, res));



export default router;