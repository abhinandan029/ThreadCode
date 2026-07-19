import express from 'express'
import { verifySession } from  "../middlewares/verifysession.js"

import {createRoomHandler, inviteToRoom, getRoomMembers, checkRoomAccess, leaveRoom } from "../controllers/roomController.js"

const router = express.Router();

router.post('/api/room', verifySession, createRoomHandler);
router.post('/api/room/:roomId/invite', verifySession, inviteToRoom);
router.get('/api/room/:roomId/members', verifySession, getRoomMembers);
router.get('/api/room/:roomId/access', verifySession, checkRoomAccess);
router.delete('/api/room/:roomId/leave', verifySession, leaveRoom);

export default router