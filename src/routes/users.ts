import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user/UserRepository";
const router = Router();


const repository = new UserRepository();
const controller = new UserController(repository);


router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));

export default router;