import express from 'express'
import {register, login, logout, me} from '../controllers/authController.js'
import {verifySession} from "../middlewares/verifySession.js"

const router = express.Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);
router.get("/api/auth/me", verifySession, me);

export default router