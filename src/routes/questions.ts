import { Router } from "express";
import { QuestionController } from "../controllers/QuestionController";
import { QuestionRepository } from "../repositories/question/QuestionRepository";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

const repository = new QuestionRepository();
const controller = new QuestionController(repository);


router.post('/', authMiddleware, (req, res) => controller.create(req, res));
router.get('/getUnansweredQuestions', authMiddleware, (req, res) => controller.getUnansweredQuestions(req, res));
router.get('/:questionId', authMiddleware, (req, res) => controller.getOne(req, res));
router.put('/answer/:questionId', authMiddleware, (req, res) => controller.answerQuestion(req, res));




export default router;