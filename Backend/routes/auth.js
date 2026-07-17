import express from 'express'
import {register, login} from '../controllers/authController.js'
import {verifySession} from "../middlewares/verifySession.js"

const router = express.Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

export default router