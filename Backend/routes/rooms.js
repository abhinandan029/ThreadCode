import express from 'express'
import { verifySession } from  "../middlewares/verifysession.js"

import {createRoomHandler, inviteToRoom, getRoomMembers, checkRoomAccess } from "../controllers/roomController.js"

const router = express.Router();

router.post('/api/room', verifySession, createRoomHandler);
router.post('/api/room/:roomId/invite', verifySession, inviteToRoom);
router.get('/api/room/:roomId/members', verifySession, getRoomMembers);
router.get('/api/room/:roomId/access', verifySession, checkRoomAccess);

export default router