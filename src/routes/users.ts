import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user/UserRepository";
import { authMiddleware } from "../middlewares/auth";
const router = Router();


const repository = new UserRepository();
const controller = new UserController(repository);


router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/recoverUserInformations', authMiddleware, (req, res) => controller.recoverUserInformations(req, res));
router.put('/', authMiddleware, (req, res) => controller.update(req, res));

export default router;