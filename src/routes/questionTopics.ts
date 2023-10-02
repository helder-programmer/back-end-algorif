import { Router } from "express";
import { QuestionTopicController } from "../controllers/QuestionTopicController";
import { authMiddleware } from "../middlewares/auth";
import { QuestionTopicRepository } from "../repositories/questionTopic/QuestionTopicRepository";
const router = Router();

const repository = new QuestionTopicRepository();
const controller = new QuestionTopicController(repository);


router.get('/', authMiddleware, (req, res) => controller.getAll(req, res));
router.post('/', authMiddleware, (req, res) => controller.create(req, res));
router.put('/:topicId', authMiddleware, (req, res) => controller.update(req, res));
router.delete('/:topicId', authMiddleware, (req, res) => controller.remove(req, res));




export default router;