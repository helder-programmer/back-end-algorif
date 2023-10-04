import { Router } from "express";
import { QuestionController } from "../controllers/questionController";
import { QuestionRepository } from "../repositories/question/QuestionRepository";

const router = Router();

const repository = new QuestionRepository();
const controller = new QuestionController(repository);


router.post('/', (req, res) => controller.create(req, res));





export default router;