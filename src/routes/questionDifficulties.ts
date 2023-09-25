import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { QuestionDifficultyController } from "../controllers/QuestionDifficultyController";
import { QuestionDifficultyRepository } from "../repositories/questionDifficulty/QuestionDifficultyRepository";

const router = Router();

const repository = new QuestionDifficultyRepository();
const controller = new QuestionDifficultyController(repository);


router.post('/', authMiddleware, (req, res) => controller.create(req, res));
router.put('/:difficultyId', authMiddleware, (req, res) => controller.update(req, res));
router.delete('/:difficultyId', authMiddleware, (req, res) => controller.remove(req, res));



export default router;